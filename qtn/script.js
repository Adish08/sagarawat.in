document.addEventListener('DOMContentLoaded', () => {

    // Inventory Begins
    const items = {"Switch 6A.1W": {"Britzy White- White Plate": 46, "Britzy White- Color Plate": 46, "Allzy White - White Plate": 46, "Allzy White - Black Plate": 46, "Allzy White - Metallic Plate": 46, "Allzy  M Black  - White Plate": 51, "Allzy  M Black  -  M Black Plate": 51, "Allzy  M Black  -  Metallic Plate": 51}, "Socket 6A": {"Britzy White- White Plate": 120, "Britzy White- Color Plate": 120, "Allzy White - White Plate": 131, "Allzy White - Black Plate": 131, "Allzy White - Metallic Plate": 131, "Allzy  M Black  - White Plate": 150, "Allzy  M Black  -  M Black Plate": 150, "Allzy  M Black  -  Metallic Plate": 150}, "Switch 16A.1W Ind": {"Britzy White- White Plate": 162, "Britzy White- Color Plate": 162, "Allzy White - White Plate": 158, "Allzy White - Black Plate": 158, "Allzy White - Metallic Plate": 158, "Allzy  M Black  - White Plate": 180, "Allzy  M Black  -  M Black Plate": 180, "Allzy  M Black  -  Metallic Plate": 180}, "Socket 16A": {"Britzy White- White Plate": 208, "Britzy White- Color Plate": 208, "Allzy White - White Plate": 212, "Allzy White - Black Plate": 212, "Allzy White - Metallic Plate": 212, "Allzy  M Black  - White Plate": 240, "Allzy  M Black  -  M Black Plate": 240, "Allzy  M Black  -  Metallic Plate": 240}, "Switch 6A 2W": {"Britzy White- White Plate": 104, "Britzy White- Color Plate": 104, "Allzy White - White Plate": 101, "Allzy White - Black Plate": 101, "Allzy White - Metallic Plate": 101, "Allzy  M Black  - White Plate": 115, "Allzy  M Black  -  M Black Plate": 115, "Allzy  M Black  -  Metallic Plate": 115}, "Switch 16A 2W": {"Britzy White- White Plate": 180, "Britzy White- Color Plate": 180, "Allzy White - White Plate": 174, "Allzy White - Black Plate": 174, "Allzy White - Metallic Plate": 174, "Allzy  M Black  - White Plate": 198, "Allzy  M Black  -  M Black Plate": 198, "Allzy  M Black  -  Metallic Plate": 198}, "M. STD. Socket 13A": {"Britzy White- White Plate": 176, "Britzy White- Color Plate": 176, "Allzy White - White Plate": 188, "Allzy White - Black Plate": 188, "Allzy White - Metallic Plate": 188, "Allzy  M Black  - White Plate": 216, "Allzy  M Black  -  M Black Plate": 216, "Allzy  M Black  -  Metallic Plate": 216}, "MCB SP Modular 1M": {"Britzy White- White Plate": 358, "Britzy White- Color Plate": 358, "Allzy White - White Plate": 382, "Allzy White - Black Plate": 382, "Allzy White - Metallic Plate": 382, "Allzy  M Black  - White Plate": 435, "Allzy  M Black  -  M Black Plate": 435, "Allzy  M Black  -  Metallic Plate": 435}, "DP Switch 20A": {"Britzy White- White Plate": 228, "Britzy White- Color Plate": 228, "Allzy White - White Plate": 228, "Allzy White - Black Plate": 228, "Allzy White - Metallic Plate": 228, "Allzy  M Black  - White Plate": 256, "Allzy  M Black  -  M Black Plate": 256, "Allzy  M Black  -  Metallic Plate": 256}, "DP Switch 32A": {"Britzy White- White Plate": 302, "Britzy White- Color Plate": 302, "Allzy White - White Plate": 295, "Allzy White - Black Plate": 295, "Allzy White - Metallic Plate": 295, "Allzy  M Black  - White Plate": 336, "Allzy  M Black  -  M Black Plate": 336, "Allzy  M Black  -  Metallic Plate": 336}, "Step Regulator 1M": {"Britzy White- White Plate": 446, "Britzy White- Color Plate": 446, "Allzy White - White Plate": 436, "Allzy White - Black Plate": 436, "Allzy White - Metallic Plate": 436, "Allzy  M Black  - White Plate": 500, "Allzy  M Black  -  M Black Plate": 500, "Allzy  M Black  -  Metallic Plate": 500}, "Step Regulator 2M": {"Britzy White- White Plate": 466, "Britzy White- Color Plate": 466, "Allzy White - White Plate": 500, "Allzy White - Black Plate": 500, "Allzy White - Metallic Plate": 500, "Allzy  M Black  - White Plate": 571, "Allzy  M Black  -  M Black Plate": 571, "Allzy  M Black  -  Metallic Plate": 571}, "AC Starter 25A.": {"Britzy White- White Plate": 524, "Britzy White- Color Plate": 524, "Allzy White - White Plate": 528, "Allzy White - Black Plate": 528, "Allzy White - Metallic Plate": 528, "Allzy  M Black  - White Plate": 606, "Allzy  M Black  -  M Black Plate": 606, "Allzy  M Black  -  Metallic Plate": 606}, "USB Charger 1M": {"Britzy White- White Plate": 924, "Britzy White- Color Plate": 924, "Allzy White - White Plate": 1023, "Allzy White - Black Plate": 1023, "Allzy White - Metallic Plate": 1023, "Allzy  M Black  - White Plate": 1163, "Allzy  M Black  -  M Black Plate": 1163, "Allzy  M Black  -  Metallic Plate": 1163}, "USB Charger 2M": {"Britzy White- White Plate": 1224, "Britzy White- Color Plate": 1224, "Allzy White - White Plate": 1649, "Allzy White - Black Plate": 1649, "Allzy White - Metallic Plate": 1649, "Allzy  M Black  - White Plate": 1878, "Allzy  M Black  -  M Black Plate": 1878, "Allzy  M Black  -  Metallic Plate": 1878}, "Skirting Light": {"Britzy White- White Plate": 444, "Britzy White- Color Plate": 444, "Allzy White - White Plate": 356, "Allzy White - Black Plate": 356, "Allzy White - Metallic Plate": 356, "Allzy  M Black  - White Plate": 408, "Allzy  M Black  -  M Black Plate": 408, "Allzy  M Black  -  Metallic Plate": 408}, "TV Socket": {"Britzy White- White Plate": 104, "Britzy White- Color Plate": 104, "Allzy White - White Plate": 104, "Allzy White - Black Plate": 104, "Allzy White - Metallic Plate": 104, "Allzy  M Black  - White Plate": 118, "Allzy  M Black  -  M Black Plate": 118, "Allzy  M Black  -  Metallic Plate": 118}, "Tele. Jack Single": {"Britzy White- White Plate": 110, "Britzy White- Color Plate": 110, "Allzy White - White Plate": 110, "Allzy White - Black Plate": 110, "Allzy White - Metallic Plate": 110, "Allzy  M Black  - White Plate": 124, "Allzy  M Black  -  M Black Plate": 124, "Allzy  M Black  -  Metallic Plate": 124}, "Indicator LED": {"Britzy White- White Plate": 110, "Britzy White- Color Plate": 110, "Allzy White - White Plate": 110, "Allzy White - Black Plate": 110, "Allzy White - Metallic Plate": 110, "Allzy  M Black  - White Plate": 689, "Allzy  M Black  -  M Black Plate": 689, "Allzy  M Black  -  Metallic Plate": 689}, "Blank Plate": {"Britzy White- White Plate": 28, "Britzy White- Color Plate": 28, "Allzy White - White Plate": 26, "Allzy White - Black Plate": 26, "Allzy White - Metallic Plate": 26, "Allzy  M Black  - White Plate": 29, "Allzy  M Black  -  M Black Plate": 29, "Allzy  M Black  -  Metallic Plate": 29}, "Bell Push (1M)": {"Britzy White- White Plate": 124, "Britzy White- Color Plate": 124, "Allzy White - White Plate": 121, "Allzy White - Black Plate": 121, "Allzy White - Metallic Plate": 121, "Allzy  M Black  - White Plate": 137, "Allzy  M Black  -  M Black Plate": 137, "Allzy  M Black  -  Metallic Plate": 137}, "Bell Push (2M)": {"Britzy White- White Plate": 188, "Britzy White- Color Plate": 188, "Allzy White - White Plate": 184, "Allzy White - Black Plate": 184, "Allzy White - Metallic Plate": 184, "Allzy  M Black  - White Plate": 210, "Allzy  M Black  -  M Black Plate": 210, "Allzy  M Black  -  Metallic Plate": 210}, "Plate 1M": {"Britzy White- White Plate": 82, "Britzy White- Color Plate": 144, "Allzy White - White Plate": 109, "Allzy White - Black Plate": 136, "Allzy White - Metallic Plate": 142, "Allzy  M Black  - White Plate": 109, "Allzy  M Black  -  M Black Plate": 136, "Allzy  M Black  -  Metallic Plate": 142}, "Plate 2M": {"Britzy White- White Plate": 82, "Britzy White- Color Plate": 144, "Allzy White - White Plate": 109, "Allzy White - Black Plate": 136, "Allzy White - Metallic Plate": 142, "Allzy  M Black  - White Plate": 109, "Allzy  M Black  -  M Black Plate": 136, "Allzy  M Black  -  Metallic Plate": 142}, "Plate 3M": {"Britzy White- White Plate": 112, "Britzy White- Color Plate": 180, "Allzy White - White Plate": 150, "Allzy White - Black Plate": 180, "Allzy White - Metallic Plate": 196, "Allzy  M Black  - White Plate": 150, "Allzy  M Black  -  M Black Plate": 180, "Allzy  M Black  -  Metallic Plate": 196}, "Plate 4M": {"Britzy White- White Plate": 122, "Britzy White- Color Plate": 216, "Allzy White - White Plate": 160, "Allzy White - Black Plate": 205, "Allzy White - Metallic Plate": 211, "Allzy  M Black  - White Plate": 160, "Allzy  M Black  -  M Black Plate": 205, "Allzy  M Black  -  Metallic Plate": 211}, "Plate 6M": {"Britzy White- White Plate": 156, "Britzy White- Color Plate": 300, "Allzy White - White Plate": 220, "Allzy White - Black Plate": 282, "Allzy White - Metallic Plate": 316, "Allzy  M Black  - White Plate": 220, "Allzy  M Black  -  M Black Plate": 282, "Allzy  M Black  -  Metallic Plate": 316}, "Plate 8M - HZ": {"Britzy White- White Plate": 200, "Britzy White- Color Plate": 320, "Allzy White - White Plate": 269, "Allzy White - Black Plate": 312, "Allzy White - Metallic Plate": 351, "Allzy  M Black  - White Plate": 269, "Allzy  M Black  -  M Black Plate": 312, "Allzy  M Black  -  Metallic Plate": 351}, "Plate 8M - Sq": {"Britzy White- White Plate": 200, "Britzy White- Color Plate": 388, "Allzy White - White Plate": 269, "Allzy White - Black Plate": 312, "Allzy White - Metallic Plate": 351, "Allzy  M Black  - White Plate": 269, "Allzy  M Black  -  M Black Plate": 312, "Allzy  M Black  -  Metallic Plate": 351}, "Plate 12M": {"Britzy White- White Plate": 292, "Britzy White- Color Plate": 540, "Allzy White - White Plate": 388, "Allzy White - Black Plate": 453, "Allzy White - Metallic Plate": 508, "Allzy  M Black  - White Plate": 388, "Allzy  M Black  -  M Black Plate": 453, "Allzy  M Black  -  Metallic Plate": 508}, "Plate 16M": {"Britzy White- White Plate": 314, "Britzy White- Color Plate": 728, "Allzy White - White Plate": 416, "Allzy White - Black Plate": 517, "Allzy White - Metallic Plate": 546, "Allzy  M Black  - White Plate": 416, "Allzy  M Black  -  M Black Plate": 517, "Allzy  M Black  -  Metallic Plate": 546}, "Plate 18M": {"Britzy White- White Plate": 386, "Britzy White- Color Plate": 838, "Allzy White - White Plate": 443, "Allzy White - Black Plate": 546, "Allzy White - Metallic Plate": 582, "Allzy  M Black  - White Plate": 443, "Allzy  M Black  -  M Black Plate": 546, "Allzy  M Black  -  Metallic Plate": 582}};
const families = {"Britzy White- White Plate": "Britzy White- White Plate", "Britzy White- Color Plate": "Britzy White- Color Plate", "Allzy White - White Plate": "Allzy White - White Plate", "Allzy White - Black Plate": "Allzy White - Black Plate", "Allzy White - Metallic Plate": "Allzy White - Metallic Plate", "Allzy  M Black  - White Plate": "Allzy  M Black  - White Plate", "Allzy  M Black  -  M Black Plate": "Allzy  M Black  -  M Black Plate", "Allzy  M Black  -  Metallic Plate": "Allzy  M Black  -  Metallic Plate"};
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
            generatePdfBtn: document.getElementById('generatePdfBtn'),
            partyNameInput: document.getElementById('partyName'),
            resetQuotationBtn: document.getElementById('resetQuotationBtn')
        };
    
        const VALID_CREDENTIALS = [
            { username: 'paras', password: '6408' },
            { username: 'ankesh', password: 'ankeshpatel123' },
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
            const itemSelect = row.querySelector('.itemSelect');
            const priceCell = row.querySelector('.priceCell');
            const quantityInput = row.querySelector('.quantityInput');
            const discountInput = row.querySelector('.discountInput');
            const nettCell = row.querySelector('.nettCell');
    
            const selectedItem = itemSelect.value;
            const quantity = parseFloat(quantityInput.value) || 0;
            const discount = parseFloat(discountInput.value) || 0;
    
            const price = items[selectedItem]?.[selectedFamily] || 0;
            const discountedPrice = price * (1 - discount / 100);
            const nett = discountedPrice * quantity;
    
            priceCell.textContent = formatCurrency(price);
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
            }
        }   
    
        function addRow() {
            const newRow = document.createElement('tr');
            const firstDiscountInput = document.querySelector('.discountInput');
            const rowCount = elements.itemsTable.querySelectorAll('tr').length + 1;
            
            newRow.innerHTML = `
                <td><button class="row-number">${rowCount}.</button></td>
                <td>
                    <select class="itemSelect custom-dropdown">
                        <option value="">Select Item</option>
                        ${Object.keys(items).map(item => `<option value="${item}">${item}</option>`).join('')}
                    </select>
                </td>
                <td><input type="number" min="0" value="0" class="quantityInput" step="1"></td>
                <td class="priceCell">₹0.00</td>
                <td class="discount-column">
                    <div class="discount-container">
                        <input type="number" min="0" max="100" value="${firstDiscountInput ? firstDiscountInput.value : '0'}" class="discountInput" step="0.1">
                        <span class="percent-symbol">%</span>
                    </div>
                </td>
                <td class="nettCell">₹0.00</td>
            `;
    
            elements.itemsTable.appendChild(newRow);
            setupRowEventListeners(newRow);
            updateRowPrice(newRow);
            return newRow;
        }
    
        function setupRowEventListeners(row) {
            const rowNumber = row.querySelector('.row-number');
            const itemSelect = row.querySelector('.itemSelect');
            const quantityInput = row.querySelector('.quantityInput');
            const discountInput = row.querySelector('.discountInput');
    
            rowNumber.addEventListener('click', () => {
                row.remove();
                updateRowNumbers();
                updateTotalPrice();
                saveQuotationData();
            });
    
            itemSelect.addEventListener('change', () => updateRowPrice(row));
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
    
        function initializeFamilySelect() {
            elements.familySelect.innerHTML = Object.keys(families).map(family => 
                `<option value="${family}">${family}</option>`
            ).join('');
            selectedFamily = Object.keys(families)[0];
            elements.familySelect.value = selectedFamily;
        }
    
        function generatePdf() {
            const elementsToHide = [
                elements.generatePdfBtn,
                document.querySelector('.gst-checkbox'),
                document.querySelector('footer')
            ];
            elementsToHide.forEach(el => el.style.display = 'none');
            const opt = {
                margin: 10,
                filename: `Quotation_${elements.partyNameInput.value || 'Customer'}.pdf`,
                image: { type: 'jpeg', quality: 0.99 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(elements.quotationContainer).save().then(() => {
                elementsToHide.forEach(el => el.style.display = '');
            });
        }
        
        function validateLogin(username, password) {
            return VALID_CREDENTIALS.some(cred => cred.username === username && cred.password === password);
        }
    
        function handleLogin(event) {
            event.preventDefault();
            if (validateLogin(elements.username.value, elements.password.value)) {
                elements.loginContainer.style.display = 'none';
                elements.quotationContainer.style.display = 'block';
                localStorage.setItem('session', Date.now().toString());
                loadQuotationData();
                updateTotalPrice();
            } else {
                alert('Invalid username or password.');
            }
        }
    
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
            const rows = Array.from(elements.itemsTable.querySelectorAll('tr')).map(row => ({
                item: row.querySelector('.itemSelect').value,
                quantity: row.querySelector('.quantityInput').value,
                discount: row.querySelector('.discountInput').value
            }));
    
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
                    newRow.querySelector('.itemSelect').value = rowData.item;
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
            elements.familySelect.value = Object.keys(families)[0];
            selectedFamily = Object.keys(families)[0];
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
        elements.generatePdfBtn.addEventListener('click', generatePdf);
        elements.resetQuotationBtn.addEventListener('click', resetQuotation);
        elements.partyNameInput.addEventListener('input', saveQuotationData);
    
        initializeFamilySelect();
        checkSession();
    
        document.getElementById('copyrightYear').textContent = new Date().getFullYear();
    });