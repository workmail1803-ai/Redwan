-- =====================================================
-- Sweet Delights BD - Enhanced Supabase SQL Schema
-- With proper indexes for optimal performance
-- =====================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- DROP existing tables (optional - for clean setup)
-- Uncomment if you want to reset the database
-- =====================================================
-- DROP TABLE IF EXISTS order_items CASCADE;
-- DROP TABLE IF EXISTS orders CASCADE;
-- DROP TABLE IF EXISTS reviews CASCADE;
-- DROP TABLE IF EXISTS coupons CASCADE;
-- DROP TABLE IF EXISTS customers CASCADE;
-- DROP TABLE IF EXISTS cakes CASCADE;
-- DROP TABLE IF EXISTS categories CASCADE;
-- DROP TABLE IF EXISTS testimonials CASCADE;
-- DROP TABLE IF EXISTS contact_messages CASCADE;
-- DROP TABLE IF EXISTS admin_users CASCADE;
-- DROP TABLE IF EXISTS site_settings CASCADE;

-- =====================================================
-- CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    emoji TEXT DEFAULT '🎂',
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Category Indexes
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_categories_sort ON categories(sort_order);

-- =====================================================
-- CAKES TABLE (Products)
-- =====================================================
CREATE TABLE IF NOT EXISTS cakes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    description_bn TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    size TEXT NOT NULL DEFAULT '১ পাউন্ড',
    weight_grams INTEGER,
    image_url TEXT NOT NULL,
    gallery_images TEXT[],
    rating DECIMAL(2,1) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    is_trending BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    tag_display TEXT,
    flavor TEXT,
    ingredients TEXT[],
    preparation_hours INTEGER DEFAULT 24,
    serves_people INTEGER,
    color_theme TEXT DEFAULT '#3D2314',
    sort_order INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    order_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cake Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_cakes_category ON cakes(category_id);
