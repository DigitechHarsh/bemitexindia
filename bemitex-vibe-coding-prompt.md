# Vibe Coding Prompt — Bemitex India B2B Wholesale Website

Copy everything below into your AI coding tool (Claude Code, Cursor, etc.) as the project brief. Attach your logo file when you start the session and reference it as `/public/logo.png` (or similar) in the prompt.

---

## PROMPT START

You are building a full-stack B2B wholesale e-commerce website for **Bemitex India**, a textile manufacturer and wholesaler based in Surat, Gujarat. This is NOT a retail store — it is a wholesale-only catalog and lead-generation site for bulk buyers.

### Tech Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Animation:** Framer Motion for page transitions, scroll reveals, hover states, and image carousels
- **Backend:** PHP (REST API, no framework needed — plain PHP with PDO, organized in an `/api` folder) hosted on Hostinger
- **Database:** MySQL via phpMyAdmin (Hostinger shared hosting)
- **Image handling:** Store product images in `/uploads` on the PHP server, reference via API
- **Deployment target:** Hostinger shared/business hosting — Next.js exported as static/SSR-compatible build or run via Node.js app on Hostinger (use Hostinger's Node.js hosting feature), PHP API in a subfolder like `api.bemitexindia.com` or `/api` on the same domain

### Business Context
Bemitex India is a prominent textile manufacturer and wholesaler in Surat, Gujarat, specializing in supply-chain distribution of bulk women's ethnic wear. They deal directly from the factory with business owners, retailers, boutique owners, and home resellers.

**Critical rule: This is STRICTLY wholesale/bulk order only.** There is no single-piece checkout or individual retail cart. Every product page and the overall UX must communicate MOQ (Minimum Order Quantity) requirements and drive users toward inquiry/order-request forms, WhatsApp, or a bulk quote request — not a traditional "Add to Cart → Pay" retail flow.

**Product Range:**
- Wholesale kurtis
- Designer salwar suits
- Pashmina winter suits
- Co-ord sets
- Gowns
- Traditional sarees
- Unstitched dress materials

**Services:**
- Shopping assistance via video call appointments (booking form/calendar request)
- Cash on Delivery (COD) across India
- International shipping

**Locations (show both on a Locations/Contact page with embedded Google Maps):**
1. **Primary Facility (Khatodara):** Ground Floor, Plot No. 12/B, Kharwarnagar BRTS Stop, Beside INS Hospital, Khatodara, Udhna Udhyog Nagar, Surat - 395002
2. **Textile Market Branch:** Shop U-4, Legend Textile Market, Near PTM Market, Sahara Darwaja, Ring Road, Surat - 395002

### Site Structure / Pages

1. **Home**
   - Hero section with logo, tagline (e.g., "Direct from Factory to Your Business — Bulk Women's Ethnic Wear"), animated hero banner (Framer Motion fade/slide)
   - "Why Bemitex" trust strip: Factory-direct pricing, PAN-India COD, International Shipping, Video Call Shopping
   - Featured product categories grid (kurtis, sarees, suits, etc.) with hover animations
   - Testimonials/clients strip (boutique owners, resellers)
   - CTA section: "Become a Wholesale Partner" → inquiry form

2. **Catalog / Products**
   - Category-based browsing (Kurtis, Salwar Suits, Pashmina Suits, Co-ord Sets, Gowns, Sarees, Unstitched Materials)
   - Each product card shows: image gallery, fabric, available sizes/colors, **MOQ**, price per piece (wholesale slab pricing if applicable), "Request Quote" / "Inquire on WhatsApp" button — no direct buy button
   - Filters: category, fabric, price range, occasion
   - Product detail page with image zoom/carousel (Framer Motion), full description, MOQ notice banner

3. **How It Works / Wholesale Process**
   - Steps: Browse catalog → Submit bulk inquiry / book video call → Get quote & samples → Confirm order → COD/prepaid & shipping
   - Explain video call shopping assistance booking flow

4. **Video Call Appointment Booking**
   - Simple form: name, business name, phone, WhatsApp, preferred date/time, product interest
   - Stores in DB, sends notification (email or WhatsApp API webhook if available)

5. **Bulk Inquiry / Get a Quote (core conversion page)**
   - Form: business type (retailer/boutique/reseller), product category, quantity needed, city/country, message
   - Data saved to DB and optionally emailed to Bemitex sales team

6. **About Us**
   - Company story, factory-direct positioning, why boutique owners/resellers trust Bemitex

7. **Locations / Contact**
   - Both addresses listed above with embedded maps, phone/WhatsApp click-to-chat, business hours

8. **Shipping & COD Policy**
   - COD across India details, international shipping details, delivery timelines

9. **Admin Panel (PHP + MySQL, protected login)**
   - Manage products (CRUD: add/edit/delete, upload images, set category, MOQ, price)
   - Manage categories
   - View/manage bulk inquiry submissions and video call bookings
   - Simple dashboard (counts of new inquiries, bookings)

### Design Direction
- Use the attached Bemitex logo colors as the base palette (extract primary/accent colors from the logo); if logo isn't attached yet, default to a warm, premium palette suited to ethnic wear — deep maroon/wine, gold/mustard accent, ivory/cream background
- Typography: elegant serif or modern-serif for headings (reflecting traditional textile heritage), clean sans-serif for body text
- Rich product photography treatment: large imagery, subtle Framer Motion fade/slide-in on scroll, smooth hover zoom on product cards
- Mobile-first — most B2B buyers (boutique owners, resellers) will browse and inquire from mobile/WhatsApp
- Sticky WhatsApp click-to-chat floating button on all pages
- Trust badges: "Factory Direct", "PAN India COD", "Worldwide Shipping" visible near top of homepage

### Database Schema (MySQL — build via phpMyAdmin)

```sql
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
```

### PHP API Endpoints to Build
- `GET /api/categories.php` — list categories
- `GET /api/products.php?category=slug` — list products with filters
- `GET /api/product.php?slug=xyz` — single product detail with images
- `POST /api/inquiry.php` — submit bulk inquiry
- `POST /api/video-call.php` — submit video call booking
- `POST /api/admin/login.php` — admin auth (return JWT or session token)
- `GET/POST/PUT/DELETE /api/admin/products.php` — protected CRUD for products
- `GET /api/admin/inquiries.php` — protected, list inquiries
- `GET /api/admin/bookings.php` — protected, list bookings

Use PDO prepared statements everywhere to prevent SQL injection. Return JSON with proper HTTP status codes. Enable CORS for the Next.js frontend domain.

### Hostinger Deployment Notes
- Use Hostinger's Node.js hosting (available on Business/Cloud plans) to run the Next.js app, or export as static where possible and use PHP only for API + admin
- Place PHP API files in a subdirectory (e.g., `public_html/api/`) so both frontend and backend share the same domain and avoid CORS complications
- Use Hostinger's phpMyAdmin to create the database and run the schema above
- Store DB credentials in a PHP config file outside the web root if possible, or use `.env` loaded via a small PHP dotenv helper
- Set up SSL (Hostinger free SSL) for the domain

### Key UX Reminders for the AI Coding Tool
- No shopping cart or online payment checkout — every "buy" moment becomes an inquiry/quote/WhatsApp action
- Always show MOQ prominently on product cards and detail pages
- Make the bulk inquiry form and WhatsApp button extremely easy to reach from every page (max 2 clicks)
- Use Framer Motion tastefully — subtle fade/slide on scroll, smooth page transitions, don't overdo it on a business-focused site
- Fully responsive; test at mobile breakpoints first since much of the inquiry traffic will be mobile/WhatsApp-driven

## PROMPT END
