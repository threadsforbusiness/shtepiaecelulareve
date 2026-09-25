import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import type { StoreSettings, StoreCategory, StoreProduct, StoreLocation } from './types';

export function useSettings() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from('store_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data }) => {
        if (active) {
          setSettings(data as StoreSettings | null);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return { settings, loading };
}

export function useCategories() {
  const [categories, setCategories] = useState<StoreCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from('store_categories')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (active) {
          setCategories((data as StoreCategory[]) || []);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return { categories, loading };
}

export function useProducts() {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from('store_products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (active) {
          setProducts((data as StoreProduct[]) || []);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return { products, loading };
}

export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<StoreProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let active = true;
    supabase
      .from('store_products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle()
      .then(({ data }) => {
        if (active) {
          setProduct(data as StoreProduct | null);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [slug]);

  return { product, loading };
}

export function useLocations() {
  const [locations, setLocations] = useState<StoreLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from('store_locations')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (active) {
          setLocations((data as StoreLocation[]) || []);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return { locations, loading };
}
