
const products = [
    { id: 1, name: 'Eco T-Shirt', price: 29.99, category: 'tops', imageKey: 'eco-tshirt' },
    { id: 2, name: 'Organic Denim', price: 59.99, category: 'bottoms', imageKey: 'organic-denim' },
    { id: 3, name: 'Recycled Hoodie', price: 49.99, category: 'outerwear', imageKey: 'recycled-hoodie' },
    { id: 4, name: 'Sustainable Dress', price: 79.99, category: 'dresses', imageKey: 'sustainable-dress' },
    { id: 5, name: 'Cotton Skirt', price: 39.99, category: 'bottoms', imageKey: 'cotton-skirt' },
    { id: 6, name: 'Eco-Friendly Jacket', price: 89.99, category: 'outerwear', imageKey: 'eco-jacket' },
];

const collections = [
    { id: 1, title: 'Summer Essentials', items: 6, imageKey: 'summer-collection' },
    { id: 2, title: 'Winter Collection', items: 8, imageKey: 'winter-collection' },
    { id: 3, title: 'Workwear Collection', items: 5, imageKey: 'workwear-collection' },
];

const reviews = [
    { id: 1, name: 'Sarah M.', rating: 5, comment: 'Absolutely love the sustainable approach and the quality of the clothes!', date: '2025-06-15' },
    { id: 2, name: 'James L.', rating: 4, comment: 'Great service and fast delivery. The packaging is eco-friendly too!', date: '2025-06-18' },
    { id: 3, name: 'Emma R.', rating: 5, comment: 'Best online fashion store for conscious consumers. Will definitely buy again.', date: '2025-06-20' },
];

// Global state
let activeSection = 'home';
let isMenuOpen = false;
let imageUrls = {}; // Store the URL of the images obtained from the database

// DOM elements
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const currentYearSpan = document.getElementById('current-year');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Load images from database first, then populate content
    loadImagesFromDatabase().then(() => {
        // Check if images were loaded successfully
        if (Object.keys(imageUrls).length === 0) {
            console.warn('No images loaded from database. Content will be displayed with placeholders.');
            // Show a user-friendly warning
            showImageLoadWarning();
        }
        
        // Populate dynamic content after images are loaded
        populateProducts();
        populateCollections();
        populateReviews();
        
        // Update hero image
        updateHeroImage();
    }).catch(error => {
        console.error('Failed to initialize app:', error);
        // Still populate content with placeholders
        populateProducts();
        populateCollections();
        populateReviews();
        updateHeroImage();
    });

    // Set initial active section
    updateActiveSection('home');

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Add fade-in animations
    addFadeInAnimations();

    // Initialize enhanced effects
    initializeMouseTrail();
    initializeMagneticButtons();
    initializeParallaxEffects();
    initializeRippleEffects();
}

// Load images from database
async function loadImagesFromDatabase() {
    try {
        const response = await fetch('get_images.php');
        const data = await response.json();
        
        if (data.error) {
            console.error('Error loading images:', data.error);
            return;
        }
        
        imageUrls = data;
        console.log('Images loaded from database:', imageUrls);
        
    } catch (error) {
        console.error('Error fetching images:', error);
        // If database fetch fails, show error message instead of using hardcoded URLs
        console.error('Failed to load images from database. Please check your database connection.');
        imageUrls = {};
    }
}

// Update hero image
function updateHeroImage() {
    const heroImage = document.getElementById('hero-image');
    if (heroImage) {
        if (imageUrls['hero-fashion']) {
            heroImage.src = imageUrls['hero-fashion'];
        } else {
            // If no image is retrieved, show placeholder or hide image
            heroImage.style.display = 'none';
            console.warn('Hero image not found in database');
        }
    }
}

// Navigation functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        updateActiveSection(sectionId);
        closeMobileMenu();
    }
}

function updateActiveSection(sectionId) {
    activeSection = sectionId;
    
    // Update desktop navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });

    // Update mobile navigation
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('mobile-menu-open');
        menuIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        `;
    } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('mobile-menu-open');
        menuIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        `;
    }
}

function closeMobileMenu() {
    if (isMenuOpen) {
        toggleMobileMenu();
    }
}

// Scroll handling
function handleScroll() {
    const sections = ['home', 'products', 'collections', 'about', 'reviews'];
    const currentScroll = window.scrollY + 200;
    
    for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= currentScroll && element.offsetTop + element.offsetHeight > currentScroll) {
            if (activeSection !== section) {
                updateActiveSection(section);
            }
            break;
        }
    }
}

// Content population functions (enhanced versions defined below)

function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += `
                <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            `;
        } else {
            stars += `
                <svg class="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            `;
        }
    }
    return stars;
}

// Enhanced animation functions
function addFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animations
                setTimeout(() => {
                    if (index % 2 === 0) {
                        entry.target.classList.add('fade-in-left');
                    } else {
                        entry.target.classList.add('fade-in-right');
                    }
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe cards for staggered animations
    const cards = document.querySelectorAll('.product-card, .collection-card, .review-card');
    cards.forEach((card, index) => {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                    }, index * 150);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        cardObserver.observe(card);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce scroll handler for better performance
const debouncedHandleScroll = debounce(handleScroll, 10);
window.addEventListener('scroll', debouncedHandleScroll);

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.querySelector('nav');
    const mobileMenuButton = document.querySelector('[onclick="toggleMobileMenu()"]');
    
    if (isMenuOpen && !nav.contains(event.target) && !mobileMenuButton.contains(event.target)) {
        closeMobileMenu();
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768 && isMenuOpen) {
        closeMobileMenu();
    }
});

