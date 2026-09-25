/*
# Seed Smart Store Albania content
Inserts default settings, category panels, store locations, and sample products.
Safe to re-run — each insert uses NOT EXISTS guards.
*/
INSERT INTO store_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

INSERT INTO store_categories (name, description, image, href, featured, sort_order)
SELECT * FROM (VALUES
  ('Celular', 'Eksploroni gjeneratën e re të teknologjisë.', 'https://images.pexels.com/photos/20360361/pexels-photo-20360361.jpeg?auto=compress&cs=tinysrgb&w=900', '/category/Celular', true, 1),
  ('Tablet', 'Për punë, shkollë dhe argëtim.', 'https://images.pexels.com/photos/10357019/pexels-photo-10357019.jpeg?auto=compress&cs=tinysrgb&w=800', '/category/Tablet', false, 2),
  ('Laptop', 'Performancë që të shoqëron kudo.', 'https://images.pexels.com/photos/6192321/pexels-photo-6192321.jpeg?auto=compress&cs=tinysrgb&w=800', '/category/Laptop', false, 3),
  ('Smartwatch', 'Ritmi yt, gjithmonë në dorë.', 'https://images.pexels.com/photos/6849082/pexels-photo-6849082.jpeg?auto=compress&cs=tinysrgb&w=800', '/category/Smartwatch', false, 4),
  ('Aksesorë', 'Detajet që bëjnë diferencën.', 'https://images.pexels.com/photos/14541068/pexels-photo-14541068.jpeg?auto=compress&cs=tinysrgb&w=800', '/category/Aksesorë', false, 5)
) AS v(name, description, image, href, featured, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM store_categories);

INSERT INTO store_locations (name, address, phone, maps_url, sort_order)
SELECT * FROM (VALUES
  ('Rruga e Durrësit', 'Rruga e Durrësit, Tiranë', '068 600 5554', 'https://maps.app.goo.gl/eAtHfkNvVZt2bZVE8', 1),
  ('Lake View Residence', 'Lake View Residence, Tiranë', '068 600 5554', 'https://maps.app.goo.gl/sBKm28eNnVoMWTbh8', 2)
) AS v(name, address, phone, maps_url, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM store_locations);

INSERT INTO store_products (slug, name, brand, category, description, specs, old_price, price, images, colors, storage_options, featured)
SELECT 'iphone-17-pro-max', 'iPhone 17 Pro Max', 'Apple', 'Celular', 'Fuqi pro. Kamera pro. Për çdo aventurë.', '6.9” Super Retina · A19 Pro · Kamera Pro', 109900, 90900,
  '["https://images.pexels.com/photos/20360361/pexels-photo-20360361.jpeg?auto=compress&cs=tinysrgb&w=900","https://images.pexels.com/photos/37889435/pexels-photo-37889435.jpeg?auto=compress&cs=tinysrgb&w=900"]'::jsonb,
  '[{"name":"Portokalli","hex":"#c96a27"},{"name":"Blu e errët","hex":"#26364f"},{"name":"Argjend","hex":"#dbe3e9"}]'::jsonb,
  '[{"name":"256 GB","adjustment":0},{"name":"512 GB","adjustment":12000},{"name":"1 TB eSIM","adjustment":26000}]'::jsonb,
  true
WHERE NOT EXISTS (SELECT 1 FROM store_products WHERE slug = 'iphone-17-pro-max');

INSERT INTO store_products (slug, name, brand, category, description, specs, old_price, price, images, colors, storage_options, featured)
SELECT 'iphone-17-pro', 'iPhone 17 Pro', 'Apple', 'Celular', 'Performancë e jashtëzakonshme në një dizajn të rafinuar.', '6.3” Super Retina · A19 Pro · 48MP', 99900, 83500,
  '["https://images.pexels.com/photos/17177820/pexels-photo-17177820.jpeg?auto=compress&cs=tinysrgb&w=900"]'::jsonb,
  '[{"name":"Blu","hex":"#3c4b65"},{"name":"E zezë","hex":"#25272a"}]'::jsonb,
  '[{"name":"256 GB","adjustment":0},{"name":"512 GB eSIM","adjustment":11000}]'::jsonb,
  true
