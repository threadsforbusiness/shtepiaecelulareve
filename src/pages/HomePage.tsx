import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useCategories, useProducts, useSettings } from '@/lib/hooks';
import ProductCard from '@/components/ProductCard';
import TrustStrip from '@/components/TrustStrip';
import PaymentStrip from '@/components/PaymentStrip';

const FILTER_TABS = ['Të Gjithë', 'iPhone', 'Samsung', 'Xiaomi', 'Google', 'Smartwatch', 'Laptop', 'Tablet', 'Aksesorë'];
const HOMEPAGE_MAX = 20;

export default function HomePage() {
  const { settings } = useSettings();
  const { categories } = useCategories();
  const { products, loading } = useProducts();
  const [activeTab, setActiveTab] = useState('Të Gjithë');

  const featuredCategory = categories.find((c) => c.featured) || categories[0];
  const otherCategories = categories.filter((c) => c.id !== featuredCategory?.id).slice(0, 4);

  const filteredProducts = useMemo(() => {
    if (activeTab === 'Të Gjithë') return products;
    const tabMap: Record<string, string> = { iPhone: 'Apple', Samsung: 'Samsung', Xiaomi: 'Xiaomi', Google: 'Google' };
    if (tabMap[activeTab]) return products.filter((p) => p.brand === tabMap[activeTab]);
    return products.filter((p) => p.category === activeTab);
  }, [products, activeTab]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof products>();
    filteredProducts.forEach((p) => {
      if (!map.has(p.brand)) map.set(p.brand, []);
      map.get(p.brand)!.push(p);
    });
    return Array.from(map.entries()).sort(([a], [b]) => {
      if (a === 'Apple') return -1;
      if (b === 'Apple') return 1;
      return 0;
    });
  }, [filteredProducts]);

  return (
    <div>
      {/* Category quick-links */}
      {featuredCategory && (
        <section className="category-showcase max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-2 gap-4 lg:gap-5 lg:p-4">
            <Link
              to={featuredCategory.href}
              className="phone-featured-card group relative isolate h-64 sm:h-80 lg:h-[420px] rounded-card overflow-hidden border border-brand-border shadow-sm transition-transform duration-300 ease-out hover:scale-[1.02] sm:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:row-span-2 flex flex-col"
              style={featuredCategory.image ? { backgroundImage: `url(${featuredCategory.image})` } : undefined}
            >
              <div className="p-6 sm:p-8 z-10">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white">{featuredCategory.name}</h2>
                <p className="text-sm text-brand-muted mt-1 max-w-xs">{featuredCategory.description}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-white bg-brand-dark border border-brand-border px-4 py-2 rounded-full hover:bg-brand-red hover:text-white transition-colors">
                  Shiko {featuredCategory.name} →
                </span>
              </div>
            </Link>

            {otherCategories.map((cat, idx) => {
              const positions = [
                'lg:col-start-2 lg:row-start-1',
                'lg:col-start-3 lg:row-start-1',
                'lg:col-start-2 lg:row-start-2',
                'lg:col-start-3 lg:row-start-2',
              ];
              return (
                <Link
                  key={cat.id}
                  to={cat.href}
                  className={`group relative h-40 sm:h-44 lg:h-auto rounded-card overflow-hidden bg-brand-bg border border-brand-border ${positions[idx] || ''}`}
                >
                  <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover lg:object-contain group-hover:scale-105 transition-transform duration-300" />
                  <div className="category-card-overlay absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="category-card-label absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{cat.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Catalog with filter tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <h2 className="text-xl sm:text-2xl font-medium text-white mb-6">Kerko sipas kategorive</h2>

        <div className="flex flex-nowrap gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-2 mb-8 max-w-full">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-brand-dark text-white'
                  : 'bg-brand-bg text-white hover:bg-brand-border'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

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
            {grouped.map(([brand, items]) => {
              const visible = items.slice(0, HOMEPAGE_MAX);
              const hasMore = items.length > HOMEPAGE_MAX;
              const categoryHref = `/category/${encodeURIComponent(items[0].category)}`;
              return (
                <div key={brand}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-red">{brand}</span>
                    <div className="flex-1 h-px bg-brand-border" />
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {visible.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                  {hasMore && (
                    <div className="mt-4 flex justify-center">
                      <Link
                        to={categoryHref}
                        className="inline-flex items-center gap-1 text-sm font-medium text-white bg-brand-bg border border-brand-border px-5 py-2 rounded-full hover:bg-brand-dark hover:text-white transition-colors"
                      >
                        Shiko të gjitha produktet {brand} ({items.length})
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <TrustStrip />
      <PaymentStrip />
    </div>
  );
}
