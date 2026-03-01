/* ===== GLOBAL SETUP & VARIABLES ===== */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');

// Carousel variables (for index.html)
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

/* ===== NAVIGATION & SCROLL FUNCTIONS ===== */

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Check if link matches current page
        if (href.includes(currentPage) || 
            (currentPage === '' && href.includes('index.html')) ||
            (currentPage === 'index.html' && href.includes('index.html'))) {
            link.classList.add('active');
        }
        // Special case: if on index.html and link is #home or #brand, mark #home as active
        else if (currentPage === 'index.html' && href === '#home') {
            link.classList.add('active');
        }
    });
}

// Navbar scroll effect
function updateHeaderOnScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Hamburger menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Scroll event listener
window.addEventListener('scroll', updateHeaderOnScroll);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateHeaderOnScroll();
    setActiveNavLink();
});

/* ===== CAROUSEL FUNCTIONS (for index.html) ===== */

function changeSlide(n) {
    currentSlideIndex += n;
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    showSlide(currentSlideIndex);
}

function currentSlide(n) {
    currentSlideIndex = n;
    showSlide(currentSlideIndex);
}

function showSlide(n) {
    if (slides.length === 0) return; // Skip if no slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slides[n].classList.add('active');
    dots[n].classList.add('active');
}

// Auto-advance carousel every 5 seconds (only if slides exist)
if (slides.length > 0) {
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Paired button hover effects (for index.html product list)
document.querySelectorAll('.pl-card').forEach(card => {
    const btnOutline = card.querySelector('.btn-outline');
    const btnPrimary = card.querySelector('.btn-primary');
    if (!btnOutline || !btnPrimary) return;

    function attachPairHover(source, target) {
        source.addEventListener('mouseenter', () => target.classList.add('inverted'));
        source.addEventListener('mouseleave', () => target.classList.remove('inverted'));
        source.addEventListener('focus', () => target.classList.add('inverted'));
        source.addEventListener('blur', () => target.classList.remove('inverted'));
    }

    attachPairHover(btnOutline, btnPrimary);
    attachPairHover(btnPrimary, btnOutline);
});

/* ===== PRODUCTS PAGE FUNCTIONS ===== */

function filterProducts(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter products
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            if (card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        }
    });
}

/* ===== SUPPORT PAGE FUNCTIONS ===== */

function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const toggle = element.querySelector('.faq-toggle');
    
    answer.classList.toggle('open');
    toggle.classList.toggle('open');
}

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Search functionality (support page)
const searchInput = document.querySelector('#searchInput');
if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.toLowerCase();
            if (query.includes('faq') || query.includes('question')) {
                scrollToSection('faq');
            } else if (query.includes('warranty')) {
                scrollToSection('warranty');
            } else if (query.includes('service') || query.includes('center')) {
                scrollToSection('service');
            } else if (query.includes('download') || query.includes('manual')) {
                scrollToSection('downloads');
            } else if (query.includes('contact') || query.includes('phone') || query.includes('email')) {
                scrollToSection('contact');
            }
        }
    });
}

/* ===== SOLUTIONS PAGE FUNCTIONS ===== */

function switchSolution(solutionId) {
    // Remove active class from all content sections
    document.querySelectorAll('.solution-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add active class to selected content
    document.getElementById(solutionId).classList.add('active');

    // Add active class to clicked button
    event.target.classList.add('active');

    // Scroll to content smoothly
    setTimeout(() => {
        document.querySelector('.solution-content.active').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

/* ===== CONTACT PAGE FUNCTIONS ===== */

function filterRegions(region) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter cards
    const cards = document.querySelectorAll('.region-card');
    cards.forEach(card => {
        if (region === 'all') {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 10);
        } else {
            if (card.dataset.region === region) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        }
    });
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const country = document.getElementById('country').value;
    const inquiry = document.getElementById('inquiry').value;
    const products = document.getElementById('products').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send this to a server
    // For now, show a success message
    alert(`Thank you, ${name}! Your inquiry has been submitted.\n\nWe'll contact you at ${email} soon.`);
    
    // Reset form
    event.target.reset();
}

/* ===== SHARED TRANSITION STYLES ===== */

// Add smooth opacity transitions for filtered cards (products and contact pages)
const transitionStyle = document.createElement('style');
transitionStyle.textContent = `
    .product-card {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .region-card {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(transitionStyle);
