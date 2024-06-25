document.addEventListener('DOMContentLoaded', () => {
    const items = {
        "6a switch": { britzy: 25, allzy: 30, arteor: 35 },
        "6a socket": { britzy: 50, allzy: 60, arteor: 70 },
        "16a switch": { britzy: 35, allzy: 40, arteor: 45 },
        "16a socket": { britzy: 60, allzy: 70, arteor: 80 },
        "2m plate": { britzy: 100, allzy: 120, arteor: 140 },
        "5m plate": { britzy: 150, allzy: 180, arteor: 210 },
        "8m plate": { britzy: 200, allzy: 240, arteor: 280 }
    };

    const families = {
        britzy: "britzy",
        allzy: "allzy",
        arteor: "arteor"
    };

    const itemsTable = document.querySelector('#itemsTable tbody');
    const familySelect = document.getElementById('familySelect');
    const totalPriceElement = document.getElementById('totalPrice');
    const addItemRowButton = document.getElementById('addItemRow');
    const includeGSTCheckbox = document.getElementById('includeGST');
    const loginContainer = document.getElementById('loginContainer');
    const quotationContainer = document.getElementById('quotationContainer');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    const VALID_USERNAMES = ['paras', 'ankesh'];
    const VALID_PASSWORDS = ['6408', 'ankeshpatel123'];
    
    const SESSION_TIMEOUT = 48 * 60 * 60 * 1000; // 48 hours

    let selectedFamily = familySelect.value;

    // Function to format numbers as Indian currency
    function formatCurrency(num) {
        return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // Function to update the row price
    function updateRowPrice(row) {
        const itemSelect = row.querySelector('.itemSelect');
        const priceCell = row.querySelector('.priceCell');
        const quantityInput = row.querySelector('.quantityInput');
        const discountInput = row.querySelector('.discountInput');
        const nettCell = row.querySelector('.nettCell');

        const selectedItem = itemSelect.value;
        const quantity = parseFloat(quantityInput.value);
        const discount = parseFloat(discountInput.value);

        const price = selectedItem ? items[selectedItem][selectedFamily] : 0;
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

        const amountText = `Amount: ${formatCurrency(totalAmount)}`;
        const gstText = includeGSTCheckbox.checked ? `(18% GST) + ${formatCurrency(gstAmount)}` : '';
        const totalPriceText = `Total Price: ${formatCurrency(totalPrice)}`;

        totalPriceElement.innerHTML = `
            <div>${amountText}</div>
            ${gstText ? `<div>${gstText}</div>` : ''}
            <div><strong>${totalPriceText}</strong></div>
        `;
    }

// Function to add a new row
function addRow() {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><button class="removeRowBtn">-</button></td>
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
                <input type="number" min="0" value="0" class="discountInput" step="1">
                <span class="percent-symbol">%</span>
            </div>
        </td>
        <td class="nettCell">₹0.00</td>
    `;

    itemsTable.appendChild(newRow);
    updateRowPrice(newRow);


        const removeRowBtn = newRow.querySelector('.removeRowBtn');
        removeRowBtn.addEventListener('click', () => {
            newRow.remove();
            updateTotalPrice();
        });

        const itemSelect = newRow.querySelector('.itemSelect');
        itemSelect.addEventListener('change', () => updateRowPrice(newRow));

        const quantityInput = newRow.querySelector('.quantityInput');
        quantityInput.addEventListener('input', () => updateRowPrice(newRow));

        const discountInput = newRow.querySelector('.discountInput');
        discountInput.addEventListener('input', () => updateRowPrice(newRow));

        quantityInput.addEventListener('wheel', (event) => {
            event.preventDefault();
            const delta = Math.sign(event.deltaY);
            const newValue = Math.max(0, parseInt(quantityInput.value) - delta);
            quantityInput.value = newValue;
            updateRowPrice(newRow);
        });

        quantityInput.addEventListener('focus', () => {
            quantityInput.style.appearance = 'textfield';
        });

        quantityInput.addEventListener('blur', () => {
            quantityInput.style.appearance = 'none';
        });
    }

// Function to initialize the first row
function initializeFirstRow() {
    const firstRow = itemsTable.querySelector('tr');
    const firstItemSelect = firstRow.querySelector('.itemSelect');
    const firstQuantityInput = firstRow.querySelector('.quantityInput');
    const firstDiscountInput = firstRow.querySelector('.discountInput');

    Object.keys(items).forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        firstItemSelect.appendChild(option);
    });

    const removeRowBtn = firstRow.querySelector('.removeRowBtn');
    removeRowBtn.addEventListener('click', () => {
        firstRow.remove();
        updateTotalPrice();
    });

    firstItemSelect.addEventListener('change', () => updateRowPrice(firstRow));
    firstQuantityInput.addEventListener('input', () => updateRowPrice(firstRow));
    firstDiscountInput.addEventListener('input', () => updateRowPrice(firstRow));

    firstQuantityInput.addEventListener('wheel', (event) => {
        event.preventDefault();
        const delta = Math.sign(event.deltaY);
        const newValue = Math.max(0, parseInt(firstQuantityInput.value) - delta);
        firstQuantityInput.value = newValue;
        updateRowPrice(firstRow);
    });

    const discountContainer = document.createElement('div');
    discountContainer.classList.add('discount-container');
    discountContainer.appendChild(firstDiscountInput);
    const percentSymbol = document.createElement('span');
    percentSymbol.classList.add('percent-symbol');
    percentSymbol.textContent = '%';
    discountContainer.appendChild(percentSymbol);

    const discountColumn = firstRow.querySelector('.discount-column');
    discountColumn.appendChild(discountContainer);
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
            localStorage.setItem('session', Date.now());
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
                localStorage.setItem('session', currentTime);
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
    addItemRowButton.addEventListener('click', addRow);
    logoutBtn.addEventListener('click', handleLogout);

    // Initialize the app
    initializeFirstRow();
    checkSession();

    // Set the current year in the footer
    const currentYear = new Date().getFullYear();
    document.getElementById('copyrightYear').textContent = currentYear;
});
