import { WHATSAPP_NUMBER } from './supabase';
import type { StoreProduct } from './types';

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('sq-AL', { maximumFractionDigits: 0 }).format(value) + ' L';
}

export function computeVariantPrice(
  product: StoreProduct,
  storageAdjustment: number,
  conditionAdjustment: number,
): number {
  return Math.max(0, product.price + storageAdjustment + conditionAdjustment);
}

export function buildWhatsAppLink(
  product: StoreProduct,
  color: string,
  storage: string,
  condition: string,
  price: number,
): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const productUrl = `${origin}/product/${product.slug}`;
  const message =
    `Përshëndetje Smart Store Albania!\n` +
    `Dëshiroj të porosis:\n` +
    `Produkti: ${product.name}\n` +
    `Ngjyra: ${color}\n` +
    `Memoria: ${storage}\n` +
    `Cilësia: ${condition}\n` +
    `Çmimi: ${formatPrice(price)}\n` +
    `Linku: ${productUrl}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
