import { useEffect, useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { StoreCategory } from '@/lib/types';

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<StoreCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Record<string, string>>({});

  const load = () => {
    setLoading(true);
    supabase
      .from('store_categories')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setCategories((data as StoreCategory[]) || []);
        setLoading(false);
      });
  };

  useEffect(() => { load(); }, []);

  const update = (id: string, field: keyof StoreCategory, value: unknown) => {
    setCategories((cats) => cats.map((c) => c.id === id ? { ...c, [field]: value as never } : c));
    setSaved((s) => ({ ...s, [id]: false }));
    setError((e) => ({ ...e, [id]: '' }));
  };

  const saveRow = async (cat: StoreCategory) => {
    const { error: err } = await supabase.from('store_categories').update({
      name: cat.name,
      description: cat.description,
      image: cat.image,
      href: cat.href,
      featured: cat.featured,
      sort_order: cat.sort_order,
    }).eq('id', cat.id);

    if (err) {
      setError((e) => ({ ...e, [cat.id]: 'Gabim gjatë ruajtjes.' }));
      return;
    }

    setSaved((s) => ({ ...s, [cat.id]: true }));
    setTimeout(() => setSaved((s) => ({ ...s, [cat.id]: false })), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Fshi këtë kategori?')) return;
    await supabase.from('store_categories').delete().eq('id', id);
    load();
  };

  const handleAdd = async () => {
    await supabase.from('store_categories').insert({
      name: 'Kategori e re',
      description: '',
      image: '',
      href: '/category/Celular',
      featured: false,
      sort_order: categories.length + 1,
    });
    load();
  };

  if (loading) return <p className="text-sm text-brand-muted">Po ngarkohet...</p>;

  return (
    <div className="space-y-4">
      <button onClick={handleAdd} className="flex items-center gap-1.5 bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-dark/90">
        <Plus className="w-4 h-4" /> Shto kategori
      </button>

      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-brand-bg border border-brand-border rounded-card p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
              {/* Image preview + URL */}
              <div className="sm:col-span-3">
                <label className="text-xs text-brand-muted block mb-1">Foto (URL)</label>
                {cat.image && (
                  <img
                    key={cat.image}
                    src={cat.image}
                    alt=""
                    className="w-full h-24 object-cover rounded-lg mb-2"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'block'; }}
                  />
                )}
                <input
                  className="w-full px-2 py-1.5 border border-brand-border rounded-lg text-xs"
                  value={cat.image}
                  placeholder="https://..."
                  onChange={(e) => update(cat.id, 'image', e.target.value)}
                />
              </div>

              {/* Name */}
              <div className="sm:col-span-3">
                <label className="text-xs text-brand-muted block mb-1">Emri</label>
                <input
                  className="w-full px-3 py-1.5 border border-brand-border rounded-lg text-sm"
                  value={cat.name}
                  onChange={(e) => update(cat.id, 'name', e.target.value)}
                />
              </div>

              {/* Description — only for the featured (Telefonat) category */}
              {cat.featured && (
                <div className="sm:col-span-3">
                  <label className="text-xs text-brand-muted block mb-1">Përshkrimi</label>
                  <input
                    className="w-full px-3 py-1.5 border border-brand-border rounded-lg text-sm"
                    value={cat.description}
                    onChange={(e) => update(cat.id, 'description', e.target.value)}
                  />
                </div>
              )}

              {/* Link */}
              <div className="sm:col-span-2">
                <label className="text-xs text-brand-muted block mb-1">Linku</label>
                <input
                  className="w-full px-3 py-1.5 border border-brand-border rounded-lg text-sm"
                  value={cat.href}
                  onChange={(e) => update(cat.id, 'href', e.target.value)}
                />
              </div>

              {/* Sort order */}
              <div className="sm:col-span-1">
                <label className="text-xs text-brand-muted block mb-1">Renditja</label>
                <input
                  type="number"
                  className="w-full px-2 py-1.5 border border-brand-border rounded-lg text-sm"
                  value={cat.sort_order}
                  onChange={(e) => update(cat.id, 'sort_order', Number(e.target.value))}
                />
              </div>
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={cat.featured}
                  onChange={(e) => update(cat.id, 'featured', e.target.checked)}
                />
                Featured
              </label>

              <div className="flex items-center gap-2">
                {error[cat.id] && (
                  <span className="text-xs text-brand-red">{error[cat.id]}</span>
                )}
                {saved[cat.id] && (
                  <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                    <Check className="w-3.5 h-3.5" /> U ruajt
                  </span>
                )}
                <button
                  onClick={() => saveRow(cat)}
                  className="px-4 py-1.5 bg-brand-dark text-white rounded-lg text-xs font-medium hover:bg-brand-dark/90 transition-colors"
                >
                  Ruaj
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-1.5 text-brand-muted hover:text-brand-red transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
