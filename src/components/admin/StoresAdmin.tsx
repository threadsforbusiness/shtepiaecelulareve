import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { StoreLocation, SocialLink } from '@/lib/types';

const PLATFORMS = ['instagram', 'tiktok', 'facebook', 'youtube', 'twitter'];

export default function StoresAdmin() {
  const [locations, setLocations] = useState<StoreLocation[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    supabase.from('store_locations').select('*').order('sort_order', { ascending: true }).then(({ data }) => {
      setLocations((data as StoreLocation[]) || []);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const update = (id: string, field: keyof StoreLocation, value: unknown) => {
    setLocations((locs) => locs.map((l) => l.id === id ? { ...l, [field]: value as never } : l));
  };

  const saveRow = async (loc: StoreLocation) => {
    await supabase.from('store_locations').update({
      name: loc.name,
      address: loc.address,
      phone: loc.phone,
      maps_url: loc.maps_url,
      social_links: loc.social_links || [],
      sort_order: loc.sort_order,
    }).eq('id', loc.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Fshi këtë dyqan?')) return;
    await supabase.from('store_locations').delete().eq('id', id);
    load();
  };

  const handleAdd = async () => {
    await supabase.from('store_locations').insert({
      name: 'Dyqan i ri',
      address: '',
      phone: '068 600 5554',
      maps_url: '',
      social_links: [],
      sort_order: locations.length + 1,
    });
    load();
  };

  if (loading) return <p className="text-sm text-brand-muted">Po ngarkohet...</p>;

  return (
    <div className="space-y-4">
      <button onClick={handleAdd} className="flex items-center gap-1.5 bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-dark/90">
        <Plus className="w-4 h-4" /> Shto dyqan
      </button>

      <div className="space-y-3">
        {locations.map((loc) => (
          <div key={loc.id} className="bg-brand-bg border border-brand-border rounded-card p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-3">
                <label className="text-xs text-brand-muted block mb-1">Emri</label>
                <input className="w-full px-3 py-1.5 border border-brand-border rounded-lg text-sm" value={loc.name} onChange={(e) => update(loc.id, 'name', e.target.value)} />
              </div>
              <div className="sm:col-span-4">
                <label className="text-xs text-brand-muted block mb-1">Adresa</label>
                <input className="w-full px-3 py-1.5 border border-brand-border rounded-lg text-sm" value={loc.address} onChange={(e) => update(loc.id, 'address', e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-brand-muted block mb-1">Telefon</label>
                <input className="w-full px-3 py-1.5 border border-brand-border rounded-lg text-sm" value={loc.phone} onChange={(e) => update(loc.id, 'phone', e.target.value)} />
              </div>
              <div className="sm:col-span-3">
                <label className="text-xs text-brand-muted block mb-1">Google Maps Link</label>
                <input className="w-full px-3 py-1.5 border border-brand-border rounded-lg text-sm" value={loc.maps_url} onChange={(e) => update(loc.id, 'maps_url', e.target.value)} />
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-2">
              <label className="text-xs text-brand-muted block">Rrjetet sociale</label>
              {(loc.social_links || []).map((s: SocialLink, i: number) => (
                <div key={i} className="flex gap-2 items-center">
                  <select
                    className="px-2 py-1.5 border border-brand-border rounded-lg text-xs"
                    value={s.platform}
                    onChange={(e) => {
                      const links = [...(loc.social_links || [])];
                      links[i] = { ...s, platform: e.target.value };
                      update(loc.id, 'social_links', links);
                    }}
                  >
                    {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <input
                    className="flex-1 px-3 py-1.5 border border-brand-border rounded-lg text-sm"
                    value={s.url}
                    onChange={(e) => {
                      const links = [...(loc.social_links || [])];
                      links[i] = { ...s, url: e.target.value };
                      update(loc.id, 'social_links', links);
                    }}
                    placeholder="https://..."
                  />
                  <button
                    onClick={() => update(loc.id, 'social_links', (loc.social_links || []).filter((_: SocialLink, j: number) => j !== i))}
                    className="p-1.5 text-brand-muted hover:text-brand-red"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => update(loc.id, 'social_links', [...(loc.social_links || []), { platform: 'instagram', url: '' }])}
                className="text-xs text-brand-red font-medium hover:underline"
              >
                + Shto rrjet social
              </button>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => saveRow(loc)} className="px-3 py-1.5 bg-brand-dark text-white rounded-lg text-xs font-medium">Ruaj</button>
              <button onClick={() => handleDelete(loc.id)} className="p-1.5 text-brand-muted hover:text-brand-red"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