// Enhanced effects initialization
function initializeMouseTrail() {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    document.body.appendChild(trail);

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.style.left = trailX - 5 + 'px';
        trail.style.top = trailY - 5 + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
}

function initializeMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-button');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

function initializeRippleEffects() {
    const rippleButtons = document.querySelectorAll('.ripple');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Enhanced product card effects
function populateProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => {
        const imageUrl = imageUrls[product.imageKey];
        const hasImage = imageUrl && imageUrl.trim() !== '';
        
        return `
        <div class="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow product-card">
            <div class="overflow-hidden h-64">
                ${hasImage ? `
                    <div class="relative w-full h-full">
                        <img
                            src="${imageUrl}"
                            alt="${product.name}"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                        />
                        <div class="absolute inset-0 bg-gray-200 flex items-center justify-center" style="display: none;">
                            <span class="text-gray-500">Image load failed</span>
                        </div>
                    </div>
                ` : `
                    <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span class="text-gray-500">No image available</span>
                    </div>
                `}
                <div class="product-overlay">
                    <button class="px-6 py-2 bg-white text-green-600 rounded-md font-medium transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        Quick View
                    </button>
                </div>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-center">
                    <span class="text-green-600 bg-green-50 px-2 py-1 text-xs font-medium rounded-md">
                        ${product.category}
                    </span>
                    <span class="text-green-600 font-semibold">$${product.price.toFixed(2)}</span>
                </div>
                <h3 class="mt-2 text-lg font-medium text-gray-900">${product.name}</h3>
            </div>
        </div>
    `}).join('');
}

// Enhanced collection card effects
function populateCollections() {
    const collectionsGrid = document.getElementById('collections-grid');
    if (!collectionsGrid) return;

    collectionsGrid.innerHTML = collections.map(collection => {
        const imageUrl = imageUrls[collection.imageKey];
        const hasImage = imageUrl && imageUrl.trim() !== '';
        
        return `
        <div class="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:-translate-y-2 collection-card">
            ${hasImage ? `
                <div class="relative w-full h-64">
                    <img 
                        src="${imageUrl}" 
                        alt="${collection.title}" 
                        class="w-full h-64 object-cover transition-transform group-hover:scale-110"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                    />
                    <div class="absolute inset-0 bg-gray-200 flex items-center justify-center" style="display: none;">
                        <span class="text-gray-500">Image load failed</span>
                    </div>
                </div>
            ` : `
                <div class="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <span class="text-gray-500">No image available</span>
                </div>
            `}
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end collection-content">
                <div class="p-6 text-white">
                    <h3 class="text-xl font-bold">${collection.title}</h3>
                    <p class="mt-1">${collection.items} items</p>
                    <button class="mt-4 px-4 py-2 bg-white text-green-600 rounded-md hover:bg-gray-100 transition-colors ripple magnetic-button">
                        View Collection
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
}

// Enhanced review card effects
function populateReviews() {
    const reviewsGrid = document.getElementById('reviews-grid');
    if (!reviewsGrid) return;

    reviewsGrid.innerHTML = reviews.map(review => `
        <div class="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow review-card">
            <div class="flex items-center mb-4 stars">
                ${generateStars(review.rating)}
            </div>
            <p class="text-gray-600 italic">"${review.comment}"</p>
            <div class="mt-4">
                <p class="font-semibold">${review.name}</p>
                <p class="text-sm text-gray-500">${new Date(review.date).toLocaleDateString()}</p>
            </div>
        </div>
    `).join('');
}

// Show image load warning
function showImageLoadWarning() {
    // Create a temporary warning notification
    const warning = document.createElement('div');
    warning.className = 'fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded z-50';
    warning.innerHTML = `
        <div class="flex">
            <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="ml-3">
                <p class="text-sm">
                    Image loading failed. Please check database connection or contact administrator.
                </p>
            </div>
            <div class="ml-auto pl-3">
                <div class="-mx-1.5 -my-1.5">
                    <button onclick="this.parentElement.parentElement.parentElement.parentElement.remove()" class="text-yellow-500 hover:text-yellow-700">
                        <span class="sr-only">Close</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(warning);
    
    // Auto remove warning after 5 seconds
    setTimeout(() => {
        if (warning.parentElement) {
            warning.remove();
        }
    }, 5000);
}

// Add loading states to buttons (optional enhancement)
document.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON' && event.target.textContent.includes('Shop')) {
        const originalText = event.target.textContent;
        event.target.innerHTML = '<span class="loading"></span> Loading...';
        event.target.disabled = true;
        
        // Simulate loading
        setTimeout(() => {
            event.target.textContent = originalText;
            event.target.disabled = false;
        }, 2000);
    }
}); 