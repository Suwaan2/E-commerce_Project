
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

// script.js - Frontend JavaScript for ASUS Website

// document.addEventListener('DOMContentLoaded', function() {
//     // Cart functionality
//     const cartIcon = document.getElementById('cart-icon');
//     const cartOverlay = document.getElementById('cart-overlay');
//     const closeCart = document.getElementById('close-cart');
//     const overlay = document.getElementById('overlay');
//     const cartItems = document.getElementById('cart-items');
//     const cartTotal = document.getElementById('cart-total');
//     const cartCount = document.getElementById('cart-count');
//     const checkoutBtn = document.querySelector('.checkout-btn');
    
//     // Animation for scroll down button
//     const scrollDown = document.getElementById('scroll-down');
//     if (scrollDown) {
//         scrollDown.addEventListener('click', () => {
//             document.querySelector('#products').scrollIntoView({
//                 behavior: 'smooth'
//             });
//         });
//     }
    
//     // GSAP animations
//     gsap.registerPlugin(ScrollTrigger);
    
//     // Hero section animation
//     gsap.from('.hero h1', {
//         y: -100,
//         opacity: 0,
//         duration: 1,
//         ease: 'power3.out'
//     });
    
//     gsap.from('.hero p', {
//         y: -50,
//         opacity: 0,
//         duration: 1,
//         delay: 0.3,
//         ease: 'power3.out'
//     });
    
//     gsap.from('.hero .btn', {
//         y: -30,
//         opacity: 0,
//         duration: 1,
//         delay: 0.6,
//         ease: 'power3.out'
//     });
    
//     // Product cards animation
//     gsap.from('.product-card', {
//         scrollTrigger: {
//             trigger: '.products',
//             start: 'top bottom-=100',
//         },
//         y: 100,
//         opacity: 0,
//         duration: 0.8,
//         stagger: 0.2,
//         ease: 'power3.out'
//     });
    
//     // Feature cards animation
//     gsap.from('.feature-card', {
//         scrollTrigger: {
//             trigger: '.features',
//             start: 'top bottom-=100',
//         },
//         y: 50,
//         opacity: 0,
//         duration: 0.6,
//         stagger: 0.1,
//         ease: 'power3.out'
//     });
    
//     // About section animation
//     gsap.from('.about-img', {
//         scrollTrigger: {
//             trigger: '.about',
//             start: 'top bottom-=100',
//         },
//         x: -100,
//         opacity: 0,
//         duration: 1,
//         ease: 'power3.out'
//     });
    
//     gsap.from('.about-text', {
//         scrollTrigger: {
//             trigger: '.about',
//             start: 'top bottom-=100',
//         },
//         x: 100,
//         opacity: 0,
//         duration: 1,
//         ease: 'power3.out'
//     });
    
//     // Cart array to store items
//     let cart = [];
    
//     // Open cart
//     cartIcon.addEventListener('click', () => {
//         cartOverlay.style.right = '0';
//         overlay.style.display = 'block';
//     });
    
//     // Close cart
//     closeCart.addEventListener('click', () => {
//         cartOverlay.style.right = '-400px';
//         overlay.style.display = 'none';
//     });
    
//     overlay.addEventListener('click', () => {
//         cartOverlay.style.right = '-400px';
//         overlay.style.display = 'none';
//     });
    
//     // Add event listeners to all "Add to Cart" buttons
//     document.querySelectorAll('.add-to-cart').forEach(button => {
//         button.addEventListener('click', function() {
//             const productId = this.dataset.id;
//             const productName = this.dataset.name;
//             const productPrice = parseFloat(this.dataset.price);
//             const productImg = this.dataset.img;
            
//             addToCart(productId, productName, productPrice, productImg);
//         });
//     });
    
//     // Add event listeners to all "Buy Now" buttons
//     document.querySelectorAll('.buy-now').forEach(button => {
//         button.addEventListener('click', function() {
//             const productId = this.dataset.id;
//             const productName = this.dataset.name;
//             const productPrice = parseFloat(this.dataset.price);
            
//             // Clear cart first
//             cart = [];
            
//             // Add the one item
//             addToCart(productId, productName, productPrice);
            
//             // Open cart
//             cartOverlay.style.right = '0';
//             overlay.style.display = 'block';
//         });
//     });
    
//     // Function to add items to cart
//     function addToCart(id, name, price, img) {
//         // Check if item already exists in cart
//         const existingItem = cart.find(item => item.id === id);
        
//         if (existingItem) {
//             existingItem.quantity += 1;
//         } else {
//             cart.push({
//                 id: id,
//                 name: name,
//                 price: price,
//                 img: img,
//                 quantity: 1
//             });
//         }
        
