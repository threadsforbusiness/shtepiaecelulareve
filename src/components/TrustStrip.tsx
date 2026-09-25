import { ShieldCheck, BadgePercent, Clock3 } from 'lucide-react';

const ITEMS = [
  { icon: ShieldCheck, title: 'Garanci 24 muaj', desc: 'Të gjitha produktet me garanci zyrtare' },
  { icon: BadgePercent, title: 'Çmimet më të mira', desc: 'Oferta çdo javë dhe zbritje sezonale' },
  { icon: Clock3, title: 'Orari ynë', desc: 'Hënë - Diel · 08:00–22:00' }
];

export default function TrustStrip() {
  return (
    <section className="bg-brand-dark border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-start">
          {ITEMS.map((item) => (
            <div key={item.title} className="w-full flex items-center justify-start gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-brand-bg flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-brand-red" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="text-xs text-brand-muted mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
