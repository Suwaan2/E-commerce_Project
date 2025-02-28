
// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero Animation
gsap.to(".hero h1", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.5
});

gsap.to(".hero p", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.8
});

gsap.to(".hero .btn", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 1.1
});

// Section Animations
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    gsap.to(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 1
    });
});

// Product Card Animations
const productCards = document.querySelectorAll('.product-card');
productCards.forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: index * 0.1
    });
});

// Feature Card Animations
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: index * 0.1
    });
});

// Scroll Down Animation
document.getElementById('scroll-down').addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

// Shopping Cart Functionality
const cartIcon = document.getElementById('cart-icon');
const cartOverlay = document.getElementById('cart-overlay');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

let cart = [];

// Open Cart
cartIcon.addEventListener('click', () => {
    cartOverlay.classList.add('active');
    overlay.classList.add('active');
});

// Close Cart
closeCart.addEventListener('click', () => {
    cartOverlay.classList.remove('active');
    overlay.classList.remove('active');
});

// Close Cart when clicking on overlay
overlay.addEventListener('click', () => {
    cartOverlay.classList.remove('active');
    overlay.classList.remove('active');
});

// Add to Cart
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
       
        
        // Check if item is already in cart
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                
                quantity: 1
            });
        }
        
        updateCart();
        
        // Animation for button
        gsap.to(button, {
            scale: 1.1,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });
        
        // Show cart notification
        cartOverlay.classList.add('active');
        overlay.classList.add('active');
        
        // Hide cart after 3 seconds
        setTimeout(() => {
            cartOverlay.classList.remove('active');
            overlay.classList.remove('active');
        }, 3000);
    });
});

// Update Cart
function updateCart() {
    // Clear cart items
    cartItems.innerHTML = '';
    
    // Calculate total items
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
    
    // Add items to cart
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
            
            <div class="cart-item-info">
                <h3 class="cart-item-title">${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">✕</button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            cart = cart.filter(item => item.id !== id);
            updateCart();
        });
    });
}

// Smooth scrolling for navigation
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});
