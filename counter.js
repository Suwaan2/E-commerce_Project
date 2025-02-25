// Sample product data
const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      description: "High-quality wireless headphones with noise cancellation"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      description: "Feature-rich smartwatch with health tracking"
    },
    {
      id: 3,
      name: "Laptop Backpack",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      description: "Durable laptop backpack with multiple compartments"
    },
    {
      id: 4,
      name: "Coffee Maker",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
      description: "Programmable coffee maker with timer"
    }
  ];
  
  // Shopping cart state
  let cart = [];
  
  // DOM elements
  const productsGrid = document.getElementById('products');
  const cartModal = document.getElementById('cartModal');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');
  const cartIcon = document.getElementById('cartIcon');
  const closeCart = document.getElementById('closeCart');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckout = document.getElementById('closeCheckout');
  const checkoutForm = document.getElementById('checkoutForm');
  
  // Render products
  function renderProducts() {
    productsGrid.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    `).join('');
  }
  
  // Add to cart function
  window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
  
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    updateCartUI();
  };
  
  // Update cart UI
  function updateCartUI() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
        </div>
        <button onclick="removeFromCart(${item.id})" class="close-btn">Remove</button>
      </div>
    `).join('');
  
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
  }
  
  // Remove from cart
  window.removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
  };
  
  // Event listeners
  cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
  });
  
  closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });
  
  checkoutBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'block';
  });
  
  closeCheckout.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
  });
  
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple order confirmation
    alert('Order placed successfully! Thank you for shopping with us.');
    
    // Clear cart and close modal
    cart = [];
    updateCartUI();
    checkoutModal.style.display = 'none';
  });
  
  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = 'none';
    }
    if (e.target === checkoutModal) {
      checkoutModal.style.display = 'none';
    }
  });
  
  // Initialize the app
  renderProducts();