CREATE INDEX IF NOT EXISTS idx_cakes_slug ON cakes(slug);
CREATE INDEX IF NOT EXISTS idx_cakes_price ON cakes(price);
CREATE INDEX IF NOT EXISTS idx_cakes_rating ON cakes(rating DESC);
CREATE INDEX IF NOT EXISTS idx_cakes_trending ON cakes(is_trending) WHERE is_trending = true;
CREATE INDEX IF NOT EXISTS idx_cakes_featured ON cakes(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_cakes_available ON cakes(is_available) WHERE is_available = true;
CREATE INDEX IF NOT EXISTS idx_cakes_popular ON cakes(order_count DESC, view_count DESC);
CREATE INDEX IF NOT EXISTS idx_cakes_sort ON cakes(sort_order);
-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_cakes_search ON cakes USING GIN(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- =====================================================
-- CUSTOMERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    phone TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    name TEXT NOT NULL,
    address TEXT,
    city TEXT DEFAULT 'Dhaka',
    area TEXT,
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(12,2) DEFAULT 0.00,
    loyalty_points INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    last_order_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer Indexes
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_customers_auth ON customers(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_customers_city ON customers(city);

-- =====================================================
-- ORDERS TABLE
-- =====================================================
CREATE TYPE order_status AS ENUM (
    'pending', 'confirmed', 'preparing', 'ready', 
    'out_for_delivery', 'delivered', 'cancelled', 'refunded'
);

CREATE TYPE payment_method AS ENUM (
    'bkash', 'nagad', 'rocket', 'bank_transfer', 'cash_on_delivery', 'card'
);

CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');

CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    status order_status DEFAULT 'pending',
    payment_method payment_method DEFAULT 'cash_on_delivery',
    payment_status payment_status DEFAULT 'pending',
    payment_transaction_id TEXT,
    subtotal DECIMAL(10,2) NOT NULL,
    delivery_fee DECIMAL(10,2) DEFAULT 60.00,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    coupon_code TEXT,
    total DECIMAL(10,2) NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    delivery_address TEXT NOT NULL,
    delivery_area TEXT,
    delivery_city TEXT DEFAULT 'Dhaka',
    delivery_date DATE,
    delivery_time_slot TEXT,
    special_instructions TEXT,
    occasion TEXT,
    message_on_cake TEXT,
    admin_notes TEXT,
    delivered_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    cancellation_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Indexes
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_date ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_delivery ON orders(delivery_date);
CREATE INDEX IF NOT EXISTS idx_orders_pending ON orders(status, created_at) 
    WHERE status IN ('pending', 'confirmed', 'preparing');

-- =====================================================
-- ORDER ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    cake_id UUID REFERENCES cakes(id) ON DELETE SET NULL,
    cake_name TEXT NOT NULL,
    cake_name_bn TEXT,
    size TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    customizations JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items Indexes
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_cake ON order_items(cake_id);

-- =====================================================
-- REVIEWS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cake_id UUID REFERENCES cakes(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT,
    images TEXT[],
    is_verified BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    admin_reply TEXT,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Review Indexes
CREATE INDEX IF NOT EXISTS idx_reviews_cake ON reviews(cake_id);
CREATE INDEX IF NOT EXISTS idx_reviews_customer ON reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved, cake_id) WHERE is_approved = true;
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating DESC, created_at DESC);

-- =====================================================
-- COUPONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS coupons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(10,2) NOT NULL,
    min_order_amount DECIMAL(10,2) DEFAULT 0.00,
    max_discount_amount DECIMAL(10,2),
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    starts_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Coupon Indexes
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(is_active, expires_at) WHERE is_active = true;

-- =====================================================
-- TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    image_url TEXT,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    text TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonial Indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured) WHERE is_featured = true;

-- =====================================================
-- CONTACT MESSAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    is_replied BOOLEAN DEFAULT false,
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages Indexes
CREATE INDEX IF NOT EXISTS idx_contact_unread ON contact_messages(is_read, created_at DESC) WHERE is_read = false;

-- =====================================================
-- ADMIN USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin', 'staff')),
    permissions TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SITE SETTINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TRIGGERS FOR auto-update timestamps
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables
DROP TRIGGER IF EXISTS tr_categories_updated ON categories;
CREATE TRIGGER tr_categories_updated BEFORE UPDATE ON categories 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS tr_cakes_updated ON cakes;
CREATE TRIGGER tr_cakes_updated BEFORE UPDATE ON cakes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS tr_customers_updated ON customers;
CREATE TRIGGER tr_customers_updated BEFORE UPDATE ON customers 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS tr_orders_updated ON orders;
CREATE TRIGGER tr_orders_updated BEFORE UPDATE ON orders 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================================================
-- TRIGGER: Auto-update cake rating from reviews
-- =====================================================
CREATE OR REPLACE FUNCTION update_cake_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE cakes SET 
        rating = COALESCE((SELECT AVG(rating) FROM reviews WHERE cake_id = NEW.cake_id AND is_approved = true), 0),
        review_count = (SELECT COUNT(*) FROM reviews WHERE cake_id = NEW.cake_id AND is_approved = true)
    WHERE id = NEW.cake_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_review_rating ON reviews;
CREATE TRIGGER tr_review_rating AFTER INSERT OR UPDATE ON reviews 
    FOR EACH ROW EXECUTE FUNCTION update_cake_rating();

-- =====================================================
-- TRIGGER: Generate order number
-- =====================================================
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.order_number IS NULL THEN
        NEW.order_number = 'SD-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_order_number ON orders;
CREATE TRIGGER tr_order_number BEFORE INSERT ON orders 
    FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "public_categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "public_cakes" ON cakes FOR SELECT USING (is_available = true);
CREATE POLICY "public_testimonials" ON testimonials FOR SELECT USING (is_featured = true);
CREATE POLICY "public_reviews" ON reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "public_coupons" ON coupons FOR SELECT USING (is_active = true AND (expires_at IS NULL OR expires_at > NOW()));

-- Customer policies
CREATE POLICY "customer_own_data" ON customers FOR SELECT USING (auth.uid() = auth_user_id);
CREATE POLICY "customer_update_own" ON customers FOR UPDATE USING (auth.uid() = auth_user_id);
CREATE POLICY "customer_orders" ON orders FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE auth_user_id = auth.uid())
);
CREATE POLICY "customer_insert_review" ON reviews FOR INSERT WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE auth_user_id = auth.uid())
);

