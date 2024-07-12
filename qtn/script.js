document.addEventListener('DOMContentLoaded', () => {
    const items = {"6a switch": {"Arteor": 95, "Allzy": 75, "Britzy": 65, "Mylinc": 55}, "6a socket": {"Arteor": 66, "Allzy": 76, "Britzy": 86, "Mylinc": 96}, "16a switch": {"Arteor": 77, "Allzy": 87, "Britzy": 97, "Mylinc": 107}, "16a socket": {"Arteor": 88, "Allzy": 85, "Britzy": 98, "Mylinc": 108}, "2m plate": {"Arteor": 99, "Allzy": 65, "Britzy": 42, "Mylinc": 12}, "5m plate": {"Arteor": 111, "Allzy": 111, "Britzy": 111, "Mylinc": 1101}, "8m plate": {"Arteor": 222, "Allzy": 222, "Britzy": 333, "Mylinc": 1000}};
    const families = {"Arteor": "Arteor", "Allzy": "Allzy", "Britzy": "Britzy", "Mylinc": "Mylinc"};

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
        notepad: document.getElementById('notepad')
    };

    const VALID_CREDENTIALS = [
        { username: 'paras', password: '6408' },
        { username: 'ankesh', password: 'ankeshpatel123' },
        { username: 'demo', password: 'demo123' }
    ];

    const SESSION_TIMEOUT = 48 * 60 * 60 * 1000;

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

    function handleQuantityInputKeydown(event) {
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
        });

        itemSelect.addEventListener('change', () => updateRowPrice(row));
        quantityInput.addEventListener('input', () => updateRowPrice(row));
        quantityInput.addEventListener('keydown', handleQuantityInputKeydown);
        
        discountInput.addEventListener('input', () => {
            if (discountInput === document.querySelector('.discountInput')) {
                updateAllDiscountInputs(discountInput.value);
            }
            updateRowPrice(row);
        });

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

    function validateLogin(username, password) {
        return VALID_CREDENTIALS.some(cred => cred.username === username && cred.password === password);
    }

    function handleLogin(event) {
        event.preventDefault();
        if (validateLogin(elements.username.value, elements.password.value)) {
            elements.loginContainer.style.display = 'none';
            elements.quotationContainer.style.display = 'block';
            localStorage.setItem('session', Date.now().toString());
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
        } else {
            localStorage.removeItem('session');
        }
    }

    function handleLogout() {
        localStorage.removeItem('session');
        elements.loginContainer.style.display = 'block';
        elements.quotationContainer.style.display = 'none';
    }

    function adjustTextareaHeight() {
        elements.notepad.style.height = 'auto';
        elements.notepad.style.height = `${Math.min(elements.notepad.scrollHeight, 200)}px`;
    }

    function trimContent() {
        elements.notepad.value = elements.notepad.value.split('\n')
            .map(line => line.trim())
            .filter(line => line !== '')
            .join('\n')
            .trim();
    }

    elements.loginForm.addEventListener('submit', handleLogin);
    elements.familySelect.addEventListener('change', () => {
        selectedFamily = elements.familySelect.value;
        elements.itemsTable.querySelectorAll('tr').forEach(row => updateRowPrice(row));
    });
    elements.includeGSTCheckbox.addEventListener('change', updateTotalPrice);
    elements.logoutLink.addEventListener('click', handleLogout);

    elements.notepad.addEventListener('input', () => {
        trimContent();
        adjustTextareaHeight();
        localStorage.setItem('notepadContent', elements.notepad.value);
    });

    elements.notepad.addEventListener('keyup', (event) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            trimContent();
            adjustTextareaHeight();
            localStorage.setItem('notepadContent', elements.notepad.value);
        }
    });

    initializeFamilySelect();
    initializeFirstRow();
    checkSession();

    document.getElementById('copyrightYear').textContent = new Date().getFullYear();
});