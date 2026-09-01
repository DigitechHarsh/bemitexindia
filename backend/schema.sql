-- Categories
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(120) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  description TEXT,
  fabric VARCHAR(100),
  moq INT DEFAULT 1,
  price_per_piece DECIMAL(10,2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Product Images
CREATE TABLE product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Bulk Inquiries
CREATE TABLE inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  business_name VARCHAR(150),
  business_type VARCHAR(80),
  phone VARCHAR(20),
  whatsapp VARCHAR(20),
  city VARCHAR(100),
  country VARCHAR(100),
  category_interest VARCHAR(150),
  quantity_needed VARCHAR(50),
  message TEXT,
  status ENUM('new','contacted','closed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Video Call Bookings
CREATE TABLE video_call_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  business_name VARCHAR(150),
  phone VARCHAR(20),
  whatsapp VARCHAR(20),
  preferred_date DATE,
  preferred_time VARCHAR(20),
  product_interest VARCHAR(150),
  status ENUM('pending','confirmed','completed','cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin Users
CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Banners (For Homepage Slider)
CREATE TABLE banners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150),
  title_color VARCHAR(50) DEFAULT 'text-bemitex-dark',
  subtitle VARCHAR(250),
  image_url VARCHAR(500) NOT NULL,
  cta_text VARCHAR(50),
  cta_link VARCHAR(250),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- DATA SEEDING
-- ==========================================

-- Insert Categories
INSERT INTO categories (name, slug) VALUES 
('Kurtis & Sets', 'kurtis'),
('Designer Salwar Suits', 'salwar-suits'),
('Traditional Sarees', 'sarees'),
('Partywear Gowns', 'gowns');

-- Insert Products
INSERT INTO products (category_id, name, slug, description, fabric, moq, price_per_piece) VALUES 
(1, 'Premium Anarkali Kurti with Embroidery', 'premium-anarkali', 'Beautifully crafted Anarkali Kurti with intricate embroidery work, perfect for festive wear.', 'Rayon Slub', 12, 450.00),
(2, 'Georgette Designer Salwar Suit', 'georgette-suit', 'Heavy georgette suit with dupatta, unstitched material with premium quality sequence work.', 'Georgette', 6, 1250.00),
(3, 'Banarasi Silk Saree Collection', 'banarasi-silk', 'Authentic Banarasi silk saree with rich zari border and pallu.', 'Banarasi Silk', 8, 1850.00),
(1, 'Cotton Printed Kurti Set', 'cotton-kurti-set', 'Comfortable daily wear cotton kurti set with pant and dupatta.', 'Pure Cotton', 20, 350.00),
(4, 'Heavy Bridal Gown', 'heavy-bridal-gown', 'Exclusive bridal collection gown with heavy handwork.', 'Net & Satin', 4, 3500.00),
(2, 'Pashmina Winter Suit', 'pashmina-winter', 'Warm Pashmina suit set for winter collection with printed shawl.', 'Pashmina', 10, 850.00);

-- Insert Default Admin User (Password is 'admin123' using PHP password_hash)
INSERT INTO admin_users (username, password_hash) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert Product Images
INSERT INTO product_images (product_id, image_url, sort_order) VALUES 
(1, '/products/prod_anarkali.jpg', 1),
(2, '/products/prod_suit.jpg', 1),
(3, '/products/prod_saree.jpg', 1),
(4, '/products/prod_cotton.jpg', 1),
(5, '/products/prod_gown.jpg', 1),
(6, '/products/prod_pashmina.jpg', 1);
