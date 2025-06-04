document.addEventListener('DOMContentLoaded', () => {

    // Inventory Begins
const items = {"SWITCH 6A. 1 WAY": {"Britzy White - White Plate": 50, "Allzy White - White Plate": 50, "Allzy White - Black Plate": 50, "Allzy White - Metallic Plate": 50, "Allzy  M Black  - White Plate": 54, "Allzy  M Black  -  M Black Plate": 54, "Allzy M Black  -  Metallic Plate": 54}, "SOCKET 6A": {"Britzy White - White Plate": 138, "Allzy White - White Plate": 162, "Allzy White - Black Plate": 162, "Allzy White - Metallic Plate": 162, "Allzy  M Black  - White Plate": 196, "Allzy  M Black  -  M Black Plate": 196, "Allzy M Black  -  Metallic Plate": 196}, "SWITCH 16A 1 WAY IND": {"Britzy White - White Plate": 178, "Allzy White - White Plate": 170, "Allzy White - Black Plate": 170, "Allzy White - Metallic Plate": 170, "Allzy  M Black  - White Plate": 198, "Allzy  M Black  -  M Black Plate": 198, "Allzy M Black  -  Metallic Plate": 198}, "SOCKET 16": {"Britzy White - White Plate": 240, "Allzy White - White Plate": 234, "Allzy White - Black Plate": 234, "Allzy White - Metallic Plate": 234, "Allzy  M Black  - White Plate": 264, "Allzy  M Black  -  M Black Plate": 264, "Allzy M Black  -  Metallic Plate": 264}, "SWITCH 6A. 2 WAY": {"Britzy White - White Plate": 116, "Allzy White - White Plate": 110, "Allzy White - Black Plate": 110, "Allzy White - Metallic Plate": 110, "Allzy  M Black  - White Plate": 124, "Allzy  M Black  -  M Black Plate": 124, "Allzy M Black  -  Metallic Plate": 124}, "SWITCH 16A. 2 WAY": {"Britzy White - White Plate": 200, "Allzy White - White Plate": 190, "Allzy White - Black Plate": 190, "Allzy White - Metallic Plate": 190, "Allzy  M Black  - White Plate": 216, "Allzy  M Black  -  M Black Plate": 216, "Allzy M Black  -  Metallic Plate": 216}, "MCB SP MODULAR 1M": {"Britzy White - White Plate": 418, "Allzy White - White Plate": 430, "Allzy White - Black Plate": 430, "Allzy White - Metallic Plate": 430, "Allzy  M Black  - White Plate": 490, "Allzy  M Black  -  M Black Plate": 490, "Allzy M Black  -  Metallic Plate": 490}, "MCB DP MODULAR 2M": {"Britzy White - White Plate": 0, "Allzy White - White Plate": 816, "Allzy White - Black Plate": 816, "Allzy White - Metallic Plate": 816, "Allzy  M Black  - White Plate": 0, "Allzy  M Black  -  M Black Plate": 0, "Allzy M Black  -  Metallic Plate": 0}, "DP SWITCH 20A": {"Britzy White - White Plate": 254, "Allzy White - White Plate": 240, "Allzy White - Black Plate": 240, "Allzy White - Metallic Plate": 240, "Allzy  M Black  - White Plate": 270, "Allzy  M Black  -  M Black Plate": 270, "Allzy M Black  -  Metallic Plate": 270}, "DP SWITCH 32A": {"Britzy White - White Plate": 332, "Allzy White - White Plate": 320, "Allzy White - Black Plate": 320, "Allzy White - Metallic Plate": 320, "Allzy  M Black  - White Plate": 368, "Allzy  M Black  -  M Black Plate": 368, "Allzy M Black  -  Metallic Plate": 368}, "STEP FAN REGULATOR 1M": {"Britzy White - White Plate": 518, "Allzy White - White Plate": 488, "Allzy White - Black Plate": 488, "Allzy White - Metallic Plate": 488, "Allzy  M Black  - White Plate": 564, "Allzy  M Black  -  M Black Plate": 564, "Allzy M Black  -  Metallic Plate": 564}, "STEP FAN REGULATOR 2M": {"Britzy White - White Plate": 660, "Allzy White - White Plate": 562, "Allzy White - Black Plate": 562, "Allzy White - Metallic Plate": 562, "Allzy  M Black  - White Plate": 642, "Allzy  M Black  -  M Black Plate": 642, "Allzy M Black  -  Metallic Plate": 642}, "USB CHARGER 1M": {"Britzy White - White Plate": 1076, "Allzy White - White Plate": 956, "Allzy White - Black Plate": 956, "Allzy White - Metallic Plate": 956, "Allzy  M Black  - White Plate": 1200, "Allzy  M Black  -  M Black Plate": 1200, "Allzy M Black  -  Metallic Plate": 1200}, "USB CHARGER 2M": {"Britzy White - White Plate": 1224, "Allzy White - White Plate": 1526, "Allzy White - Black Plate": 1526, "Allzy White - Metallic Plate": 1526, "Allzy  M Black  - White Plate": 1774, "Allzy  M Black  -  M Black Plate": 1774, "Allzy M Black  -  Metallic Plate": 1774}, "SKIRTING LIGHT 2M": {"Britzy White - White Plate": 516, "Allzy White - White Plate": 402, "Allzy White - Black Plate": 402, "Allzy White - Metallic Plate": 402, "Allzy  M Black  - White Plate": 458, "Allzy  M Black  -  M Black Plate": 458, "Allzy M Black  -  Metallic Plate": 458}, "TV SOCKET 1M": {"Britzy White - White Plate": 114, "Allzy White - White Plate": 132, "Allzy White - Black Plate": 132, "Allzy White - Metallic Plate": 132, "Allzy  M Black  - White Plate": 132, "Allzy  M Black  -  M Black Plate": 132, "Allzy M Black  -  Metallic Plate": 132}, "TELE JACK 1M": {"Britzy White - White Plate": 124, "Allzy White - White Plate": 120, "Allzy White - Black Plate": 120, "Allzy White - Metallic Plate": 120, "Allzy  M Black  - White Plate": 142, "Allzy  M Black  -  M Black Plate": 142, "Allzy M Black  -  Metallic Plate": 142}, "LED INDICATOR": {"Britzy White - White Plate": 130, "Allzy White - White Plate": 160, "Allzy White - Black Plate": 160, "Allzy White - Metallic Plate": 160, "Allzy  M Black  - White Plate": 178, "Allzy  M Black  -  M Black Plate": 178, "Allzy M Black  -  Metallic Plate": 178}, "BLANK PLATE": {"Britzy White - White Plate": 32, "Allzy White - White Plate": 30, "Allzy White - Black Plate": 30, "Allzy White - Metallic Plate": 30, "Allzy  M Black  - White Plate": 32, "Allzy  M Black  -  M Black Plate": 32, "Allzy M Black  -  Metallic Plate": 32}, "BELL PUSH 1M": {"Britzy White - White Plate": 138, "Allzy White - White Plate": 130, "Allzy White - Black Plate": 130, "Allzy White - Metallic Plate": 130, "Allzy  M Black  - White Plate": 150, "Allzy  M Black  -  M Black Plate": 150, "Allzy M Black  -  Metallic Plate": 150}, "BELL PUSH 2M": {"Britzy White - White Plate": 208, "Allzy White - White Plate": 200, "Allzy White - Black Plate": 200, "Allzy White - Metallic Plate": 200, "Allzy  M Black  - White Plate": 230, "Allzy  M Black  -  M Black Plate": 230, "Allzy M Black  -  Metallic Plate": 230}, "PLATE 1M": {"Britzy White - White Plate": 104, "Allzy White - White Plate": 122, "Allzy White - Black Plate": 156, "Allzy White - Metallic Plate": 164, "Allzy  M Black  - White Plate": 122, "Allzy  M Black  -  M Black Plate": 156, "Allzy M Black  -  Metallic Plate": 164}, "PLATE 2M": {"Britzy White - White Plate": 104, "Allzy White - White Plate": 122, "Allzy White - Black Plate": 156, "Allzy White - Metallic Plate": 164, "Allzy  M Black  - White Plate": 122, "Allzy  M Black  -  M Black Plate": 156, "Allzy M Black  -  Metallic Plate": 164}, "PLATE 3M": {"Britzy White - White Plate": 142, "Allzy White - White Plate": 172, "Allzy White - Black Plate": 204, "Allzy White - Metallic Plate": 222, "Allzy  M Black  - White Plate": 172, "Allzy  M Black  -  M Black Plate": 204, "Allzy M Black  -  Metallic Plate": 222}, "PLATE 4M": {"Britzy White - White Plate": 150, "Allzy White - White Plate": 182, "Allzy White - Black Plate": 234, "Allzy White - Metallic Plate": 240, "Allzy  M Black  - White Plate": 182, "Allzy  M Black  -  M Black Plate": 234, "Allzy M Black  -  Metallic Plate": 240}, "PLATE 6M": {"Britzy White - White Plate": 200, "Allzy White - White Plate": 250, "Allzy White - Black Plate": 320, "Allzy White - Metallic Plate": 356, "Allzy  M Black  - White Plate": 250, "Allzy  M Black  -  M Black Plate": 320, "Allzy M Black  -  Metallic Plate": 356}, "PLATE 8M HZ": {"Britzy White - White Plate": 256, "Allzy White - White Plate": 306, "Allzy White - Black Plate": 352, "Allzy White - Metallic Plate": 396, "Allzy  M Black  - White Plate": 306, "Allzy  M Black  -  M Black Plate": 352, "Allzy M Black  -  Metallic Plate": 396}, "PLATE 8M SQ": {"Britzy White - White Plate": 256, "Allzy White - White Plate": 306, "Allzy White - Black Plate": 352, "Allzy White - Metallic Plate": 396, "Allzy  M Black  - White Plate": 306, "Allzy  M Black  -  M Black Plate": 352, "Allzy M Black  -  Metallic Plate": 396}, "PLATE 12M": {"Britzy White - White Plate": 370, "Allzy White - White Plate": 440, "Allzy White - Black Plate": 512, "Allzy White - Metallic Plate": 572, "Allzy  M Black  - White Plate": 440, "Allzy  M Black  -  M Black Plate": 512, "Allzy M Black  -  Metallic Plate": 572}, "PLATE 16M": {"Britzy White - White Plate": 398, "Allzy White - White Plate": 470, "Allzy White - Black Plate": 584, "Allzy White - Metallic Plate": 620, "Allzy  M Black  - White Plate": 470, "Allzy  M Black  -  M Black Plate": 584, "Allzy M Black  -  Metallic Plate": 620}, "PLATE 18M": {"Britzy White - White Plate": 490, "Allzy White - White Plate": 502, "Allzy White - Black Plate": 620, "Allzy White - Metallic Plate": 658, "Allzy  M Black  - White Plate": 502, "Allzy  M Black  -  M Black Plate": 620, "Allzy M Black  -  Metallic Plate": 658}, "MCB SP 6-32A": {"Britzy White - White Plate": 274, "Allzy White - White Plate": 274, "Allzy White - Black Plate": 274, "Allzy White - Metallic Plate": 274, "Allzy  M Black  - White Plate": 274, "Allzy  M Black  -  M Black Plate": 274, "Allzy M Black  -  Metallic Plate": 274}, "MCB SP 40A": {"Britzy White - White Plate": 606, "Allzy White - White Plate": 606, "Allzy White - Black Plate": 606, "Allzy White - Metallic Plate": 606, "Allzy  M Black  - White Plate": 606, "Allzy  M Black  -  M Black Plate": 606, "Allzy M Black  -  Metallic Plate": 606}, "MCB SP 63A": {"Britzy White - White Plate": 720, "Allzy White - White Plate": 720, "Allzy White - Black Plate": 720, "Allzy White - Metallic Plate": 720, "Allzy  M Black  - White Plate": 720, "Allzy  M Black  -  M Black Plate": 720, "Allzy M Black  -  Metallic Plate": 720}, "MCB DP 06-32A": {"Britzy White - White Plate": 968, "Allzy White - White Plate": 968, "Allzy White - Black Plate": 968, "Allzy White - Metallic Plate": 968, "Allzy  M Black  - White Plate": 968, "Allzy  M Black  -  M Black Plate": 968, "Allzy M Black  -  Metallic Plate": 968}, "MCB DP 40A": {"Britzy White - White Plate": 1354, "Allzy White - White Plate": 1354, "Allzy White - Black Plate": 1354, "Allzy White - Metallic Plate": 1354, "Allzy  M Black  - White Plate": 1354, "Allzy  M Black  -  M Black Plate": 1354, "Allzy M Black  -  Metallic Plate": 1354}, "MCB DP 63A": {"Britzy White - White Plate": 1565, "Allzy White - White Plate": 1565, "Allzy White - Black Plate": 1565, "Allzy White - Metallic Plate": 1565, "Allzy  M Black  - White Plate": 1565, "Allzy  M Black  -  M Black Plate": 1565, "Allzy M Black  -  Metallic Plate": 1565}, "MCB TP 06-32A": {"Britzy White - White Plate": 1606, "Allzy White - White Plate": 1606, "Allzy White - Black Plate": 1606, "Allzy White - Metallic Plate": 1606, "Allzy  M Black  - White Plate": 1606, "Allzy  M Black  -  M Black Plate": 1606, "Allzy M Black  -  Metallic Plate": 1606}, "MCB TP 40A": {"Britzy White - White Plate": 2275, "Allzy White - White Plate": 2275, "Allzy White - Black Plate": 2275, "Allzy White - Metallic Plate": 2275, "Allzy  M Black  - White Plate": 2275, "Allzy  M Black  -  M Black Plate": 2275, "Allzy M Black  -  Metallic Plate": 2275}, "MCB TP 63A": {"Britzy White - White Plate": 2486, "Allzy White - White Plate": 2486, "Allzy White - Black Plate": 2486, "Allzy White - Metallic Plate": 2486, "Allzy  M Black  - White Plate": 2486, "Allzy  M Black  -  M Black Plate": 2486, "Allzy M Black  -  Metallic Plate": 2486}, "MCB FP 06-32A": {"Britzy White - White Plate": 2164, "Allzy White - White Plate": 2164, "Allzy White - Black Plate": 2164, "Allzy White - Metallic Plate": 2164, "Allzy  M Black  - White Plate": 2164, "Allzy  M Black  -  M Black Plate": 2164, "Allzy M Black  -  Metallic Plate": 2164}, "MCB FP 40A": {"Britzy White - White Plate": 2630, "Allzy White - White Plate": 2630, "Allzy White - Black Plate": 2630, "Allzy White - Metallic Plate": 2630, "Allzy  M Black  - White Plate": 2630, "Allzy  M Black  -  M Black Plate": 2630, "Allzy M Black  -  Metallic Plate": 2630}, "MCB FP 63A": {"Britzy White - White Plate": 2996, "Allzy White - White Plate": 2996, "Allzy White - Black Plate": 2996, "Allzy White - Metallic Plate": 2996, "Allzy  M Black  - White Plate": 2996, "Allzy  M Black  -  M Black Plate": 2996, "Allzy M Black  -  Metallic Plate": 2996}};
const families = {"Britzy White - White Plate": "Britzy White - White Plate", "Allzy White - White Plate": "Allzy White - White Plate", "Allzy White - Black Plate": "Allzy White - Black Plate", "Allzy White - Metallic Plate": "Allzy White - Metallic Plate", "Allzy  M Black  - White Plate": "Allzy  M Black  - White Plate", "Allzy  M Black  -  M Black Plate": "Allzy  M Black  -  M Black Plate", "Allzy M Black  -  Metallic Plate": "Allzy M Black  -  Metallic Plate"};
//Inventory Ends
    const elements = {
            itemsTable: document.querySelector('#itemsTable tbody'),
            familySelect: document.getElementById('familySelect'),
            totalPriceElement: document.getElementById('totalPrice'),
            includeGSTCheckbox: document.getElementById('includeGST'),
            loginContainer: document.getElementById('loginContainer'),
            quotationContainer: document.getElementById('quotationContainer'),
            loginForm: document.getElementById('loginForm'),
            logoutLink: document.getElementById('logoutLink'),
            username: document.getElementById('username'),
            password: document.getElementById('password'),
            resetQuotationBtn: document.getElementById('resetQuotationBtn'),
            partyNameInput: document.getElementById('partyName')
        };
    
        const VALID_CREDENTIALS = [
            { username: 'paras', password: '6408' },
            { username: 'ankesh', password: 'ankeshpatel123' },
            { username: 'ajay', password: 'ajay787' },
            { username: 'demo', password: 'demo123' }
        ];
    
        const SESSION_TIMEOUT = 48 * 60 * 60 * 1000; // 48 hours
    
        let selectedFamily = elements.familySelect.value;
    
        function formatCurrency(num) {
            return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    
        function calculateRoundOff(amount) {
            const roundedAmount = Math.round(amount);
            return {
                roundedAmount,
                difference: roundedAmount - amount
            };
        }
    
        function updateRowPrice(row) {
            const itemInput = row.querySelector('.itemInput');
            const priceCell = row.querySelector('.priceCell');
            const quantityInput = row.querySelector('.quantityInput');
            const discountInput = row.querySelector('.discountInput');
            const nettCell = row.querySelector('.nettCell');
            const unitPriceDiscCell = row.querySelector('.unitPriceDiscCell'); // New cell
    
            const selectedItem = itemInput.dataset.selectedItem || '';
            const quantity = parseFloat(quantityInput.value) || 0;
            const discount = parseFloat(discountInput.value) || 0;
    
            const price = items[selectedItem]?.[selectedFamily] || 0;
            const discountedPrice = price * (1 - discount / 100);
            const nett = discountedPrice * quantity;
    
            priceCell.textContent = formatCurrency(price);
            if (unitPriceDiscCell) unitPriceDiscCell.textContent = formatCurrency(discountedPrice); // Display discounted unit price
            nettCell.textContent = formatCurrency(nett);
    
            updateTotalPrice();
            saveQuotationData();
        }
    
        function updateTotalPrice() {
            const totalAmount = Array.from(elements.itemsTable.querySelectorAll('.nettCell'))
                .reduce((sum, cell) => sum + parseFloat(cell.textContent.replace('₹', '').replace(/,/g, '')), 0);
    
            const gstAmount = elements.includeGSTCheckbox.checked ? totalAmount * 0.18 : 0;
            const totalPrice = totalAmount + gstAmount;
    
            const { roundedAmount: finalTotal, difference: roundOffAmount } = calculateRoundOff(totalPrice);
    
            elements.totalPriceElement.innerHTML = `
                <div>Amount: ${formatCurrency(totalAmount)}</div>
                ${elements.includeGSTCheckbox.checked ? `<div>(18% GST) + ${formatCurrency(gstAmount)}</div>` : ''}
                <div>Round Off: ${roundOffAmount >= 0 ? '+' : '-'} ${formatCurrency(Math.abs(roundOffAmount))}</div>
                <div><strong>Total Price: ${formatCurrency(finalTotal)}</strong></div>
            `;
        }
    
        function updateAllDiscountInputs(value) {
            elements.itemsTable.querySelectorAll('.discountInput').forEach((input, index) => {
                if (index !== 0) {
                    input.value = value;
                    updateRowPrice(input.closest('tr'));
                }
            });
        }
    
        function handleInputKeydown(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const currentRow = event.target.closest('tr');
                const nextRow = currentRow.nextElementSibling || addRow();
                nextRow.querySelector('.quantityInput').focus();
                nextRow.querySelector('.quantityInput').select();
            }
        }

        function createItemDropdown(itemInput, items) {
            // Remove existing dropdown if any
            const existingDropdown = document.querySelector('.item-dropdown');
            if (existingDropdown) {
                existingDropdown.remove();
            }
            
            const dropdown = document.createElement('div');
            dropdown.className = 'item-dropdown';
            
            const rect = itemInput.getBoundingClientRect();
            dropdown.style.width = itemInput.offsetWidth + 'px';
            dropdown.style.top = (rect.bottom + window.scrollY) + 'px';
            dropdown.style.left = (rect.left + window.scrollX) + 'px';
            
            // Filter items based on input
            const filterText = itemInput.value.toLowerCase();
            const filteredItems = Object.keys(items).filter(item => 
                item.toLowerCase().includes(filterText)
            );
            
            if (filteredItems.length === 0) {
                dropdown.innerHTML = '<div class="dropdown-item no-results">No items found</div>';
            } else {
                filteredItems.forEach((item, index) => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'dropdown-item';
                    itemElement.textContent = item;
                    itemElement.dataset.index = index;
                    
                    itemElement.addEventListener('click', () => {
                        itemInput.value = item;
                        itemInput.dataset.selectedItem = item;
                        dropdown.remove();
                        updateRowPrice(itemInput.closest('tr'));
                    });
                    
                    dropdown.appendChild(itemElement);
                });
            }
            
            document.body.appendChild(dropdown);
            
            // Track currently selected item
            let selectedIndex = -1;
            
            // Add keyboard navigation
            itemInput.addEventListener('keydown', function handleKeyDown(e) {
                const items = dropdown.querySelectorAll('.dropdown-item:not(.no-results)');
                if (items.length === 0) return;
                
                // Remove current selection
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    items[selectedIndex].classList.remove('selected');
                }
                
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
                    items[selectedIndex].classList.add('selected');
                    items[selectedIndex].scrollIntoView({ block: 'nearest' });
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    selectedIndex = Math.max(selectedIndex - 1, 0);
                    items[selectedIndex].classList.add('selected');
                    items[selectedIndex].scrollIntoView({ block: 'nearest' });
                } else if (e.key === 'Enter' && selectedIndex >= 0) {
                    e.preventDefault();
                    const selectedItem = items[selectedIndex].textContent;
                    itemInput.value = selectedItem;
                    itemInput.dataset.selectedItem = selectedItem;
                    dropdown.remove();
                    updateRowPrice(itemInput.closest('tr'));
                    
                    // Move focus to quantity field
                    const quantityInput = itemInput.closest('tr').querySelector('.quantityInput');
                    quantityInput.focus();
                    quantityInput.select();
                    
                    // Remove this event listener
                    itemInput.removeEventListener('keydown', handleKeyDown);
                }
            });
            
            // Add this CSS class for the selected item
            const style = document.createElement('style');
            style.textContent = `
                .dropdown-item.selected {
                    background-color: #f0f0f0;
                    font-weight: bold;
                }
            `;
            document.head.appendChild(style);
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function closeDropdown(e) {
                if (!itemInput.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                    itemInput.removeEventListener('keydown', handleKeyDown);
                }
            });
        }
    
        function addRow() {
            const newRow = document.createElement('tr');
            const firstDiscountInput = document.querySelector('.discountInput');
            const rowCount = elements.itemsTable.querySelectorAll('tr').length + 1;
            newRow.innerHTML = `
            <td><button class="row-number">${rowCount}.</button></td>
            <td>
                <input type="text" class="itemInput" placeholder="Type to search items">
            </td>
            <td class="quantity-column">
                <input type="number" min="0" value="0" class="quantityInput" step="1">
            </td>
            <td class="priceCell">₹0.00</td>
            <td class="discount-column">
                <div class="discount-container">
                    <input type="number" min="0" max="100" value="${firstDiscountInput ? firstDiscountInput.value : '0'}" class="discountInput" step="0.1">
                    <span class="percent-symbol">%</span>
                </div>
            </td>
            <td class="unitPriceDiscCell">₹0.00</td> <!-- New cell for discounted unit price -->
            <td class="nettCell">₹0.00</td>
            `;
    
            elements.itemsTable.appendChild(newRow);
            setupRowEventListeners(newRow);
            updateRowPrice(newRow);
            return newRow;
        }
    
        function setupRowEventListeners(row) {
            const rowNumber = row.querySelector('.row-number');
            const itemInput = row.querySelector('.itemInput');
            const quantityInput = row.querySelector('.quantityInput');
            const discountInput = row.querySelector('.discountInput');
    
            // Auto-select text when focusing on inputs
            quantityInput.addEventListener('focus', function() {
                this.select();
            });
            
            discountInput.addEventListener('focus', function() {
                this.select();
            });
            
            // Item input dropdown functionality
            itemInput.addEventListener('focus', () => {
                createItemDropdown(itemInput, items);
            });
            
            itemInput.addEventListener('input', () => {
                createItemDropdown(itemInput, items);
            });
            
            itemInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const dropdown = document.querySelector('.item-dropdown');
                    const firstItem = dropdown?.querySelector('.dropdown-item:not(.no-results)');
                    if (firstItem) {
                        itemInput.value = firstItem.textContent;
                        itemInput.dataset.selectedItem = firstItem.textContent;
                        dropdown.remove();
                        updateRowPrice(row);
                        quantityInput.focus();
                        quantityInput.select();
                    }
                }
            });
    
            rowNumber.addEventListener('click', () => {
                row.remove();
                updateRowNumbers();
                updateTotalPrice();
                saveQuotationData();
            });
    
            quantityInput.addEventListener('input', () => updateRowPrice(row));
            quantityInput.addEventListener('keydown', handleInputKeydown);
            discountInput.addEventListener('input', () => {
                if (discountInput === document.querySelector('.discountInput')) {
                    updateAllDiscountInputs(discountInput.value);
                }
                updateRowPrice(row);
            });
            discountInput.addEventListener('keydown', handleInputKeydown);    
    
            [quantityInput, discountInput].forEach(input => {
                input.addEventListener('wheel', (event) => {
                    event.preventDefault();
                    const delta = Math.sign(event.deltaY) * (input === discountInput ? 0.1 : 1);
                    const newValue = Math.max(0, Math.min(input === discountInput ? 100 : Infinity, parseFloat(input.value) - delta));
                    input.value = input === discountInput ? newValue.toFixed(1) : newValue;
                    if (input === discountInput && input === document.querySelector('.discountInput')) {
                        updateAllDiscountInputs(input.value);
                    }
                    updateRowPrice(row);
                });
            });
        }
    
        function updateRowNumbers() {
            elements.itemsTable.querySelectorAll('.row-number').forEach((button, index) => {
                button.textContent = `${index + 1}.`;
            });
        }
    
        function initializeFirstRow() {
            const firstRow = elements.itemsTable.querySelector('tr') || addRow();
            setupRowEventListeners(firstRow);
        }
    
        function validateLogin(username, password) {
            username = username.trim();
            password = password.trim();
            return VALID_CREDENTIALS.some(cred => cred.username === username && cred.password === password);
        }
        
        function handleLogin(event) {
            event.preventDefault();
            const username = elements.username.value.trim();
            const password = elements.password.value.trim();
        
            if (validateLogin(username, password)) {
                elements.loginContainer.style.display = 'none';
                elements.quotationContainer.style.display = 'block';
                localStorage.setItem('session', Date.now().toString());
                loadQuotationData();
                updateTotalPrice();
            } else {
                alert('Invalid username or password.');
            }
        }
        
        // Debugging Checks
        console.log('Loaded VALID_CREDENTIALS:', VALID_CREDENTIALS);
        console.log('Username input field:', elements.username);
        console.log('Password input field:', elements.password);
        
        // Attach event listener
        elements.loginForm.addEventListener('submit', handleLogin);
    
        function checkSession() {
            const session = localStorage.getItem('session');
            if (session && (Date.now() - parseInt(session)) < SESSION_TIMEOUT) {
                localStorage.setItem('session', Date.now().toString());
                elements.loginContainer.style.display = 'none';
                elements.quotationContainer.style.display = 'block';
                loadQuotationData();
            } else {
                localStorage.removeItem('session');
            }
        }
    
        function handleLogout() {
            localStorage.removeItem('session');
            elements.loginContainer.style.display = 'block';
            elements.quotationContainer.style.display = 'none';
        }
    
        function saveQuotationData() {
            const rows = Array.from(elements.itemsTable.querySelectorAll('tr')).map(row => {
                const itemInput = row.querySelector('.itemInput');
                return {
                    item: itemInput.dataset.selectedItem || '',
                    displayValue: itemInput.value,
                    quantity: row.querySelector('.quantityInput').value,
                    discount: row.querySelector('.discountInput').value
                };
            });
    
            const quotationData = {
                rows: rows,
                family: elements.familySelect.value,
                includeGST: elements.includeGSTCheckbox.checked,
                partyName: elements.partyNameInput.value
            };
    
            localStorage.setItem('quotationData', JSON.stringify(quotationData));
        }
    
        function loadQuotationData() {
            const savedData = localStorage.getItem('quotationData');
            if (savedData) {
                const quotationData = JSON.parse(savedData);
                
                elements.familySelect.value = quotationData.family;
                selectedFamily = quotationData.family;
                elements.includeGSTCheckbox.checked = quotationData.includeGST;
                elements.partyNameInput.value = quotationData.partyName;
    
                elements.itemsTable.innerHTML = '';
                quotationData.rows.forEach(rowData => {
                    const newRow = addRow();
                    const itemInput = newRow.querySelector('.itemInput');
                    itemInput.value = rowData.displayValue || rowData.item;
                    itemInput.dataset.selectedItem = rowData.item;
                    newRow.querySelector('.quantityInput').value = rowData.quantity;
                    newRow.querySelector('.discountInput').value = rowData.discount;
                    updateRowPrice(newRow);
                });
            } else {
                initializeFirstRow();
            }
        }
    
        function resetQuotation() {
            localStorage.removeItem('quotationData');
            elements.itemsTable.innerHTML = '';
            initializeFirstRow();
            elements.familySelect.value = Object.keys(items)[0];
            selectedFamily = Object.keys(items)[0];
            elements.includeGSTCheckbox.checked = false;
            elements.partyNameInput.value = '';
            updateTotalPrice();
        }
    
        elements.loginForm.addEventListener('submit', handleLogin);
        elements.familySelect.addEventListener('change', () => {
            selectedFamily = elements.familySelect.value;
            elements.itemsTable.querySelectorAll('tr').forEach(row => updateRowPrice(row));
        });
        elements.includeGSTCheckbox.addEventListener('change', () => {
            updateTotalPrice();
            saveQuotationData();
        });
        elements.logoutLink.addEventListener('click', handleLogout);
        elements.resetQuotationBtn.addEventListener('click', resetQuotation);
        elements.partyNameInput.addEventListener('input', saveQuotationData);
    
        // Initialize family select with the families from the items
        elements.familySelect.innerHTML = Object.values(items)[0] ? 
            Object.keys(Object.values(items)[0]).map(family => 
                `<option value="${family}">${family}</option>`
            ).join('') : '';
        
        if (elements.familySelect.options.length > 0) {
            selectedFamily = elements.familySelect.options[0].value;
            elements.familySelect.value = selectedFamily;
        }
        
        checkSession();
    
        document.getElementById('copyrightYear').textContent = new Date().getFullYear();
    });
