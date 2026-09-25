import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { BRANDS, CATEGORIES, STORAGE_PRESETS, type StoreProduct, type ColorVariant, type StorageVariant, type ConditionVariant } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

const EMPTY_PRODUCT = {
  slug: '',
  name: '',
  brand: 'Apple',
  category: 'Celular',
  description: '',
  specs: '',
  old_price: 0,
  price: 0,
  images: [] as string[],
  colors: [] as ColorVariant[],
  storage_options: [] as StorageVariant[],
  conditions: [
    { name: 'I RI (në kuti)', adjustment: 0 },
    { name: 'VITRINE (preowned)', adjustment: -12000 },
  ] as ConditionVariant[],
  featured: false,
  is_active: true,
};

const ADMIN_PAGE_SIZE = 20;

export default function ProductsAdmin() {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<StoreProduct | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const load = () => {
    setLoading(true);
    supabase.from('store_products').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setProducts((data as StoreProduct[]) || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Konfirmoni fshirjen e këtij produkti?')) return;
    await supabase.from('store_products').delete().eq('id', id);
    setPage(1);
    load();
  };

  const toggleActive = async (p: StoreProduct) => {
    await supabase.from('store_products').update({ is_active: !p.is_active }).eq('id', p.id);
    load();
  };

  const totalPages = Math.ceil(products.length / ADMIN_PAGE_SIZE);
  const safePage = Math.min(page, totalPages) || 1;
  const pageStart = (safePage - 1) * ADMIN_PAGE_SIZE;
  const pageProducts = products.slice(pageStart, pageStart + ADMIN_PAGE_SIZE);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-brand-muted">{products.length} produkte</p>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-1.5 bg-brand-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-red/90"
        >
          <Plus className="w-4 h-4" /> Shto produkt
        </button>
      </div>

      {loading ? (
        <div className="text-sm text-brand-muted py-8">Po ngarkohet...</div>
      ) : (
        <>
          <div className="bg-brand-bg border border-brand-border rounded-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-brand-dark">
                <tr className="text-left text-xs text-brand-muted">
                  <th className="px-4 py-3 font-medium">Produkti</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">Brand</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">Kategoria</th>
                  <th className="px-4 py-3 font-medium">Çmimi</th>
                  <th className="px-4 py-3 font-medium text-center hidden sm:table-cell">Statusi</th>
                  <th className="px-4 py-3 font-medium text-right">Veprime</th>
                </tr>
              </thead>
              <tbody>
                {pageProducts.map((p) => (
                  <tr key={p.id} className="border-t border-brand-border">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.images[0] && <img src={p.images[0]} alt="" className="w-10 h-10 rounded object-cover" />}
                        <span className="font-medium text-white">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-brand-muted">{p.brand}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-brand-muted">{p.category}</td>
                    <td className="px-4 py-3 font-semibold text-white">{formatPrice(p.price)}</td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <button
                        onClick={() => toggleActive(p)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          p.is_active
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`
                        }
                      >
                        {p.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        {p.is_active ? 'ON' : 'OFF'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => toggleActive(p)} className={`p-1.5 sm:hidden ${p.is_active ? 'text-green-600' : 'text-gray-400'}`}>
                          {p.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button onClick={() => { setEditing(p); setShowForm(true); }} className="p-1.5 text-brand-muted hover:text-white">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 text-brand-muted hover:text-brand-red">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-brand-muted">
                Faqja {safePage} nga {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white border border-brand-border rounded-lg hover:bg-brand-bg disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" /> Mbrapa
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white border border-brand-border rounded-lg hover:bg-brand-bg disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Përpara <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {showForm && (
        <ProductForm
          product={editing}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSaved={() => { setShowForm(false); setEditing(null); setPage(1); load(); }}
        />
      )}
    </div>
  );
}

function ProductForm({ product, onClose, onSaved }: { product: StoreProduct | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState(() => {
    if (product) {
      return {
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        category: product.category,
        description: product.description,
        specs: product.specs,
        old_price: product.old_price,
        price: product.price,
        images: [...product.images],
        colors: product.colors.map((c) => ({ ...c, images: c.images ? [...c.images] : [] })),
        storage_options: [...product.storage_options],
        conditions: [...product.conditions],
        featured: product.featured,
        is_active: product.is_active,
      };
    }
    return { ...EMPTY_PRODUCT };
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const update = (field: string, value: unknown) => setForm((f) => ({ ...f, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    setError('');
    if (!form.slug || !form.name) {
      setError('Slug dhe emri janë të detyrueshme.');
      setSaving(false);
      return;
    }
    const payload = {
      slug: form.slug.toLowerCase().replace(/\s+/g, '-'),
      name: form.name,
      brand: form.brand,
      category: form.category,
      description: form.description,
      specs: form.specs,
      old_price: Number(form.old_price),
      price: Number(form.price),
      images: form.images.filter(Boolean),
      colors: form.colors.map((c) => ({
        name: c.name,
        hex: c.hex,
        images: (c.images || []).filter(Boolean),
      })),
      storage_options: form.storage_options,
      conditions: form.conditions,
      featured: form.featured,
      is_active: form.is_active,
    };
    let result;
    if (product) {
      result = await supabase.from('store_products').update(payload).eq('id', product.id);
    } else {
      result = await supabase.from('store_products').insert(payload);
    }
    setSaving(false);
    if (result.error) {
      setError('Gabim gjatë ruajtjes. Kontrolloni të dhënat dhe provoni përsëri.');
      console.error('Product save error:', result.error);
    } else {
      onSaved();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-brand-bg rounded-card w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-brand-border" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-brand-bg border-b border-brand-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">{product ? 'Edito produktin' : 'Shto produkt'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-brand-muted" /></button>
        </div>

        <div className="p-6 space-y-5">
          {error && <p className="text-sm text-brand-red bg-brand-bg px-3 py-2 rounded">{error}</p>}

          <div className="grid grid-cols-2 gap-4">
            <Field label="Emri">
              <input className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm" value={form.name} onChange={(e) => update('name', e.target.value)} />
            </Field>
            <Field label="Slug (URL)">
              <input className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm" value={form.slug} onChange={(e) => update('slug', e.target.value)} placeholder="iphone-17-pro" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Brand">
              <select className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm" value={form.brand} onChange={(e) => update('brand', e.target.value)}>
                {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Kategoria">
              <select className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm" value={form.category} onChange={(e) => update('category', e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Çmimi i vjetër (L)">
              <input type="number" className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm" value={form.old_price} onChange={(e) => update('old_price', e.target.value)} />
            </Field>
            <Field label="Çmimi aktual (L)">
              <input type="number" className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm" value={form.price} onChange={(e) => update('price', e.target.value)} />
            </Field>
          </div>

          <Field label="Specifika (1 rresht)">
            <input className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm" value={form.specs} onChange={(e) => update('specs', e.target.value)} />
          </Field>

          <Field label="Përshkrimi">
            <textarea className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm" rows={3} value={form.description} onChange={(e) => update('description', e.target.value)} />
          </Field>

          {/* General product images */}
          <Field label="Foto të produktit (URL, një për rresht)">
            <textarea
              className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm"
              rows={3}
              value={form.images.join('\n')}
              onChange={(e) => update('images', e.target.value.split('\n').filter(Boolean))}
            />
            {form.images.filter(Boolean).length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {form.images.filter(Boolean).map((img, i) => (
                  <img key={i} src={img} alt="" className="w-12 h-12 rounded object-cover border border-brand-border" />
                ))}
              </div>
            )}
          </Field>

          {/* Colors with per-color images */}
          <Field label="Ngjyrat (me foto për secilën)">
            <div className="space-y-3">
              {form.colors.map((c, i) => (
                <ColorEditor
                  key={i}
                  color={c}
                  onChange={(updated) => {
                    const colors = [...form.colors];
                    colors[i] = updated;
                    update('colors', colors);
                  }}
                  onRemove={() => update('colors', form.colors.filter((_, j) => j !== i))}
                />
              ))}
              <button onClick={() => update('colors', [...form.colors, { name: '', hex: '#000000', images: [] }])} className="text-xs text-brand-red font-medium hover:underline">
                + Shto ngjyrë
              </button>
            </div>
          </Field>

          {/* Storage */}
          <Field label="Memoria / Storage">
            <div className="space-y-2">
              {form.storage_options.map((s, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <select className="flex-1 px-3 py-1.5 border border-brand-border rounded-lg text-sm" value={s.name} onChange={(e) => {
                    const storage = [...form.storage_options]; storage[i] = { ...s, name: e.target.value }; update('storage_options', storage);
                  }}>
                    <option value="">Zgjidh...</option>
                    {STORAGE_PRESETS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <input type="number" className="w-24 px-3 py-1.5 border border-brand-border rounded-lg text-sm" value={s.adjustment} onChange={(e) => {
                    const storage = [...form.storage_options]; storage[i] = { ...s, adjustment: Number(e.target.value) }; update('storage_options', storage);
                  }} placeholder="±L" />
                  <button onClick={() => update('storage_options', form.storage_options.filter((_, j) => j !== i))} className="p-1.5 text-brand-muted hover:text-brand-red"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button onClick={() => update('storage_options', [...form.storage_options, { name: '', adjustment: 0 }])} className="text-xs text-brand-red font-medium hover:underline">+ Shto storage</button>
            </div>
          </Field>

          {/* Conditions */}
          <Field label="Cilësia">
            <div className="space-y-2">
              {form.conditions.map((c, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input className="flex-1 px-3 py-1.5 border border-brand-border rounded-lg text-sm" value={c.name} onChange={(e) => {
                    const conditions = [...form.conditions]; conditions[i] = { ...c, name: e.target.value }; update('conditions', conditions);
                  }} placeholder="Emri" />
                  <input type="number" className="w-24 px-3 py-1.5 border border-brand-border rounded-lg text-sm" value={c.adjustment} onChange={(e) => {
                    const conditions = [...form.conditions]; conditions[i] = { ...c, adjustment: Number(e.target.value) }; update('conditions', conditions);
                  }} placeholder="±L" />
                  <button onClick={() => update('conditions', form.conditions.filter((_, j) => j !== i))} className="p-1.5 text-brand-muted hover:text-brand-red"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button onClick={() => update('conditions', [...form.conditions, { name: '', adjustment: 0 }])} className="text-xs text-brand-red font-medium hover:underline">+ Shto cilësi</button>
            </div>
          </Field>

          <label className="flex items-center gap-2 text-sm text-white">
            <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} />
            Produkt i veçantë (featured)
          </label>

          <label className="flex items-center gap-2 text-sm text-white">
            <input type="checkbox" checked={form.is_active} onChange={(e) => update('is_active', e.target.checked)} />
            I dukshëm në faqe (ON/OFF)
          </label>
        </div>

        <div className="sticky bottom-0 bg-brand-bg border-t border-brand-border px-6 py-4 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-brand-muted hover:text-white">Anulo</button>
          <button onClick={handleSave} disabled={saving} className="px-5 py-2 bg-brand-red text-white rounded-lg text-sm font-medium hover:bg-brand-red/90 disabled:opacity-50">
            {saving ? 'Po ruhet...' : 'Ruaj'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ColorEditor({ color, onChange, onRemove }: { color: ColorVariant; onChange: (c: ColorVariant) => void; onRemove: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const images = color.images || [];

  return (
    <div className="border border-brand-border rounded-lg p-3 space-y-2">
      <div className="flex gap-2 items-center">
        <input
          className="flex-1 px-3 py-1.5 border border-brand-border rounded-lg text-sm"
          value={color.name}
          onChange={(e) => onChange({ ...color, name: e.target.value })}
          placeholder="Emri i ngjyrës"
        />
        <input
          type="color"
          className="w-10 h-9 border border-brand-border rounded-lg cursor-pointer"
          value={color.hex}
          onChange={(e) => onChange({ ...color, hex: e.target.value })}
        />
        <button onClick={onRemove} className="p-1.5 text-brand-muted hover:text-brand-red">
          <Trash2 className="w-4 h-4" />
        </button>
        <button onClick={() => setExpanded(!expanded)} className="p-1.5 text-brand-muted hover:text-white">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
      {expanded && (
        <div className="space-y-2 pt-1">
          <label className="text-xs text-brand-muted block">Foto për këtë ngjyrë (URL, një për rresht)</label>
          <textarea
            className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm"
            rows={2}
            value={images.join('\n')}
            onChange={(e) => onChange({ ...color, images: e.target.value.split('\n').filter(Boolean) })}
            placeholder="https://... (një URL për rresht)"
          />
          {images.filter(Boolean).length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {images.filter(Boolean).map((img, i) => (
                <img key={i} src={img} alt="" className="w-12 h-12 rounded object-cover border border-brand-border" />
              ))}
            </div>
          )}
          <p className="text-xs text-brand-muted">Kur klienti zgjedh këtë ngjyrë, shfaqen vetëm këto foto.</p>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-white mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