WHERE NOT EXISTS (SELECT 1 FROM store_products WHERE slug = 'iphone-17-pro');

INSERT INTO store_products (slug, name, brand, category, description, specs, old_price, price, images, colors, storage_options, featured)
SELECT 'iphone-17-air', 'iPhone Air', 'Apple', 'Celular', 'I hollë, i lehtë dhe gati për çdo ditë.', '6.5” OLED · Kamera Fusion · USB-C', 79900, 67900,
  '["https://images.pexels.com/photos/7438754/pexels-photo-7438754.jpeg?auto=compress&cs=tinysrgb&w=900"]'::jsonb,
  '[{"name":"Blu e çelët","hex":"#c9e1ee"},{"name":"E bardhë","hex":"#f2f4f1"}]'::jsonb,
  '[{"name":"256 GB","adjustment":0},{"name":"512 GB","adjustment":9000}]'::jsonb,
  true
WHERE NOT EXISTS (SELECT 1 FROM store_products WHERE slug = 'iphone-17-air');

INSERT INTO store_products (slug, name, brand, category, description, specs, old_price, price, images, colors, storage_options, featured)
SELECT 'galaxy-s25-ultra', 'Galaxy S25 Ultra', 'Samsung', 'Celular', 'Galaxy AI dhe kamera e krijuar për të dalluar.', '6.9” Dynamic AMOLED · S Pen · 200MP', 89900, 74900,
  '["https://images.pexels.com/photos/26761342/pexels-photo-26761342.jpeg?auto=compress&cs=tinysrgb&w=900"]'::jsonb,
  '[{"name":"Titanium Gray","hex":"#767b80"},{"name":"Titanium Black","hex":"#222426"}]'::jsonb,
  '[{"name":"256 GB","adjustment":0},{"name":"512 GB","adjustment":15000},{"name":"1 TB","adjustment":28000}]'::jsonb,
  true
WHERE NOT EXISTS (SELECT 1 FROM store_products WHERE slug = 'galaxy-s25-ultra');

INSERT INTO store_products (slug, name, brand, category, description, specs, old_price, price, images, colors, storage_options, featured)
SELECT 'ipad-air-m3', 'iPad Air M3', 'Apple', 'Tablet', 'Krijo më shumë. Puno më shpejt. Kudo.', '11” Liquid Retina · Apple M3 · Wi-Fi', 74900, 62900,
  '["https://images.pexels.com/photos/10357019/pexels-photo-10357019.jpeg?auto=compress&cs=tinysrgb&w=900"]'::jsonb,
  '[{"name":"Blu","hex":"#7898a9"},{"name":"Gri","hex":"#a9adae"}]'::jsonb,
  '[{"name":"128 GB","adjustment":0},{"name":"256 GB","adjustment":9000}]'::jsonb,
  true
WHERE NOT EXISTS (SELECT 1 FROM store_products WHERE slug = 'ipad-air-m3');

INSERT INTO store_products (slug, name, brand, category, description, specs, old_price, price, images, colors, storage_options, featured)
SELECT 'macbook-air-m4', 'MacBook Air M4', 'Apple', 'Laptop', 'I hollë. I fuqishëm. I padukshëm në çantë.', '13” Liquid Retina · Apple M4 · 16GB RAM', 129900, 109900,
  '["https://images.pexels.com/photos/6192321/pexels-photo-6192321.jpeg?auto=compress&cs=tinysrgb&w=900"]'::jsonb,
  '[{"name":"Midnight","hex":"#252b32"},{"name":"Argjend","hex":"#c8cbcc"}]'::jsonb,
  '[{"name":"256 GB","adjustment":0},{"name":"512 GB","adjustment":22000}]'::jsonb,
  true
WHERE NOT EXISTS (SELECT 1 FROM store_products WHERE slug = 'macbook-air-m4');
