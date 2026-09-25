/*
# Create Smart Store Albania catalog

1. New Tables
- `store_settings` — homepage hero content and contact details.
- `store_categories` — editable category panels.
- `store_products` — products, prices, images, and variant JSON.
- `store_locations` — store names, addresses, and map links.

2. Security
- RLS is enabled on every table.
- This is a single-store editorial database; anon and authenticated roles can read and write the shared content.

3. Important Notes
- Variant data uses JSONB so the admin can manage colors, storage, and conditions without schema changes.
*/
CREATE TABLE IF NOT EXISTS store_settings (id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1), store_name text NOT NULL DEFAULT 'Smart Store Albania', phone text NOT NULL DEFAULT '068 600 5554', email text NOT NULL DEFAULT 'info@smartstore.al', hero_image text NOT NULL DEFAULT 'https://images.pexels.com/photos/10357019/pexels-photo-10357019.jpeg?auto=compress&cs=tinysrgb&w=1800', hero_title text NOT NULL DEFAULT 'Bëj një upgrade, e shijo pushimet!', hero_subtitle text NOT NULL DEFAULT 'Bateri plot, super kamera për kujtimet e plazhit dhe asnjë telefonatë e lënë përgjysmë.', primary_cta text NOT NULL DEFAULT 'Shiko Ofertat e Verës', primary_link text NOT NULL DEFAULT '/category/Celular', secondary_cta text NOT NULL DEFAULT 'Lërë të vjetrin, merr të riun', secondary_link text NOT NULL DEFAULT '/contact', updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS store_categories (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, description text NOT NULL DEFAULT '', image text NOT NULL, href text NOT NULL, featured boolean NOT NULL DEFAULT false, sort_order integer NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS store_products (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text UNIQUE NOT NULL, name text NOT NULL, brand text NOT NULL, category text NOT NULL, description text NOT NULL DEFAULT '', specs text NOT NULL DEFAULT '', old_price numeric NOT NULL DEFAULT 0, price numeric NOT NULL DEFAULT 0, images jsonb NOT NULL DEFAULT '[]'::jsonb, colors jsonb NOT NULL DEFAULT '[]'::jsonb, storage_options jsonb NOT NULL DEFAULT '[]'::jsonb, conditions jsonb NOT NULL DEFAULT '[{"name":"I RI (në kuti)","adjustment":0},{"name":"VITRINE (preowned)","adjustment":-12000}]'::jsonb, featured boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS store_locations (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, address text NOT NULL, phone text NOT NULL DEFAULT '068 600 5554', maps_url text NOT NULL, sort_order integer NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now());
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_locations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public read store settings" ON store_settings; CREATE POLICY "public read store settings" ON store_settings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "public insert store settings" ON store_settings; CREATE POLICY "public insert store settings" ON store_settings FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "public update store settings" ON store_settings; CREATE POLICY "public update store settings" ON store_settings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "public delete store settings" ON store_settings; CREATE POLICY "public delete store settings" ON store_settings FOR DELETE TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "public read store categories" ON store_categories; CREATE POLICY "public read store categories" ON store_categories FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "public insert store categories" ON store_categories; CREATE POLICY "public insert store categories" ON store_categories FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "public update store categories" ON store_categories; CREATE POLICY "public update store categories" ON store_categories FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "public delete store categories" ON store_categories; CREATE POLICY "public delete store categories" ON store_categories FOR DELETE TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "public read store products" ON store_products; CREATE POLICY "public read store products" ON store_products FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "public insert store products" ON store_products; CREATE POLICY "public insert store products" ON store_products FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "public update store products" ON store_products; CREATE POLICY "public update store products" ON store_products FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "public delete store products" ON store_products; CREATE POLICY "public delete store products" ON store_products FOR DELETE TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "public read store locations" ON store_locations; CREATE POLICY "public read store locations" ON store_locations FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "public insert store locations" ON store_locations; CREATE POLICY "public insert store locations" ON store_locations FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "public update store locations" ON store_locations; CREATE POLICY "public update store locations" ON store_locations FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "public delete store locations" ON store_locations; CREATE POLICY "public delete store locations" ON store_locations FOR DELETE TO anon, authenticated USING (true);
