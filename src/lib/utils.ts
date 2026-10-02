import { WHATSAPP_NUMBER } from './supabase';
import type { StoreProduct } from './types';

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('sq-AL', { maximumFractionDigits: 0 }).format(value) + ' L';
}

const LINE_KEYWORDS = ['z fold', 'fold'];

function getLinePriority(name: string): number {
  const lower = name.toLowerCase();
  for (const kw of LINE_KEYWORDS) {
    if (lower.includes(kw)) return 3;
  }
  return 0;
}

function getModelNumber(name: string, highestInBrand: number): number {
  const match = name.match(/\d+/);
  if (match) return parseInt(match[0], 10);

  const lower = name.toLowerCase();
  if (lower.includes('air') || lower.includes('mini')) {
    return highestInBrand - 1;
  }
  return highestInBrand + 1;
}

function getSuffixTier(name: string): number {
  const lower = name.toLowerCase();
  if (lower.includes('pro max') || lower.includes('ultra')) return 5;
  if (lower.includes('pro') || lower.includes('plus')) return 4;
  if (lower.includes('mini')) return 1;
  if (lower.includes('air')) return 2;

  const stripped = lower
    .replace(/iphone|galaxy|samsung|redmi|xiaomi|google|pixel|huawei|oneplus|sony|anker|jbl|ipad|macbook|apple|note|watch|z|fold/g, '')
    .replace(/\d+/g, '')
    .replace(/[\s\-_,.]/g, '');

  if (stripped === '') return 3;
  return 2.5;
}

export function sortProducts(products: StoreProduct[]): StoreProduct[] {
  const highestNumByBrand = new Map<string, number>();
  for (const p of products) {
    const match = p.name.match(/\d+/);
    if (match) {
      const num = parseInt(match[0], 10);
      const current = highestNumByBrand.get(p.brand) ?? 0;
      if (num > current) highestNumByBrand.set(p.brand, num);
    }
  }

  return [...products].sort((a, b) => {
    const brandCmp = a.brand.localeCompare(b.brand);
    if (brandCmp !== 0) return brandCmp;

    const lineA = getLinePriority(a.name);
    const lineB = getLinePriority(b.name);
    if (lineA !== lineB) return lineB - lineA;

    const numA = getModelNumber(a.name, highestNumByBrand.get(a.brand) ?? 0);
    const numB = getModelNumber(b.name, highestNumByBrand.get(b.brand) ?? 0);
    if (numA !== numB) return numB - numA;

    const tierA = getSuffixTier(a.name);
    const tierB = getSuffixTier(b.name);
    if (tierA !== tierB) return tierB - tierA;

    return a.name.localeCompare(b.name);
  });
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
    `Përshëndetje Shtëpia e Celulareve!\n` +
    `Dëshiroj të porosis:\n` +
    `Produkti: ${product.name}\n` +
    `Ngjyra: ${color}\n` +
    `Memoria: ${storage}\n` +
    `Cilësia: ${condition}\n` +
    `Çmimi: ${formatPrice(price)}\n` +
    `Linku: ${productUrl}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
