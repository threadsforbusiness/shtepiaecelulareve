import { useState } from 'react';
import { Package, LayoutGrid, MapPin } from 'lucide-react';
import ProductsAdmin from '@/components/admin/ProductsAdmin';
import CategoriesAdmin from '@/components/admin/CategoriesAdmin';
import StoresAdmin from '@/components/admin/StoresAdmin';

type Tab = 'products' | 'categories' | 'stores';

const TABS: { id: Tab; label: string; icon: typeof Package }[] = [
  { id: 'products', label: 'Produktet', icon: Package },
  { id: 'categories', label: 'Kategoritë', icon: LayoutGrid },
  { id: 'stores', label: 'Dyqanet', icon: MapPin },
]

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('products');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-xl font-bold text-white mb-6">Paneli i Administratorit</h1>

      <div className="flex gap-1 sm:gap-2 mb-6 overflow-x-auto no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              tab === t.id ? 'bg-brand-red text-white' : 'bg-brand-bg text-white border border-brand-border hover:bg-brand-dark'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'products' && <ProductsAdmin />}
      {tab === 'categories' && <CategoriesAdmin />}
      {tab === 'stores' && <StoresAdmin />}
    </div>
  );
}
