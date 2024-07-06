document.addEventListener('DOMContentLoaded', () => {
    // Begin Updating inventory
    const items = {"6a switch": {"Arteor": 95, "Allzy": 75, "Britzy": 65, "Mylinc": 55}, "6a socket": {"Arteor": 66, "Allzy": 76, "Britzy": 86, "Mylinc": 96}, "16a switch": {"Arteor": 77, "Allzy": 87, "Britzy": 97, "Mylinc": 107}, "16a socket": {"Arteor": 88, "Allzy": 85, "Britzy": 98, "Mylinc": 108}, "2m plate": {"Arteor": 99, "Allzy": 65, "Britzy": 42, "Mylinc": 12}, "5m plate": {"Arteor": 111, "Allzy": 111, "Britzy": 111, "Mylinc": 1101}, "8m plate": {"Arteor": 222, "Allzy": 222, "Britzy": 333, "Mylinc": 1000}};
    const families = {"Arteor": "Arteor", "Allzy": "Allzy", "Britzy": "Britzy", "Mylinc": "Mylinc"};
    // END Updating inventory

    const itemsTable = document.querySelector('#itemsTable tbody');
    const familySelect = document.getElementById('familySelect');
    const totalPriceElement = document.getElementById('totalPrice');
    const includeGSTCheckbox = document.getElementById('includeGST');
    const loginContainer = document.getElementById('loginContainer');
    const quotationContainer = document.getElementById('quotationContainer');
    const loginForm = document.getElementById('loginForm');
    const logoutLink = document.getElementById('logoutLink');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const notepad = document.getElementById('notepad');

    const VALID_USERNAMES = ['paras', 'ankesh', 'demo'];
    const VALID_PASSWORDS = ['6408', 'ankeshpatel123', 'demo123'];

    const SESSION_TIMEOUT = 48 * 60 * 60 * 1000; // 48 hours

    let selectedFamily = familySelect.value;

    // Function to format numbers as Indian currency
    function formatCurrency(num) {
        return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // Function To calculate the Round Off
    function calculateRoundOff(amount) {
        const roundedAmount = Math.round(amount);
        const difference = roundedAmount - amount;
        return {
            roundedAmount: roundedAmount,
            difference: difference
        };
    }

    // Function to update the row price
    function updateRowPrice(row) {
        const itemSelect = row.querySelector('.itemSelect');
        const priceCell = row.querySelector('.priceCell');
        const quantityInput = row.querySelector('.quantityInput');
        const discountInput = row.querySelector('.discountInput');
        const nettCell = row.querySelector('.nettCell');

        const selectedItem = itemSelect.value;
        const quantity = parseFloat(quantityInput.value) || 0;
        const discount = parseFloat(discountInput.value) || 0;

        const price = selectedItem && items[selectedItem] ? items[selectedItem][selectedFamily] : 0;
        const discountAmount = price * (discount / 100);
        const discountedPrice = price - discountAmount;
        const nett = discountedPrice * quantity;

        priceCell.textContent = formatCurrency(price);
        nettCell.textContent = formatCurrency(nett);

        updateTotalPrice();
    }

    // Function to update the total price
    function updateTotalPrice() {
        let totalAmount = 0;

        itemsTable.querySelectorAll('tr').forEach(row => {
            const nettCell = row.querySelector('.nettCell');
            const nett = parseFloat(nettCell.textContent.replace('₹', '').replace(/,/g, ''));
            totalAmount += nett;
        });

        let gstAmount = 0;
        let totalPrice = totalAmount;

        if (includeGSTCheckbox.checked) {
            gstAmount = totalAmount * 0.18;
            totalPrice = totalAmount + gstAmount;
        }

        const roundOffResult = calculateRoundOff(totalPrice);
        const roundOffAmount = roundOffResult.difference;
        const finalTotal = roundOffResult.roundedAmount;

        const amountText = `Amount: ${formatCurrency(totalAmount)}`;
        const gstText = includeGSTCheckbox.checked ? `(18% GST) + ${formatCurrency(gstAmount)}` : '';
        const roundOffText = `Round Off: ${roundOffAmount >= 0 ? '+' : '-'} ${formatCurrency(Math.abs(roundOffAmount))}`;
        const totalPriceText = `Total Price: ${formatCurrency(finalTotal)}`;

        totalPriceElement.innerHTML = `
            <div>${amountText}</div>
            ${gstText ? `<div>${gstText}</div>` : ''}
            <div>${roundOffText}</div>
            <div><strong>${totalPriceText}</strong></div>
        `;
    }

    // Function to update all discount inputs with the value of the first discount input
    function updateAllDiscountInputs(value) {
        const discountInputs = itemsTable.querySelectorAll('.discountInput');
        discountInputs.forEach((input, index) => {
            if (index !== 0) { // Skip the first input
                input.value = value;
                const row = input.closest('tr');
                updateRowPrice(row);
            }
        });
    }

    // Function to handle keydown event on quantity input
    function handleQuantityInputKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const currentRow = event.target.closest('tr');
            const nextRow = currentRow.nextElementSibling;
            if (!nextRow) {
                addRow();
            }
            const nextQuantityInput = (nextRow || itemsTable.lastElementChild).querySelector('.quantityInput');
            nextQuantityInput.focus();
        }
    }

    // Function to add a new row
    function addRow() {
        const newRow = document.createElement('tr');
        const firstDiscountInput = document.querySelector('.discountInput');
        const rowCount = itemsTable.querySelectorAll('tr').length + 1;
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

        itemsTable.appendChild(newRow);
        updateRowPrice(newRow);

        const rowNumber = newRow.querySelector('.row-number');
        rowNumber.addEventListener('click', () => {
            newRow.remove();
            updateRowNumbers();
            updateTotalPrice();
        });

        const itemSelect = newRow.querySelector('.itemSelect');
        itemSelect.addEventListener('change', () => updateRowPrice(newRow));

        const quantityInput = newRow.querySelector('.quantityInput');
        quantityInput.addEventListener('input', () => updateRowPrice(newRow));
        quantityInput.addEventListener('keydown', handleQuantityInputKeydown);

        const discountInput = newRow.querySelector('.discountInput');
        discountInput.addEventListener('input', () => {
            if (discountInput === document.querySelector('.discountInput')) {
                updateAllDiscountInputs(discountInput.value);
            }
            updateRowPrice(newRow);
        });

        quantityInput.addEventListener('wheel', (event) => {
            event.preventDefault();
            const delta = Math.sign(event.deltaY);
            const newValue = Math.max(0, parseInt(quantityInput.value) - delta);
            quantityInput.value = newValue;
            updateRowPrice(newRow);
        });

        discountInput.addEventListener('wheel', (event) => {
            event.preventDefault();
            const delta = Math.sign(event.deltaY) * 0.1;
            const newValue = Math.min(100, Math.max(0, parseFloat(discountInput.value) - delta));
            discountInput.value = newValue.toFixed(1);
            if (discountInput === document.querySelector('.discountInput')) {
                updateAllDiscountInputs(discountInput.value);
            }
            updateRowPrice(newRow);
        });
    }

    // Function to update row numbers
    function updateRowNumbers() {
        itemsTable.querySelectorAll('tr').forEach((row, index) => {
            const rowNumber = row.querySelector('.row-number');
            if (rowNumber) {
                rowNumber.textContent = `${index + 1}.`;
            }
        });
    }

    // Function to initialize the first row
    function initializeFirstRow() {
        const firstRow = itemsTable.querySelector('tr');
        if (!firstRow) {
            addRow();
            return;
        }
        
        const firstItemSelect = firstRow.querySelector('.itemSelect');
        const firstQuantityInput = firstRow.querySelector('.quantityInput');
        const firstDiscountInput = firstRow.querySelector('.discountInput');

        // Clear existing options
        firstItemSelect.innerHTML = '<option value="">Select Item</option>';

        // Add items to the dropdown
        Object.keys(items).forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            firstItemSelect.appendChild(option);
        });

        // Ensure the discount input has the correct attributes and the percent symbol
        firstDiscountInput.setAttribute('type', 'number');
        firstDiscountInput.setAttribute('min', '0');
        firstDiscountInput.setAttribute('max', '100');
        firstDiscountInput.setAttribute('step', '0.1');
        if (!firstDiscountInput.nextElementSibling || !firstDiscountInput.nextElementSibling.classList.contains('percent-symbol')) {
            const percentSymbol = document.createElement('span');
            percentSymbol.textContent = '%';
            percentSymbol.classList.add('percent-symbol');
            firstDiscountInput.parentNode.insertBefore(percentSymbol, firstDiscountInput.nextSibling);
        }

        const rowNumber = firstRow.querySelector('.row-number');
        if (!rowNumber) {
            const firstCell = firstRow.querySelector('td');
            firstCell.innerHTML = '<button class="row-number">1.</button>';
            const newRowNumber = firstRow.querySelector('.row-number');
            newRowNumber.addEventListener('click', () => {
                firstRow.remove();
                updateRowNumbers();
                updateTotalPrice();
            });
        }

        firstItemSelect.addEventListener('change', () => updateRowPrice(firstRow));
        firstQuantityInput.addEventListener('input', () => updateRowPrice(firstRow));
        firstQuantityInput.addEventListener('keydown', handleQuantityInputKeydown);
        firstDiscountInput.addEventListener('input', () => {
            updateAllDiscountInputs(firstDiscountInput.value);
            updateRowPrice(firstRow);
        });

        firstQuantityInput.addEventListener('wheel', (event) => {
            event.preventDefault();
            const delta = Math.sign(event.deltaY);
            const newValue = Math.max(0, parseInt(firstQuantityInput.value) - delta);
            firstQuantityInput.value = newValue;
            updateRowPrice(firstRow);
        });

        firstDiscountInput.addEventListener('wheel', (event) => {
            event.preventDefault();
            const delta = Math.sign(event.deltaY) * 0.1;
            const newValue = Math.min(100, Math.max(0, parseFloat(firstDiscountInput.value) - delta));
            firstDiscountInput.value = newValue.toFixed(1);
            updateAllDiscountInputs(firstDiscountInput.value);
            updateRowPrice(firstRow);
        });
    }

    // Function to initialize family select
    function initializeFamilySelect() {
        // Clear existing options
        familySelect.innerHTML = '';

        // Add families to the dropdown
        Object.keys(families).forEach(family => {
            const option = document.createElement('option');
            option.value = family;
            option.textContent = family;
            familySelect.appendChild(option);
        });

        // Set the default selected family
        selectedFamily = Object.keys(families)[0];
        familySelect.value = selectedFamily;
    }

    // Function to check login credentials
    function validateLogin() {
        const inputUsername = username.value;
        const inputPassword = password.value;

        const validIndex = VALID_USERNAMES.findIndex((user, index) => user === inputUsername && VALID_PASSWORDS[index] === inputPassword);

        if (validIndex !== -1) {
            return true;
        } else {
            alert('Invalid username or password.');
            return false;
        }
    }

    // Function to handle login
    function handleLogin(event) {
        event.preventDefault();
        if (validateLogin()) {
            loginContainer.style.display = 'none';
            quotationContainer.style.display = 'block';
            localStorage.setItem('session', Date.now().toString());
            updateTotalPrice();
        }
    }

    // Function to check session validity
    function checkSession() {
        const session = localStorage.getItem('session');
        if (session) {
            const sessionTime = parseInt(session);
            const currentTime = Date.now();
            if (currentTime - sessionTime < SESSION_TIMEOUT) {
                localStorage.setItem('session', currentTime.toString());
                loginContainer.style.display = 'none';
                quotationContainer.style.display = 'block';
            } else {
                localStorage.removeItem('session');
            }
        }
    }

    // Function to handle logout
    function handleLogout() {
        localStorage.removeItem('session');
        loginContainer.style.display = 'block';
        quotationContainer.style.display = 'none';
    }

    // Event listeners
    loginForm.addEventListener('submit', handleLogin);
    familySelect.addEventListener('change', () => {
        selectedFamily = familySelect.value;
        itemsTable.querySelectorAll('tr').forEach(row => updateRowPrice(row));
    });
    includeGSTCheckbox.addEventListener('change', updateTotalPrice);
    logoutLink.addEventListener('click', handleLogout);
    
    //Function to adjust notepad height
    function adjustTextareaHeight() {
        notepad.style.height = '1px'; 
        notepad.style.height = Math.min(notepad.scrollHeight, 200) + 'px';
    }    
    notepad.addEventListener('input', adjustTextareaHeight);
    window.addEventListener('load', adjustTextareaHeight);
    

    // Initialize the app
    initializeFamilySelect();
    initializeFirstRow();
    checkSession();

    // Set the current year in the footer
    const currentYear = new Date().getFullYear();
    document.getElementById('copyrightYear').textContent = currentYear;

    // Save and load notepad content
    notepad.value = localStorage.getItem('notepadContent') || notepad.value;
    notepad.addEventListener('input', () => {
        localStorage.setItem('notepadContent', notepad.value);
    });
});