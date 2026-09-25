import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '@/lib/hooks';
import ProductCard from '@/components/ProductCard';
import TrustStrip from '@/components/TrustStrip';
import PaymentStrip from '@/components/PaymentStrip';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { products, loading } = useProducts();
  const [activeBrand, setActiveBrand] = useState('Të Gjithë');

  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === category),
    [products, category],
  );

  const brands = useMemo(() => {
    const set = new Set(categoryProducts.map((p) => p.brand));
    return ['Të Gjithë', ...Array.from(set)];
  }, [categoryProducts]);

  const filtered = useMemo(() => {
    if (activeBrand === 'Të Gjithë') return categoryProducts;
    return categoryProducts.filter((p) => p.brand === activeBrand);
  }, [categoryProducts, activeBrand]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    filtered.forEach((p) => {
      if (!map.has(p.brand)) map.set(p.brand, []);
      map.get(p.brand)!.push(p);
    });
    return Array.from(map.entries()).sort(([a], [b]) => {
      if (a === 'Apple') return -1;
      if (b === 'Apple') return 1;
      return 0;
    });
  }, [filtered]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center text-white uppercase tracking-tight">
          {category}
        </h1>
        <p className="text-center text-sm text-brand-muted mt-2">
          {categoryProducts.length} produkte të disponueshme
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 justify-center">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setActiveBrand(b)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeBrand === b
                  ? 'bg-brand-dark text-white'
                  : 'bg-brand-bg text-white hover:bg-brand-border'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-brand-bg rounded-card animate-pulse" />
            ))}
          </div>
        ) : grouped.length === 0 ? (
          <p className="text-sm text-brand-muted py-12 text-center">Nuk ka produkte në këtë kategori.</p>
        ) : (
          <div className="space-y-10">
            {grouped.map(([brand, items]) => (
              <div key={brand}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-red">{brand}</span>
                  <div className="flex-1 h-px bg-brand-border" />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <TrustStrip />
      <PaymentStrip />
    </div>
  );
}