-- Public insert for contact
CREATE POLICY "anyone_contact" ON contact_messages FOR INSERT WITH CHECK (true);

-- Admin policies (all access) - use service role key for admin operations

-- =====================================================
-- SEED DATA
-- =====================================================

-- Categories
INSERT INTO categories (name, name_bn, slug, image_url, emoji, sort_order) VALUES
('Birthday Cakes', 'জন্মদিনের কেক', 'birthday', 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&q=80', '🎂', 1),
('Wedding Cakes', 'বিয়ের কেক', 'wedding', 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&q=80', '💒', 2),
('Chocolate Cakes', 'চকলেট কেক', 'chocolate', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', '🍫', 3),
('Fruit Cakes', 'ফ্রুট কেক', 'fruit', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80', '🍓', 4),
('Cupcakes', 'কাপকেক', 'cupcakes', 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=80', '🧁', 5),
('Custom Cakes', 'কাস্টম কেক', 'custom', 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&q=80', '✨', 6)
ON CONFLICT (slug) DO NOTHING;

-- Cakes
INSERT INTO cakes (category_id, name, name_bn, slug, description, description_bn, price, original_price, size, image_url, rating, is_trending, is_featured, tag_display, color_theme) VALUES
((SELECT id FROM categories WHERE slug = 'chocolate'), 'Chocolate Drip Cake', 'চকলেট ড্রিপ কেক', 'chocolate-drip', 'Premium chocolate with drip and gold touch', 'চকলেট ড্রিপ ও গোল্ড টাচ সহ প্রিমিয়াম কেক', 1500, 1800, '১ পাউন্ড', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', 4.9, true, true, '🔥 ট্রেন্ডিং', '#3D2314'),
((SELECT id FROM categories WHERE slug = 'fruit'), 'Red Velvet Heart', 'রেড ভেলভেট হার্ট', 'red-velvet-heart', 'Heart shaped red velvet', 'হার্ট শেপ রেড ভেলভেট', 1800, 2200, '১.৫ পাউন্ড', 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400&q=80', 4.9, true, true, '❤️ জনপ্রিয়', '#C41E3A'),
((SELECT id FROM categories WHERE slug = 'chocolate'), 'Chocolate Flower', 'চকলেট ফ্লাওয়ার', 'chocolate-flower', 'Chocolate glaze with white flowers', 'সাদা ফুল ডেকোরেশন সহ চকলেট গ্লেজ কেক', 1600, 2000, '১ পাউন্ড', 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80', 4.8, false, true, '⭐ প্রিমিয়াম', '#1a0a00'),
((SELECT id FROM categories WHERE slug = 'fruit'), 'Pistachio Green', 'পিস্তা গ্রিন কেক', 'pistachio-green', 'Pistachio flavored cake', 'পিস্তা ফ্লেভার কেক', 1400, 1700, '১ পাউন্ড', 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&q=80', 4.7, false, false, '🌿 ফ্রেশ', '#90EE90')
ON CONFLICT (slug) DO NOTHING;

-- Site Settings
INSERT INTO site_settings (key, value, description) VALUES
('whatsapp', '"8801700000000"', 'WhatsApp business number'),
('delivery_fee', '60', 'Delivery fee in BDT'),
('min_order', '500', 'Minimum order amount'),
('business_hours', '{"open": "10:00", "close": "22:00"}', 'Business hours')
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- HELPFUL VIEWS
-- =====================================================

CREATE OR REPLACE VIEW trending_cakes AS
SELECT * FROM cakes WHERE is_trending = true AND is_available = true ORDER BY order_count DESC LIMIT 10;

CREATE OR REPLACE VIEW featured_cakes AS
SELECT * FROM cakes WHERE is_featured = true AND is_available = true ORDER BY sort_order LIMIT 12;

CREATE OR REPLACE VIEW pending_orders AS
SELECT o.*, c.name as customer_name_full, c.phone as customer_phone_full
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id
WHERE o.status IN ('pending', 'confirmed', 'preparing')
ORDER BY o.created_at;
