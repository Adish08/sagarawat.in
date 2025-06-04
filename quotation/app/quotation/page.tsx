"use client"

import { useEffect, useState, useCallback, useRef, type KeyboardEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, PlusCircle, FileDown, RotateCcw } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { Combobox, type ComboboxOption } from "@/components/ui/combobox"
import { getAuth } from "firebase/auth"
import { ProfileBubble } from "../components/ProfileBubble"

// Types
interface ProductFamily {
  name: string
  price: number
}

interface Product {
  id: string
  name: string
  families: ProductFamily[]
  defaultPrice: number
}

interface InvoiceItem {
  id: string
  productId: string | null
  productName: string
  quantity: number
  price: number
  discount: number
  isDiscountManuallySet: boolean
}

interface StoredQuotationData {
  partyName: string
  invoiceDate: string
  items: InvoiceItem[]
  selectedFamily: string
  globalDiscount: number
  terms: string
  applyGST: boolean
  simplifiedOutput: boolean
}

const LOCAL_STORAGE_KEY = "sagarawatQuotationData"

const initialTerms = `1. Goods Once Sold Will Not Be Taken Back.
2. Subject To Neemuch Jurisdiction Only.
3. E. & O.E.`

// Families will be loaded from the API

export default function QuotationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isDemoMode = searchParams.get("demo") === "true"
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [showWarning, setShowWarning] = useState(false)
  const [logoClickCount, setLogoClickCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [showEncouragement, setShowEncouragement] = useState(false)
  const lastClickTime = useRef(0)
  
  // Demo mode timer effect
  useEffect(() => {
    if (!isDemoMode) return
    
    // Check if demo mode is active and handle timer
    const checkDemoMode = () => {
      const expirationTime = sessionStorage.getItem('demoExpiration')
      if (!expirationTime) {
        // No expiration time found, might be a direct URL access
        sessionStorage.removeItem('demoMode')
        router.push('/')
        return null
      }
      
      const remaining = parseInt(expirationTime, 10) - Date.now()
      
      if (remaining <= 0) {
        // Demo expired
        sessionStorage.removeItem('demoMode')
        sessionStorage.removeItem('demoExpiration')
        router.push('/')
        return null
      }
      
      // Show warning when 30 seconds or less remaining
      setShowWarning(remaining <= 30000)
      
      return remaining
    }
    
    // Initial check
    const remaining = checkDemoMode()
    if (remaining === null) return
    
    setTimeLeft(Math.ceil(remaining / 1000))
    
    // Update timer every second
    const timer = setInterval(() => {
      const updatedRemaining = checkDemoMode()
      if (updatedRemaining === null) {
        clearInterval(timer)
      } else {
        setTimeLeft(Math.ceil(updatedRemaining / 1000))
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isDemoMode, router])
  
  // Check authentication status (skip for demo mode)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Skip auth check in demo mode
    if (isDemoMode) return
    
    const auth = getAuth()
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (!user && isMounted) {
        router.push('/')
      }
    })
    return () => {
      setIsMounted(false)
      unsubscribe()
    }
  }, [router, isMounted, isDemoMode])

  const [products, setProducts] = useState<Product[]>([])
  const [productOptions, setProductOptions] = useState<ComboboxOption[]>([])
  const [partyName, setPartyName] = useState("")
  const [voucherNumber, setVoucherNumber] = useState("")
  const getLocalDateString = () => {
    const now = new Date()
    const offset = now.getTimezoneOffset()
    const localDate = new Date(now.getTime() - (offset * 60 * 1000))
    return localDate.toISOString().split('T')[0]
  }
  const [invoiceDate, setInvoiceDate] = useState(getLocalDateString())
  const [items, setItems] = useState<InvoiceItem[]>([])
  const [availableFamilies, setAvailableFamilies] = useState<string[]>([])
  const [selectedFamily, setSelectedFamily] = useState<string>("")
  const [globalDiscount, setGlobalDiscount] = useState(0)
  const [terms, setTerms] = useState(initialTerms)
  const [applyGST, setApplyGST] = useState(true)
  const [simplifiedOutput, setSimplifiedOutput] = useState(false)
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false) // To prevent overwriting localStorage on initial load

  // Load from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedData) {
      try {
        const parsedData: StoredQuotationData = JSON.parse(storedData)
        setPartyName(parsedData.partyName || "")
        setInvoiceDate(parsedData.invoiceDate || new Date().toISOString().split("T")[0])
        setItems(parsedData.items || [])
        setGlobalDiscount(parsedData.globalDiscount || 0)
        setTerms(parsedData.terms || initialTerms)
        setApplyGST(parsedData.applyGST === undefined ? true : parsedData.applyGST)
        setSimplifiedOutput(parsedData.simplifiedOutput || false)
        
        // We'll set the selected family after we load the available families
        // to ensure it's one of the valid options
      } catch (error) {
        console.error("Failed to parse stored quotation data:", error)
        localStorage.removeItem(LOCAL_STORAGE_KEY) // Clear corrupted data
      }
    }
    setIsInitialized(true) // Mark as initialized
  }, [])

  // Save to localStorage when relevant state changes
  useEffect(() => {
    if (!isInitialized) return // Don't save until initialized and loaded from localStorage

    const dataToStore: StoredQuotationData = {
      partyName,
      invoiceDate,
      items,
      selectedFamily,
      globalDiscount,
      terms,
      applyGST,
      simplifiedOutput,
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore))
  }, [partyName, invoiceDate, items, selectedFamily, globalDiscount, terms, applyGST, isInitialized, simplifiedOutput])

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const fetchedProducts: Product[] = data.products || []
        
        // Extract all unique families from the products
        const allFamilies = new Set<string>()
        fetchedProducts.forEach(product => {
          product.families.forEach(family => {
            allFamilies.add(family.name)
          })
        })
        
        const uniqueFamilies = Array.from(allFamilies)
        setAvailableFamilies(uniqueFamilies)
        
        // Set the selected family to the first available one if not set yet
        if (uniqueFamilies.length > 0 && !selectedFamily) {
          // Try to get the previously selected family from localStorage if it exists
          const storedData = localStorage.getItem(LOCAL_STORAGE_KEY)
          let storedFamily = ''
          
          if (storedData) {
            try {
              const parsedData: StoredQuotationData = JSON.parse(storedData)
              storedFamily = parsedData.selectedFamily || ''
            } catch (error) {
              console.error("Failed to parse stored family:", error)
            }
          }
          
          // If the stored family is valid, use it; otherwise use the first available
          setSelectedFamily(uniqueFamilies.includes(storedFamily) ? storedFamily : uniqueFamilies[0])
        }
        setProducts(fetchedProducts)
        setProductOptions(fetchedProducts.map((p) => ({ value: p.id, label: p.name })))
        setIsLoadingProducts(false)
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err)
        setIsLoadingProducts(false)
      })
  }, [])

  useEffect(() => {
    const lastVoucherNum = Number.parseInt(localStorage.getItem("lastVoucherNum") || "0", 10)
    const newVoucherNum = lastVoucherNum + 1
    setVoucherNumber(`SE-Q${String(newVoucherNum).padStart(3, "0")}`)
    // Note: voucher number persistence is separate, could also be part of the main stored object if desired
  }, [])

  const getProductPriceForFamily = useCallback(
    (productId: string | null, familyName: string): number => {
      if (!productId) return 0
      const product = products.find((p) => p.id === productId)
      if (!product) return 0
      const family = product.families.find((f) => f.name === familyName)
      return family ? family.price : product.defaultPrice
    },
    [products],
  )

  const addItem = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: Date.now().toString(),
        productId: null,
        productName: "",
        quantity: 1,
        price: 0,
        discount:
          prevItems.length === 0
            ? globalDiscount
            : prevItems[0]?.isDiscountManuallySet
              ? prevItems[0].discount
              : globalDiscount,
        isDiscountManuallySet: false,
      },
    ])
  }, [globalDiscount])

  const removeItem = (id: string) => {
    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
    if (id === items[0]?.id && newItems.length > 0 && !newItems[0].isDiscountManuallySet) {
      setGlobalDiscount(newItems[0].discount)
    } else if (newItems.length === 0) {
      setGlobalDiscount(0)
    }
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === "productId") {
            const product = products.find((p) => p.id === value)
            updatedItem.productName = product ? product.name : ""
            updatedItem.price = getProductPriceForFamily(value, selectedFamily)
          }
          if (field === "discount") {
            updatedItem.isDiscountManuallySet = true
            if (prevItems.findIndex((i) => i.id === id) === 0) {
              setGlobalDiscount(Number(value))
            }
          }
          if ((field === "quantity" || field === "price") && !updatedItem.isDiscountManuallySet) {
            updatedItem.discount =
              prevItems.findIndex((i) => i.id === id) === 0
                ? globalDiscount
                : prevItems[0]?.isDiscountManuallySet
                  ? prevItems[0].discount
                  : globalDiscount
          }
          return updatedItem
        }
        return item
      }),
    )
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addItem()
    }
  }

  useEffect(() => {
    if (!isInitialized) return // Only run after initial load from localStorage
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        price: getProductPriceForFamily(item.productId, selectedFamily),
      })),
    )
  }, [selectedFamily, products, getProductPriceForFamily, isInitialized])

  useEffect(() => {
    if (!isInitialized) return
    setItems((prevItems) =>
      prevItems.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            discount: globalDiscount,
            isDiscountManuallySet: item.isDiscountManuallySet || item.discount !== globalDiscount,
          }
        }
        return item.isDiscountManuallySet ? item : { ...item, discount: globalDiscount }
      }),
    )
  }, [globalDiscount, isInitialized])

  const calculateTotals = () => {
    let subtotal = 0
    items.forEach((item) => {
      const itemPrice = item.price
      const discountedPrice = itemPrice * (1 - item.discount / 100)
      subtotal += discountedPrice * item.quantity
    })
    const gstAmount = applyGST ? subtotal * 0.18 : 0
    const total = subtotal + gstAmount
    return { subtotal, gstAmount, total }
  }

  const { subtotal, gstAmount, total } = calculateTotals()
  const roundedTotal = Math.round(total)
  const roundOffAmount = parseFloat((roundedTotal - total).toFixed(2))

  const handleReset = () => {
    setPartyName("")
    setInvoiceDate(new Date().toISOString().split("T")[0])
    setItems([])
    if (availableFamilies.length > 0) {
      setSelectedFamily(availableFamilies[0])
    }
    setGlobalDiscount(0)
    setTerms(initialTerms)
    setApplyGST(true)
    setSimplifiedOutput(false)
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    // Regenerate voucher number
    const newVoucherNum = Number.parseInt(localStorage.getItem("lastVoucherNum") || "0", 10) + 1
    setVoucherNumber(`SE-Q${String(newVoucherNum).padStart(3, "0")}`)
    localStorage.setItem("lastVoucherNum", String(newVoucherNum))
  }

  const handleDownloadPDF = async () => {
    const invoiceElement = document.getElementById("invoice-pdf-content")
    if (!invoiceElement) {
      console.error("PDF content element not found.")
      alert("Error: PDF content element not found.")
      return
    }

    const gstElement = document.getElementById("gst-row-pdf")
    const originalGstDisplay = gstElement ? gstElement.style.display : ""
    if (gstElement && !applyGST) gstElement.style.display = "none"
    
    // Handle simplified output classes
    if (simplifiedOutput) {
      invoiceElement.classList.add('simplified-output')
    }

    const originalDisplay = invoiceElement.style.display
    const originalClassName = invoiceElement.className
    const originalPosition = invoiceElement.style.position
    const originalLeft = invoiceElement.style.left
    const originalTop = invoiceElement.style.top
    
    invoiceElement.style.display = "block"
    invoiceElement.style.position = "absolute"
    invoiceElement.style.left = "-9999px"
    invoiceElement.style.top = "-9999px"

    html2canvas(invoiceElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    })
      .then((canvas) => {
        if (canvas.width === 0 || canvas.height === 0) {
          console.error("html2canvas produced an empty canvas.")
          alert("Error: PDF generation failed (empty canvas).")
          return
        }
        const imgData = canvas.toDataURL("image/png")
        if (!imgData || imgData === "data:,") {
          console.error("canvas.toDataURL returned invalid data.")
          alert("Error: PDF generation failed (image data error).")
          return
        }

        const pdf = new jsPDF("p", "mm", "a4")
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgProps = pdf.getImageProperties(imgData)
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width

        let heightLeft = imgHeight
        let position = 0
        const margin = 10

        pdf.addImage(
          imgData,
          "PNG",
          margin,
          position + margin,
          pdfWidth - 2 * margin,
          imgHeight > pdfHeight - 2 * margin ? pdfHeight - 2 * margin : imgHeight,
        )
        heightLeft -= pdfHeight - 2 * margin

        while (heightLeft > 0) {
          position = heightLeft - imgHeight
          pdf.addPage()
          pdf.addImage(
            imgData,
            "PNG",
            margin,
            position + margin,
            pdfWidth - 2 * margin,
            imgHeight > pdfHeight - 2 * margin ? pdfHeight - 2 * margin : imgHeight,
          )
          heightLeft -= pdfHeight - 2 * margin
        }
        // Format date as DD-MM-YYYY
        const formattedDate = new Date(invoiceDate).toLocaleDateString('en-GB').replace(/\//g, '-')
        // Create filename: Quotation - <Party Name> <Date> - Sagarawat Electricals
        const filename = `Quotation - ${partyName || 'Customer'} ${formattedDate} - Sagarawat Electricals.pdf`
        pdf.save(filename)
      })
      .catch((error) => {
        console.error("Error generating PDF with html2canvas:", error)
        alert("Failed to generate PDF. Check console.")
      })
      .finally(() => {
        invoiceElement.style.display = originalDisplay
        invoiceElement.className = originalClassName
        invoiceElement.style.position = originalPosition
        invoiceElement.style.left = originalLeft
        invoiceElement.style.top = originalTop
        if (gstElement) gstElement.style.display = originalGstDisplay
        invoiceElement.classList.remove('simplified-output')
      })
  }

  // Demo notification component
  const DemoNotification = () => (
    <div 
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        showWarning ? 'bg-red-500 text-white' : 'bg-yellow-500 text-gray-900'
      }`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {showWarning ? (
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">
            {showWarning 
              ? `Demo will end in ${timeLeft} seconds!` 
              : `Demo Mode - ${Math.floor((timeLeft || 0) / 60)}:${String((timeLeft || 0) % 60).padStart(2, '0')} remaining`
            }
          </p>
        </div>
      </div>
    </div>
  );

  const handleLogoClick = useCallback(() => {
    const now = Date.now()
    // Reset count if more than 3 seconds have passed since last click
    if (now - lastClickTime.current > 3000) {
      setLogoClickCount(1)
    } else {
      setLogoClickCount(prev => prev + 1)
    }
    lastClickTime.current = now
    
    // Show encouragement message at 5 clicks
    if (logoClickCount === 4) {
      setShowEncouragement(true)
      setTimeout(() => setShowEncouragement(false), 2000)
    }
    
    // Show easter egg at 10 clicks
    if (logoClickCount === 9) {
      setShowEasterEgg(true)
      setShowEncouragement(false)
    }
  }, [logoClickCount])
  
  // Close easter egg when clicking anywhere
  const closeEasterEgg = useCallback(() => {
    setShowEasterEgg(false)
    setLogoClickCount(0)
  }, [])
  
  // Add click listener to close easter egg
  useEffect(() => {
    if (showEasterEgg) {
      const handleClick = () => closeEasterEgg()
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [showEasterEgg, closeEasterEgg])

  return (
    <div className="relative min-h-screen">
      {/* Easter Egg Overlay */}
      {showEasterEgg && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="relative inline-block">
              {/* Yellow glow effect */}
              <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-70 blur-3xl -z-10" 
                   style={{
                     width: '250px',
                     height: '250px',
                     left: '50%',
                     top: '50%',
                     transform: 'translate(-50%, -50%)',
                     animation: 'pulse 2s infinite alternate'
                   }}>
              </div>
              <div className="text-yellow-300 text-8xl mb-4 animate-bounce relative z-10">
                ⚡
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-2">SUPERCHARGED!</div>
            <div className="text-yellow-200 text-xl">You found the power within!</div>
          </div>
        </div>
      )}
      
      {/* Encouragement Message */}
      {showEncouragement && (
        <div className="fixed top-4 left-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md shadow-md z-40 animate-bounce text-base font-medium">
          You're close! Keep going! ⚡
        </div>
      )}
      
      <ProfileBubble />
      {isDemoMode && timeLeft !== null && <DemoNotification />}
      <div className="container mx-auto p-4">
        <header className="mb-6 text-center">
          <div className="flex flex-col items-center">
            <button 
              onClick={handleLogoClick}
              className="focus:outline-none active:scale-95 transition-transform mb-2"
              aria-label="Company Logo"
            >
              <Image
                src="/placeholder.svg?width=200&height=70"
                alt="Company Logo"
                width={200}
                height={70}
                className="hover:opacity-80 transition-opacity"
              />
            </button>
            <h1 className="text-3xl font-bold">Sagarawat Electricals - Legrand Quotation Tool</h1>
          </div>
        </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Quotation Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="partyName">Party Name</Label>
            <Input id="partyName" value={partyName} onChange={(e) => setPartyName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="voucherNumber">Voucher No.</Label>
            <Input id="voucherNumber" value={voucherNumber} readOnly />
          </div>
          <div>
            <Label htmlFor="invoiceDate">Date</Label>
            <Input id="invoiceDate" type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="productFamily">Product Family (Color)</Label>
            <select
              id="productFamily"
              value={selectedFamily}
              onChange={(e) => setSelectedFamily(e.target.value)}
              className="w-full p-2 border rounded-md bg-background text-foreground"
            >
              {availableFamilies.map((family: string) => (
                <option key={family} value={family}>
                  {family}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">S.No.</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead className="w-[100px]">Qty</TableHead>
                  <TableHead className="w-[120px]">List Price</TableHead>
                  <TableHead className="w-[100px]">Disc %</TableHead>
                  <TableHead className="w-[150px]">Nett Price</TableHead>
                  <TableHead className="w-[150px]">Total</TableHead>
                  <TableHead className="w-[50px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => {
                  const grossAmount = item.price * item.quantity
                  const discountAmount = grossAmount * (item.discount / 100)
                  const netAmount = grossAmount - discountAmount
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Combobox
                          options={productOptions}
                          value={item.productId || ""}
                          onValueChange={(value) => updateItem(item.id, "productId", value)}
                          placeholder="Select Product..."
                          emptyText={isLoadingProducts ? "Loading products..." : "No product found."}
                          disabled={isLoadingProducts}
                        />
                      </TableCell>
                      <TableCell className="w-[120px]">
                        <Input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) => updateItem(item.id, "quantity", Number.parseInt(e.target.value) || 1)}
                          onKeyDown={handleInputKeyDown}
                          onFocus={handleFocus}
                          className="w-full cursor-text"
                        />
                      </TableCell>
                      <TableCell>₹{item.price.toFixed(2)}</TableCell>
                      <TableCell className="w-[120px]">
                        <Input
                          type="number"
                          value={item.discount}
                          onChange={(e) => {
                            const newDiscount = Number.parseFloat(e.target.value) || 0
                            updateItem(item.id, "discount", newDiscount)
                            if (index === 0) {
                              setGlobalDiscount(newDiscount)
                            }
                          }}
                          onKeyDown={handleInputKeyDown}
                          onFocus={handleFocus}
                          className="w-full cursor-text"
                        />
                      </TableCell>
                      <TableCell>₹{grossAmount.toFixed(2)}</TableCell>
                      <TableCell>₹{netAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
          <Button onClick={addItem} className="mt-4" variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              rows={5}
              className="w-full p-2 border rounded"
            />
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="applyGst"
                  checked={applyGST}
                  onCheckedChange={(checked) => setApplyGST(checked as boolean)}
                />
                <Label htmlFor="applyGst">Apply GST (18%)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="simplifiedOutput"
                  checked={simplifiedOutput}
                  onCheckedChange={(checked) => setSimplifiedOutput(checked as boolean)}
                />
                <Label htmlFor="simplifiedOutput">Simplified Output</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {applyGST && (
              <div className="flex justify-between">
                <span>GST (18%):</span>
                <span>₹{gstAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Round off:</span>
              <span>{roundOffAmount > 0 ? '+' : ''}{roundOffAmount === 0 ? '0.00' : roundOffAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Grand Total:</span>
              <span>₹{roundedTotal.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <Button onClick={handleReset} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" /> Reset Quotation
        </Button>
        <Button onClick={handleDownloadPDF} className="bg-orange-500 hover:bg-orange-600 text-white">
          <FileDown className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </div>

      {/* Hidden div for PDF generation */}
      <div id="invoice-pdf-content" className="hidden">
        <div
          style={{
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            color: "#000",
            width: "190mm" /* A4 width minus margins */,
          }}
        >
          {/* PDF Header: Logo and Business Details */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "20px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "10px",
            }}
          >
            <div style={{ width: "120px" }}>
              <img
                src="/placeholder.svg"
                alt="Sagarawat Electricals Logo"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                  display: "block"
                }}
                crossOrigin="anonymous"
              />
            </div>
            <div style={{ flex: "0 0 65%", textAlign: "right", fontSize: "10px", lineHeight: 1.2 }}>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 3px 0", color: "#333" }}>
                Sagarawat Electricals
              </h3>
              <p style={{ margin: "0 0 1px 0" }}>25 - 26 Dr. Bhabha Marg, Near Private</p>
              <p style={{ margin: "0 0 1px 0" }}>Bus Stand - Neemuch, M.P. (458441)</p>
              <p style={{ margin: "0 0 1px 0", fontWeight: "bold" }}>GSTIN - 23AHXPS0172M1ZQ</p>
              <p style={{ margin: "0", fontWeight: "bold" }}>Contact: 7423220808</p>
            </div>
          </div>

          <h2
            style={{ fontSize: "22px", fontWeight: "bold", textAlign: "center", margin: "0 0 20px 0", color: "#444" }}
          >
            QUOTATION
          </h2>

          {/* Party Details & Invoice Info */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "11px" }}>
            <div style={{ width: "60%" }}>
              <strong>Party Name:</strong> {partyName || "N/A"}
            </div>
            <div style={{ width: "35%", textAlign: "right" }}>
              <strong>Voucher No.:</strong> {voucherNumber}
              <br />
              <strong>Date:</strong> {new Date(invoiceDate).toLocaleDateString("en-GB")}
              <br />
              <span className="product-family-text">
                <strong>Product Family:</strong> {selectedFamily}
              </span>
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10px", marginBottom: "20px" }}>
            <thead>
              <tr style={{ backgroundColor: "#eaeaea", color: "#333" }}>
                <th className="sno-col" style={{ border: "1px solid #ccc", padding: "6px", textAlign: "left" }}>S.No.</th>
                <th className="product-col" style={{ border: "1px solid #ccc", padding: "6px", textAlign: "left" }}>Product Name</th>
                <th className="qty-col" style={{ border: "1px solid #ccc", padding: "6px", textAlign: "right" }}>Qty</th>
                <th className="price-col" style={{ border: "1px solid #ccc", padding: "6px", textAlign: "right" }}>List Price</th>
                <th className="discount-col" style={{ border: "1px solid #ccc", padding: "6px", textAlign: "right" }}>Disc %</th>
                <th className="nett-col" style={{ border: "1px solid #ccc", padding: "6px", textAlign: "right" }}>Nett Price</th>
                <th className="total-col" style={{ border: "1px solid #ccc", padding: "6px", textAlign: "right" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const grossAmount = item.price * item.quantity
                const discountAmount = grossAmount * (item.discount / 100)
                const netAmount = grossAmount - discountAmount
                return (
                  <tr key={`pdf-${item.id}`}>
                    <td className="sno-col" style={{ border: "1px solid #ccc", padding: "6px" }}>{index + 1}</td>
                    <td className="product-col" style={{ border: "1px solid #ccc", padding: "6px" }}>{item.productName}</td>
                    <td className="qty-col" style={{ border: "1px solid #ccc", padding: "6px", textAlign: "right" }}>{item.quantity}</td>
                    <td className="price-col" style={{ border: "1px solid #ccc", padding: "6px", textAlign: "right" }}>
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td className="discount-col" style={{ border: "1px solid #ccc", padding: "6px", textAlign: "right" }}>
                      {item.discount.toFixed(2)}%
                    </td>
                    <td className="nett-col" style={{ border: "1px solid #ccc", padding: "6px", textAlign: "right" }}>
                      ₹{(item.price * (1 - item.discount / 100)).toFixed(2)}
                    </td>
                    <td className="total-col" style={{ border: "1px solid #ccc", padding: "6px", textAlign: "right" }}>
                      ₹{netAmount.toFixed(2)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginTop: "20px" }}>
            <div style={{ width: "40%" }}>
              <strong>Terms & Conditions:</strong>
              <div
                style={{
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  fontSize: "11px",
                  fontFamily: "Arial, sans-serif",
                  border: "1px solid #eee",
                  padding: "8px",
                  marginTop: "5px",
                  minHeight: "60px",
                  backgroundColor: "#f9f9f9",
                  lineHeight: 1.4,
                  overflowWrap: "break-word"
                }}
                dangerouslySetInnerHTML={{ __html: terms.replace(/^\s*\n/, '') }}
              />
            </div>
            <div style={{ width: "35%", textAlign: "right" }}>
              <p style={{ margin: "0 0 5px 0" }}>
                <strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}
              </p>
              <div id="gst-row-pdf">
                {applyGST && (
                  <p style={{ margin: "0 0 5px 0" }}>
                    <strong>GST (18%):</strong> ₹{gstAmount.toFixed(2)}
                  </p>
                )}
              </div>
              <p style={{ margin: "0 0 5px 0" }}>
                <strong>Round off:</strong> {roundOffAmount > 0 ? '+' : ''}{roundOffAmount === 0 ? '0.00' : roundOffAmount.toFixed(2)}
              </p>
              <div style={{ marginBottom: '15px' }}> </div> {/* Increased spacing */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '100px', borderTop: '1px solid #ccc' }}></div>
              </div>
              <p style={{ fontWeight: "bold", fontSize: "13px", margin: "5px 0 0 0" }}>
                <strong>Grand Total:</strong> ₹{roundedTotal.toFixed(2)}
              </p>
            </div>
          </div>
          <div
            style={{
              marginTop: "30px",
              fontSize: "9px",
              textAlign: "center",
              borderTop: "1px dashed #ccc",
              paddingTop: "10px",
              color: "#777",
            }}
          >
            This is a computer-generated quotation. No signature required.
          </div>
        </div>
      </div>
      <style jsx global>{`
        .simplified-output .product-family-text,
        .simplified-output .product-family-text + span,
        .simplified-output .discount-col,
        .simplified-output .price-col {
          display: none !important;
        }
        .simplified-output .sno-col {
          width: 10%;
        }
        .simplified-output .product-col {
          width: 50%;
        }
        .simplified-output .qty-col {
          width: 10%;
        }
        .simplified-output .nett-col,
        .simplified-output .total-col {
          width: 15%;
        }
      `}</style>
      <div style={{ textAlign: 'center', color: '#777', marginTop: '40px', marginBottom: '20px' }}>
        Copyright © {new Date().getFullYear()} Sagarawat Electricals. Made with ❤️ by Adish Sagarawat in भारत.
      </div>
      </div>
    </div>
  )
}
