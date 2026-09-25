/*
# Add social_links to store_locations

1. Modified Tables
- `store_locations` — add `social_links` jsonb column (array of {platform, url}).
- Seeds social links for the two existing stores:
  - Rruga e Durrësit: Instagram, TikTok, Facebook
  - Lake View Residence: Instagram

2. Security
- No policy changes; the existing anon/authenticated CRUD policies on store_locations cover the new column automatically.
*/

ALTER TABLE store_locations
  ADD COLUMN IF NOT EXISTS social_links jsonb NOT NULL DEFAULT '[]'::jsonb;

UPDATE store_locations SET social_links = '[
  {"platform":"instagram","url":"https://www.instagram.com/smart_store_albania/"},
  {"platform":"tiktok","url":"https://www.tiktok.com/@smart_store_albania"},
  {"platform":"facebook","url":"https://www.facebook.com/smartstorealbania"}
]'::jsonb WHERE name = 'Rruga e Durrësit';

UPDATE store_locations SET social_links = '[
  {"platform":"instagram","url":"https://www.instagram.com/smart_store_albania_2/"}
]'::jsonb WHERE name = 'Lake View Residence';
