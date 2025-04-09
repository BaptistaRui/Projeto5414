/**
 * Benfica Website JavaScript
 * Main functionality for site-wide features
 * @author Rui Miguel Lopes Baptista
 */

document.addEventListener('DOMContentLoaded', function () {
    // Core functionality
    initNavigation();
    initThemeSwitcher();
    initSmoothScroll();
    
    // Enhanced visuals
    initBackToTop();
    initAnimations();
    initLightbox();
    initStatCounters();
    
    // Page-specific features
    initGalleryFilters();
    initContactForm();
    enhanceFormFeedback();

    // Newsletter form
    initNewsletterForm();
    
    // Check if auth.js is loaded
    if (typeof initAuth === 'function') {
        initAuth();
    }
});

/**
 * Navigation and header functionality
 */
function initNavigation() {
    // Insert the header navigation
    const header = document.querySelector('header');
    if (!header) return;
    
    header.innerHTML = `
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/SL_Benfica_logo.svg/1200px-SL_Benfica_logo.svg.png" alt="SL Benfica Logo" class="logo">
        <h1>Sport Lisboa e Benfica</h1>
        <div class="nav-container">
            <div class="nav-links">
                <a href="index.html">Início</a>
                <a href="historia.html">História</a>
                <a href="galeria-jogadores.html">Jogadores</a>
                <a href="estadio.html">Estádio</a>
                <a href="contactos.html">Contactos</a>
            </div>
            <label class="theme-switch">
                <span class="theme-icon">☀️</span>
                <input type="checkbox" id="theme-toggle">
                <span class="theme-switch-track">
                    <span class="theme-switch-thumb"></span>
                </span>
            </label>
        </div>
        <div class="mobile-menu-toggle">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active-link');
        }
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            document.querySelector('.nav-links').classList.toggle('mobile-active');
            this.classList.toggle('active');
        });
    }
    
    // Check if we should add auth elements (if auth.js is loaded)
    if (typeof checkLoginStatus === 'function') {
        checkLoginStatus();
    }
}

/**
 * Theme switcher functionality
 */
function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'dark';
        document.querySelector('.theme-icon').textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
        document.querySelector('.theme-icon').textContent = '🌙';
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        document.querySelector('.theme-icon').textContent = this.checked ? '🌙' : '☀️';
    });
}

/**
 * Contact form validation and handling
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Input validation helpers
    function showError(inputId, show) {
        const errorElement = document.getElementById(inputId + '-error');
        if (errorElement) {
            errorElement.style.display = show ? 'block' : 'none';
        }
    }

    function validateInput(input) {
        if (input.validity.valid) {
            showError(input.id, false);
            return true;
        } else {
            showError(input.id, true);
            return false;
        }
    }

    // Add validation to input fields
    const inputs = ['name', 'email', 'subject', 'message'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (!input) return;

        // Validate on blur event
        input.addEventListener('blur', () => validateInput(input));

        // Hide error when typing if valid
        input.addEventListener('input', () => {
            if (input.validity.valid) {
                showError(input.id, false);
            }
        });
    });

    // Form submission handling
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // Validate all inputs
        inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input && !validateInput(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // For demonstration, show success message
            form.innerHTML = `
                <div class="success-message">
                    <h3>Mensagem enviada com sucesso!</h3>
                    <p>Obrigado pelo seu contacto. Responderemos o mais brevemente possível.</p>
                </div>
            `;
        }
    });
}

/**
 * Form input enhancement
 */
function enhanceFormFeedback() {
    const formInputs = document.querySelectorAll('.form-control');
    if (!formInputs.length) return;
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.closest('.form-group').classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.closest('.form-group').classList.remove('focused');
        });
    });
}

/**
 * Gallery filters functionality
 */
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Get filter value and update active button
            const filterValue = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter player cards
            const players = document.querySelectorAll('.player-card');
            const legendsSection = document.querySelector('.legends-section');
            
            // Handle legends section visibility
            if (legendsSection) {
                legendsSection.style.display = (filterValue === 'todos') ? 'block' : 'none';
            }

            players.forEach(player => {
                // Skip legend cards
                if (player.closest('.legends-section')) return;

                const position = player.getAttribute('data-position');
                player.style.display = (filterValue === 'todos' || position === filterValue) ? 'block' : 'none';
            });
        });
    });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Image lightbox functionality
 */
function initLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-image, .player-image');
    if (!galleryImages.length) return;

    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <div class="lightbox-image-container">
                <img class="lightbox-image" src="" alt="">
            </div>
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');

    // Open lightbox functionality
    galleryImages.forEach(image => {
        image.addEventListener('click', function () {
            lightbox.classList.add('loading');
            lightbox.style.display = 'flex';
            lightboxImage.style.opacity = '0';

            // Preload image
            const img = new Image();
            img.onload = function () {
                lightbox.classList.remove('loading');
                lightboxImage.src = this.src;
                lightboxImage.alt = image.alt;
                lightboxCaption.textContent = image.alt;

                // Fade in image
                setTimeout(() => {
                    lightboxImage.style.opacity = '1';
                }, 50);
            };
            img.src = this.src;
        });
    });

    // Close lightbox functionality
    document.querySelector('.close-lightbox').addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightboxImage.src = '';
    });

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            lightboxImage.src = '';
        }
    });

    // Keyboard support
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
            lightboxImage.src = '';
        }
    });
}

/**
 * Back to top button functionality
 */
function initBackToTop() {
    // Create the button
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(backToTopButton);

    // Show/hide based on scroll position
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Animation on scroll functionality
 */
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (!animatedElements.length) return;

    const checkVisibility = () => {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    // Check on load and scroll
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
}

/**
 * Animated stat counters
 */
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;
    
    const options = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const valueText = target.textContent.trim();
                const finalValue = parseInt(valueText.replace(/\D/g, ''));
                let startValue = 0;
                const duration = 2000;
                const increment = Math.ceil(finalValue / (duration / 30));
                
                let counter = setInterval(() => {
                    startValue += increment;
                    if (startValue > finalValue) {
                        target.textContent = valueText; // Restore original formatting
                        clearInterval(counter);
                    } else {
                        // Keep any non-numeric parts in the display
                        target.textContent = valueText.replace(/\d+/, startValue);
                    }
                }, 30);
                
                observer.unobserve(target);
            }
        });
    }, options);
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

/**
 * Debug helper function - only active in development
 */
function debug(message, data, showAlert = false) {
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        console.log(`[Benfica Debug] ${message}:`, data);
        if (showAlert) {
            alert(`Debug: ${message}`);
        }
    }
}
/**
 * Newsletter form functionality
 */
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterContainer = document.getElementById('newsletter-container');
    const newsletterSuccess = document.getElementById('newsletter-success');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const emailInput = document.getElementById('newsletter-email');
            if (emailInput && emailInput.value.trim() !== '') {
                // Hide the form
                newsletterContainer.classList.add('d-none');

                // Show success message
                newsletterSuccess.classList.remove('d-none');

                // Optional: You could add AJAX here to actually submit the email to a server
            }
        });
    }
}