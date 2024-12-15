// Modern Header Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const closeMenu = document.querySelector('.close-menu');
const navLinks = document.querySelector('.nav-links');

function closeNavMenu() {
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.add('active');
        document.body.classList.add('menu-open');
    });
}

if (closeMenu) {
    closeMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        closeNavMenu();
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.modern-nav') && navLinks.classList.contains('active')) {
        closeNavMenu();
    }
});

// Close menu when pressing escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeNavMenu();
    }
});

// Function to get the amount from the URL
function getAmountFromURL() {
    const queryString = window.location.search;

    // If there's no query string, return null
    if (!queryString) return null;

    // Extract the amount after the '?'
    const amountStr = decodeURIComponent(queryString.substring(1)).trim();

    // Validate the amount
    return !isNaN(amountStr) && amountStr !== '' ? amountStr : null;
}

// Function to generate the UPI URL
function generateUpiUrl(amount) {
    const baseUrl = 'upi://pay?pa=Q833310781@ybl&mam=1'; 
    return amount ? `${baseUrl}&am=${encodeURIComponent(amount)}` : baseUrl;
}

// Function to generate the QR code
function generateQrCode(upiUrl) {
    // Clear any existing QR code
    const qrcodeElement = document.getElementById('qrcode');
    if (!qrcodeElement) return;
    
    qrcodeElement.innerHTML = '';

    // Calculate QR code size based on screen width
    let qrCodeWidth = 350; // Default size
    let screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
        qrCodeWidth = Math.min(screenWidth * 0.8, 350); // 80% of screen width on mobile, max 350px
    }

    // Generate new QR code
    new QRCode(qrcodeElement, {
        text: upiUrl,
        width: qrCodeWidth,
        height: qrCodeWidth,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
    });
}

// Get the current year and update the copyright
const copyrightYear = document.getElementById("copyrightYear");
if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
}

// Main Execution Function
(function () {
    const amount = getAmountFromURL();
    const upiUrl = generateUpiUrl(amount);

    // Set the href attributes
    const upiPayLink = document.getElementById('upiPayLink');
    const upiAppsLink = document.getElementById('upiAppsLink');
    const amountDisplay = document.getElementById('amount-display');

    if (upiPayLink) upiPayLink.setAttribute('href', upiUrl);
    if (upiAppsLink) upiAppsLink.setAttribute('href', upiUrl);

    // Generate the QR code
    generateQrCode(upiUrl);

    // Update amount display
    if (amountDisplay) {
        const amountText = amountDisplay.parentElement;
        if (amount) {
            amountDisplay.innerHTML = `<span class="currency">₹</span><span class="number">${amount}</span>`;
            amountText.style.display = 'block';
        } else {
            amountText.style.display = 'none';
        }
    }
})();
