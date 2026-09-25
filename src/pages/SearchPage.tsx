import { useParams, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useProducts } from '@/lib/hooks';
import ProductCard from '@/components/ProductCard';

export default function SearchPage() {
  const { category } = useParams<{ category: string }>();
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const { products, loading } = useProducts();

  const results = useMemo(() => {
    let list = products;
    if (category) list = list.filter((p) => p.category === category);
    if (q) {
      const lower = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.brand.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower),
      );
    }
    return list;
  }, [products, category, q]);

  const title = q ? `Rezultatet për "${q}"` : category || 'Të gjitha produktet';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl font-semibold text-white mb-2">{title}</h1>
      <p className="text-sm text-brand-muted mb-8">{results.length} produkte</p>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-brand-bg rounded-card animate-pulse" />
          ))}
        </div>
      ) : results.length === 0 ? (
        <p className="text-sm text-brand-muted py-12 text-center">Nuk u gjetën produkte.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