//         // Update cart display
//         updateCart();
//     }
    
//     // Function to update cart display
//     function updateCart() {
//         // Clear current cart display
//         cartItems.innerHTML = '';
        
//         // Calculate total price and count
//         let totalPrice = 0;
//         let itemCount = 0;
        
//         // Add each item to the cart display
//         cart.forEach(item => {
//             const itemTotal = item.price * item.quantity;
//             totalPrice += itemTotal;
//             itemCount += item.quantity;
            
//             const cartItem = document.createElement('div');
//             cartItem.className = 'cart-item';
//             cartItem.innerHTML = `
//                 <div class="cart-item-details">
//                     <h4>${item.name}</h4>
//                     <p class="item-price">$${item.price.toFixed(2)}</p>
//                     <div class="item-quantity">
//                         <button class="quantity-btn minus" data-id="${item.id}">-</button>
//                         <span>${item.quantity}</span>
//                         <button class="quantity-btn plus" data-id="${item.id}">+</button>
//                     </div>
//                 </div>
//                 <p class="item-total">$${itemTotal.toFixed(2)}</p>
//                 <button class="remove-item" data-id="${item.id}">✕</button>
//             `;
            
//             cartItems.appendChild(cartItem);
//         });
        
//         // Update total price display
//         cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
        
//         // Update cart count
//         cartCount.textContent = itemCount;
        
//         // Add event listeners to quantity buttons
//         document.querySelectorAll('.quantity-btn.minus').forEach(button => {
//             button.addEventListener('click', function() {
//                 const id = this.dataset.id;
//                 decreaseQuantity(id);
//             });
//         });
        
//         document.querySelectorAll('.quantity-btn.plus').forEach(button => {
//             button.addEventListener('click', function() {
//                 const id = this.dataset.id;
//                 increaseQuantity(id);
//             });
//         });
        
//         // Add event listeners to remove buttons
//         document.querySelectorAll('.remove-item').forEach(button => {
//             button.addEventListener('click', function() {
//                 const id = this.dataset.id;
//                 removeItem(id);
//             });
//         });
//     }
    
//     // Function to decrease item quantity
//     function decreaseQuantity(id) {
//         const item = cart.find(item => item.id === id);
        
//         if (item.quantity > 1) {
//             item.quantity -= 1;
//         } else {
//             removeItem(id);
//             return;
//         }
        
//         updateCart();
//     }
    
//     // Function to increase item quantity
//     function increaseQuantity(id) {
//         const item = cart.find(item => item.id === id);
//         item.quantity += 1;
//         updateCart();
//     }
    
//     // Function to remove item from cart
//     function removeItem(id) {
//         cart = cart.filter(item => item.id !== id);
//         updateCart();
//     }
    
//     // Checkout button
//     checkoutBtn.addEventListener('click', function() {
//         if (cart.length === 0) {
//             alert('Your cart is empty!');
//             return;
//         }
        
//         // Calculate total
//         const totalAmount = cart.reduce((total, item) => {
//             return total + (item.price * item.quantity);
//         }, 0);
        
//         // Prompt for customer information
//         const customerName = prompt('Please enter your name:');
//         const customerEmail = prompt('Please enter your email:');
        
//         if (!customerName || !customerEmail) {
//             alert('Please provide both name and email to proceed.');
//             return;
//         }
        
//         // Create order object
//         const order = {
//             customer_name: customerName,
//             customer_email: customerEmail,
//             items: cart.map(item => ({
//                 id: item.id,
//                 quantity: item.quantity,
//                 price: item.price
//             })),
//             total_amount: totalAmount
//         };
        
//         // Send order to server
//         submitOrder(order);
//     });
    
//     // Function to submit order to server
//     function submitOrder(order) {
//         fetch('/api/orders', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(order)
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             alert(`Order placed successfully! Your order ID is: ${data.orderId}`);
//             // Clear cart after successful order
//             cart = [];
//             updateCart();
//             // Close cart overlay
//             cartOverlay.style.right = '-400px';
//             overlay.style.display = 'none';
//         })
//         .catch(error => {
//             console.error('Error placing order:', error);
//             alert('There was an error placing your order. Please try again.');
//         });
//     }
    
//     // Load products from database when page loads
//     loadProducts();
    
//     // Function to load products from server
//     function loadProducts() {
//         fetch('/api/products')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(products => {
//             // You can update the product display if needed
//             console.log('Products loaded from database:', products);
            
//             // Alternatively, you could replace the static product cards
//             // with dynamically generated ones from the database
//         })
//         .catch(error => {
//             console.error('Error loading products:', error);
//         });
//     }
// });