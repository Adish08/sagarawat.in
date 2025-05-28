// DOM Elements
const elements = {
    menuToggle: document.querySelector('.menu-toggle'),
    closeMenu: document.querySelector('.close-menu'),
    navLinks: document.querySelector('.nav-links'),
    upiPayLink: document.getElementById('upiPayLink'),
    upiAppsLink: document.getElementById('upiAppsLink'),
    amountDisplay: document.getElementById('amount-display'),
    copyrightYear: document.getElementById('copyrightYear')
};

// Mobile Menu Functions
const mobileMenu = {
    close() {
        elements.navLinks?.classList.remove('active');
        document.body.classList.remove('menu-open');
    },
    
    init() {
        // Menu toggle button
        elements.menuToggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            elements.navLinks?.classList.add('active');
            document.body.classList.add('menu-open');
        });

        // Close button
        elements.closeMenu?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.close();
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.modern-nav') && elements.navLinks?.classList.contains('active')) {
                this.close();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.navLinks?.classList.contains('active')) {
                this.close();
            }
        });
    }
};

// Payment Functions
const payment = {
    getAmountFromURL() {
        try {
            const queryString = window.location.search;
            if (!queryString) return null;

            const amountStr = decodeURIComponent(queryString.substring(1)).trim();
            const amount = parseFloat(amountStr);

            return !isNaN(amount) && amount > 0 ? amount.toFixed(2) : null;
        } catch (error) {
            console.error('Error parsing amount:', error);
            return null;
        }
    },

    generateUpiUrl(amount) {
        const baseUrl = 'upi://pay?pa=Q833310781@ybl&mam=1';
        return amount ? `${baseUrl}&am=${encodeURIComponent(amount)}` : baseUrl;
    },

    generateQrCode(upiUrl) {
        const qrcodeElement = document.getElementById('qrcode');
        if (!qrcodeElement) return;

        try {
            qrcodeElement.innerHTML = '';
            
            const screenWidth = window.innerWidth;
            const qrCodeWidth = screenWidth <= 768 ? 
                Math.min(screenWidth * 0.8, 350) : 350;

            new QRCode(qrcodeElement, {
                text: upiUrl,
                width: qrCodeWidth,
                height: qrCodeWidth,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.L
            });

            // Make QR code clickable after generation
            this.makeQrCodeClickable(upiUrl);
        } catch (error) {
            console.error('Error generating QR code:', error);
            qrcodeElement.innerHTML = '<p>Error generating QR code. Please try again.</p>';
        }
    },

    makeQrCodeClickable(upiUrl) {
        const qrcodeContainer = document.getElementById('qrcode-container');
        
        if (!qrcodeContainer) return;

        // Add cursor pointer style to indicate clickability
        qrcodeContainer.style.cursor = 'pointer';
        
        // Store the UPI URL for this container to avoid duplicate listeners
        if (qrcodeContainer.dataset.upiUrl === upiUrl) {
            return; // Already configured with this URL
        }
        qrcodeContainer.dataset.upiUrl = upiUrl;
        
        // Remove any existing listeners by cloning only the attributes, not the content
        const existingListeners = qrcodeContainer.cloneNode(false);
        
        // Add click event listener to the QR code container
        qrcodeContainer.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            try {
                // Attempt to open UPI URL
                window.location.href = upiUrl;
            } catch (error) {
                console.error('Error opening UPI link:', error);
                // Fallback: try opening in new tab
                try {
                    window.open(upiUrl, '_blank');
                } catch (fallbackError) {
                    console.error('Fallback also failed:', fallbackError);
                }
            }
        });

        // Add hover effect for better UX
        qrcodeContainer.addEventListener('mouseenter', () => {
            qrcodeContainer.style.transform = 'translateY(-5px)';
        });

        qrcodeContainer.addEventListener('mouseleave', () => {
            qrcodeContainer.style.transform = 'translateY(0)';
        });

        // Add touch feedback for mobile devices
        qrcodeContainer.addEventListener('touchstart', () => {
            qrcodeContainer.style.transform = 'scale(0.98)';
        });

        qrcodeContainer.addEventListener('touchend', () => {
            qrcodeContainer.style.transform = 'scale(1)';
        });
    },

    updateUI(amount, upiUrl) {
        // Update UPI links
        elements.upiPayLink?.setAttribute('href', upiUrl);
        elements.upiAppsLink?.setAttribute('href', upiUrl);

        // Update amount display
        if (elements.amountDisplay) {
            const amountText = elements.amountDisplay.parentElement;
            if (amount) {
                elements.amountDisplay.innerHTML = `<span class="currency">₹</span><span class="number">${amount}</span>`;
                amountText.style.display = 'block';
            } else {
                amountText.style.display = 'none';
            }
        }
    },

    init() {
        const amount = this.getAmountFromURL();
        const upiUrl = this.generateUpiUrl(amount);
        
        this.generateQrCode(upiUrl);
        this.updateUI(amount, upiUrl);
    }
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        mobileMenu.init();
        payment.init();
        
        // Update copyright year
        if (elements.copyrightYear) {
            elements.copyrightYear.textContent = new Date().getFullYear();
        }
    } catch (error) {
        console.error('Initialization error:', error);
    }
});
