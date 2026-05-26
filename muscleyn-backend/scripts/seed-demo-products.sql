-- Demo supplement catalog seed for Muscleyn.
-- Safe to run multiple times. Existing rows are updated where uniqueness exists,
-- and products/variants/images are inserted only when missing.

SET @now = NOW(6);

INSERT INTO category (name, slug, image_url, is_active, created_at, updated_at)
VALUES
  ('Protein', 'protein', 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1200&auto=format&fit=crop', 1, @now, @now),
  ('Performance', 'performance', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop', 1, @now, @now),
  ('Weight Management', 'weight-management', 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1200&auto=format&fit=crop', 1, @now, @now)
ON DUPLICATE KEY UPDATE
  image_url = VALUES(image_url),
  is_active = 1,
  updated_at = @now;

INSERT INTO brand (name, slug, logo_url, is_active, created_at, updated_at)
VALUES
  ('Muscleyn Elite', 'muscleyn-elite', 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=600&auto=format&fit=crop', 1, @now, @now),
  ('Muscleyn Lab', 'muscleyn-lab', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop', 1, @now, @now),
  ('Muscleyn Ignite', 'muscleyn-ignite', 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=600&auto=format&fit=crop', 1, @now, @now),
  ('Muscleyn Cut', 'muscleyn-cut', 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=600&auto=format&fit=crop', 1, @now, @now)
ON DUPLICATE KEY UPDATE
  logo_url = VALUES(logo_url),
  is_active = 1,
  updated_at = @now;

SET @protein_category_id = (SELECT id FROM category WHERE slug = 'protein');
SET @performance_category_id = (SELECT id FROM category WHERE slug = 'performance');
SET @weight_category_id = (SELECT id FROM category WHERE slug = 'weight-management');

INSERT INTO sub_category (name, slug, image_url, is_active, category_id, created_at, updated_at)
VALUES
  ('Whey Protein', 'whey-protein', 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1200&auto=format&fit=crop', 1, @protein_category_id, @now, @now),
  ('Mass Gainer', 'mass-gainer', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop', 1, @protein_category_id, @now, @now),
  ('Creatine', 'creatine', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop', 1, @performance_category_id, @now, @now),
  ('Pre Workout', 'pre-workout', 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1200&auto=format&fit=crop', 1, @performance_category_id, @now, @now),
  ('Fat Burner', 'fat-burner', 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1200&auto=format&fit=crop', 1, @weight_category_id, @now, @now)
ON DUPLICATE KEY UPDATE
  image_url = VALUES(image_url),
  category_id = VALUES(category_id),
  is_active = 1,
  updated_at = @now;

SET @elite_brand_id = (SELECT id FROM brand WHERE slug = 'muscleyn-elite');
SET @lab_brand_id = (SELECT id FROM brand WHERE slug = 'muscleyn-lab');
SET @ignite_brand_id = (SELECT id FROM brand WHERE slug = 'muscleyn-ignite');
SET @cut_brand_id = (SELECT id FROM brand WHERE slug = 'muscleyn-cut');

SET @whey_sub_id = (SELECT id FROM sub_category WHERE slug = 'whey-protein');
SET @mass_sub_id = (SELECT id FROM sub_category WHERE slug = 'mass-gainer');
SET @creatine_sub_id = (SELECT id FROM sub_category WHERE slug = 'creatine');
SET @pre_sub_id = (SELECT id FROM sub_category WHERE slug = 'pre-workout');
SET @fat_sub_id = (SELECT id FROM sub_category WHERE slug = 'fat-burner');

INSERT INTO product (name, description, image_url, is_active, brand_id, sub_category_id, created_at, updated_at)
SELECT 'Elite Whey Isolate',
       'Fast digesting premium whey isolate for lean recovery, strength, and daily protein support.',
       'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1200&auto=format&fit=crop',
       1, @elite_brand_id, @whey_sub_id, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Elite Whey Isolate');

INSERT INTO product (name, description, image_url, is_active, brand_id, sub_category_id, created_at, updated_at)
SELECT 'Mass Forge Gainer',
       'High calorie lean bulk formula with whey blend, complex carbs, and creatine support.',
       'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop',
       1, @elite_brand_id, @mass_sub_id, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Mass Forge Gainer');

INSERT INTO product (name, description, image_url, is_active, brand_id, sub_category_id, created_at, updated_at)
SELECT 'Creatine Monohydrate Pro',
       'Micronized creatine monohydrate for strength, power output, and muscle cell hydration.',
       'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',
       1, @lab_brand_id, @creatine_sub_id, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Creatine Monohydrate Pro');

INSERT INTO product (name, description, image_url, is_active, brand_id, sub_category_id, created_at, updated_at)
SELECT 'Rage Pre Workout',
       'High-intensity pump, energy, and focus blend for serious training sessions.',
       'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1200&auto=format&fit=crop',
       1, @ignite_brand_id, @pre_sub_id, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Rage Pre Workout');

INSERT INTO product (name, description, image_url, is_active, brand_id, sub_category_id, created_at, updated_at)
SELECT 'Lean Burn L-Carnitine',
       'Cutting support formula for active fat metabolism and daily energy.',
       'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1200&auto=format&fit=crop',
       1, @cut_brand_id, @fat_sub_id, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Lean Burn L-Carnitine');

SET @whey_product_id = (SELECT id FROM product WHERE name = 'Elite Whey Isolate' LIMIT 1);
SET @mass_product_id = (SELECT id FROM product WHERE name = 'Mass Forge Gainer' LIMIT 1);
SET @creatine_product_id = (SELECT id FROM product WHERE name = 'Creatine Monohydrate Pro' LIMIT 1);
SET @pre_product_id = (SELECT id FROM product WHERE name = 'Rage Pre Workout' LIMIT 1);
SET @fat_product_id = (SELECT id FROM product WHERE name = 'Lean Burn L-Carnitine' LIMIT 1);

INSERT INTO product_variant (variant_name, sku, image_url, price, old_price, discount_percent, stock, size, color, weight, flavor, is_active, product_id, created_at, updated_at)
SELECT 'Chocolate 2 kg', 'MUS-WHEY-CHOC-2KG', 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1200&auto=format&fit=crop', 2499.00, 3499.00, 30.00, 40, '2 kg', NULL, '2 kg', 'Chocolate', 1, @whey_product_id, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM product_variant WHERE sku = 'MUS-WHEY-CHOC-2KG');

INSERT INTO product_variant (variant_name, sku, image_url, price, old_price, discount_percent, stock, size, color, weight, flavor, is_active, product_id, created_at, updated_at)
SELECT 'Vanilla 2 kg', 'MUS-WHEY-VAN-2KG', 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1200&auto=format&fit=crop', 2599.00, 3499.00, 26.00, 30, '2 kg', NULL, '2 kg', 'Vanilla', 1, @whey_product_id, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM product_variant WHERE sku = 'MUS-WHEY-VAN-2KG');

INSERT INTO product_variant (variant_name, sku, image_url, price, old_price, discount_percent, stock, size, color, weight, flavor, is_active, product_id, created_at, updated_at)
SELECT 'Chocolate 3 kg', 'MUS-GAIN-CHOC-3KG', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop', 3299.00, 4299.00, 23.00, 22, '3 kg', NULL, '3 kg', 'Chocolate', 1, @mass_product_id, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM product_variant WHERE sku = 'MUS-GAIN-CHOC-3KG');

INSERT INTO product_variant (variant_name, sku, image_url, price, old_price, discount_percent, stock, size, color, weight, flavor, is_active, product_id, created_at, updated_at)
SELECT 'Unflavoured 250 g', 'MUS-CREA-UNF-250G', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop', 1499.00, 1999.00, 25.00, 65, '250 g', NULL, '250 g', 'Unflavoured', 1, @creatine_product_id, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM product_variant WHERE sku = 'MUS-CREA-UNF-250G');

INSERT INTO product_variant (variant_name, sku, image_url, price, old_price, discount_percent, stock, size, color, weight, flavor, is_active, product_id, created_at, updated_at)
SELECT 'Fruit Punch 300 g', 'MUS-PRE-FP-300G', 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1200&auto=format&fit=crop', 1999.00, 2699.00, 26.00, 28, '300 g', NULL, '300 g', 'Fruit Punch', 1, @pre_product_id, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM product_variant WHERE sku = 'MUS-PRE-FP-300G');

INSERT INTO product_variant (variant_name, sku, image_url, price, old_price, discount_percent, stock, size, color, weight, flavor, is_active, product_id, created_at, updated_at)
SELECT 'Green Apple 500 ml', 'MUS-CUT-GA-500ML', 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1200&auto=format&fit=crop', 1199.00, 1699.00, 29.00, 35, '500 ml', NULL, '500 ml', 'Green Apple', 1, @fat_product_id, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM product_variant WHERE sku = 'MUS-CUT-GA-500ML');

INSERT INTO product_image (image_url, sequence_number, product_id)
SELECT image_url, sequence_number, product_id
FROM (
  SELECT 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1200&auto=format&fit=crop' AS image_url, 1 AS sequence_number, @whey_product_id AS product_id
  UNION ALL SELECT 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1200&auto=format&fit=crop', 2, @whey_product_id
  UNION ALL SELECT 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop', 1, @mass_product_id
  UNION ALL SELECT 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop', 1, @creatine_product_id
  UNION ALL SELECT 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1200&auto=format&fit=crop', 1, @pre_product_id
  UNION ALL SELECT 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1200&auto=format&fit=crop', 1, @fat_product_id
) demo_images
WHERE NOT EXISTS (
  SELECT 1
  FROM product_image existing_image
  WHERE existing_image.product_id = demo_images.product_id
    AND existing_image.image_url = demo_images.image_url
);

SELECT
  'Demo product seed completed' AS message,
  (SELECT COUNT(*) FROM product WHERE name IN (
    'Elite Whey Isolate',
    'Mass Forge Gainer',
    'Creatine Monohydrate Pro',
    'Rage Pre Workout',
    'Lean Burn L-Carnitine'
  )) AS demo_product_count;
