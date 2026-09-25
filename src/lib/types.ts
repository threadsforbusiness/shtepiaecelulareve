export interface StoreSettings {
  id: number;
  store_name: string;
  phone: string;
  email: string;
  hero_image: string;
  hero_title: string;
  hero_subtitle: string;
  primary_cta: string;
  primary_link: string;
  secondary_cta: string;
  secondary_link: string;
  updated_at: string;
}

export interface StoreCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface ColorVariant {
  name: string;
  hex: string;
  images?: string[];
}

export interface StorageVariant {
  name: string;
  adjustment: number;
}

export interface ConditionVariant {
  name: string;
  adjustment: number;
}

export interface StoreProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  specs: string;
  old_price: number;
  price: number;
  images: string[];
  colors: ColorVariant[];
  storage_options: StorageVariant[];
  conditions: ConditionVariant[];
  featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  maps_url: string;
  social_links: SocialLink[];
  sort_order: number;
  created_at: string;
}

export const CATEGORIES = ['Celular', 'Smartwatch', 'Tablet', 'Laptop', 'Aksesorë'] as const;
export type CategoryName = (typeof CATEGORIES)[number];

export const BRANDS = ['Apple', 'Samsung', 'Xiaomi', 'Google', 'Huawei', 'OnePlus', 'Sony', 'Anker', 'JBL'] as const;
export type BrandName = (typeof BRANDS)[number];

export const STORAGE_PRESETS = ['256 GB', '256 GB eSIM', '512 GB', '512 GB eSIM', '1 TB', '1 TB eSIM', '2 TB eSIM'] as const;
