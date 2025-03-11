// server.js - Your backend Node.js server

// Required packages - install these first
// npm install express mysql2 cors dotenv

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve your static HTML/CSS/JS files

// Create MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'asus_store'
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  // Create tables if they don't exist
  setupDatabase();
});

// Set up database tables
function setupDatabase() {
  // Products table
  connection.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      description TEXT,
      image_url VARCHAR(255),
      category VARCHAR(100),
      stock INT DEFAULT 10
    )
  `);
  
  // Orders table
  connection.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      customer_name VARCHAR(255),
      customer_email VARCHAR(255),
      total_amount DECIMAL(10, 2) NOT NULL,
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Order items table
  connection.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT,
      product_id INT,
      quantity INT,
      price DECIMAL(10, 2),
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);
  
  // Insert sample products if none exist
  connection.query('SELECT COUNT(*) as count FROM products', (err, results) => {
    if (err) {
      console.error('Error checking products:', err);
      return;
    }
    
    if (results[0].count === 0) {
      const sampleProducts = [
        { 
          name: 'ASUS ROG Zephyrus G14', 
          price: 1499.99, 
          description: '14" QHD Display, AMD Ryzen 9, RTX 4070, 16GB RAM, 1TB SSD, Windows 11',
          image_url: './img/rog.png',
          category: 'Gaming'
        },
        { 
          name: 'ASUS ZenBook Pro Duo', 
          price: 2299.99, 
          description: '15.6" OLED 4K, Intel Core i9, RTX 4080, 32GB RAM, 2TB SSD, Dual Screen',
          image_url: './img/zenbook.png',
          category: 'Professional'
        },
        { 
          name: 'ASUS TUF Gaming A15', 
          price: 999.99, 
          description: '15.6" FHD 144Hz, AMD Ryzen 7, RTX 3060, 16GB RAM, 512GB SSD, Military-grade durability',
          image_url: './img/tuf.png',
          category: 'Gaming'
        },
        { 
          name: 'ASUS ProArt StudioBook 16', 
          price: 1999.99, 
          description: '16" 4k OLED, Intel Xeon, RTX A3000, 32GB RAM, 1TB SSD, ASUS Dial for creators',
          image_url: './img/studio.png',
          category: 'Professional'
        },
        { 
          name: 'ASUS VivoBook S 14', 
          price: 799.99, 
          description: '14" FHD OLED, Intel Core i7, Iris Xe Graphics, 16GB RAM, 512GB SSD, Lightweight design',
          image_url: './img/vivobookd.png',
          category: 'Ultrabook'
        },
        { 
          name: 'ASUS Chromebook Flip CX5', 
          price: 699.99, 
          description: '14" FHD Touch, Intel Core i5, 8GB RAM, 256GB SSD, 2-in-1 Convertible, Chrome OS',
          image_url: './img/chromebook.png',
          category: 'Chromebook'
        }
      ];
      
      connection.query('INSERT INTO products (name, price, description, image_url, category) VALUES ?', 
        [sampleProducts.map(p => [p.name, p.price, p.description, p.image_url, p.category])],
        err => {
          if (err) {
            console.error('Error inserting sample products:', err);
          } else {
            console.log('Sample products inserted successfully');
          }
        }
      );
    }
  });
}

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  connection.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(results[0]);
  });
});

// Create a new order
app.post('/api/orders', (req, res) => {
  const { customer_name, customer_email, items, total_amount } = req.body;
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must include items' });
  }
  
  // Start a transaction
  connection.beginTransaction(err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    // Create the order
    connection.query(
      'INSERT INTO orders (customer_name, customer_email, total_amount) VALUES (?, ?, ?)',
      [customer_name, customer_email, total_amount],
      (err, result) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ error: err.message });
          });
        }
        
        const orderId = result.insertId;
        
        // Prepare order items
        const orderItems = items.map(item => [
          orderId,
          item.id,
          item.quantity,
          item.price
        ]);
        
        // Insert order items
        connection.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?',
          [orderItems],
          (err) => {
            if (err) {
              return connection.rollback(() => {
                res.status(500).json({ error: err.message });
              });
            }
            
            // Commit the transaction
            connection.commit(err => {
              if (err) {
                return connection.rollback(() => {
                  res.status(500).json({ error: err.message });
                });
              }
              
              res.status(201).json({ 
                message: 'Order created successfully', 
                orderId: orderId 
              });
            });
          }
        );
      }
    );
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});