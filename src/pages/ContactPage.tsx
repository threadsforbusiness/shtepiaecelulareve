import { Instagram, MapPin, Phone, ExternalLink } from 'lucide-react';
import TrustStrip from '@/components/TrustStrip';
import PaymentStrip from '@/components/PaymentStrip';
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/supabase';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  );
}

const LOCATIONS = [
  {
    name: 'Shtëpia e Celulareve',
    phone: PHONE_DISPLAY,
    phoneLink: PHONE_TEL,
    instagram: 'https://www.instagram.com/shtepia_e_celulareve',
    tiktok: 'https://www.tiktok.com/@shtepia_e_celulareve',
    maps: 'https://maps.app.goo.gl/TSSGBCdSkiMvYjVE6',
  },
  {
    name: 'Mobile Lux',
    phone: '+355 68 661 1128',
    phoneLink: '+355686611128',
    instagram: 'https://www.instagram.com/mobile_lux',
    tiktok: 'https://www.tiktok.com/@mobile_lux',
    maps: 'https://maps.app.goo.gl/SDs4tHHfucs1uqHW8',
  },
];

function SocialLinks({ instagram, tiktok }: { instagram: string; tiktok: string }) {
  return (
    <div className="flex items-center gap-3">
      <a
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="w-9 h-9 rounded-full bg-brand-bg flex items-center justify-center text-brand-ink hover:bg-brand-dark hover:text-white transition-colors"
      >
        <Instagram className="w-4 h-4" />
      </a>
      <a
        href={tiktok}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
        className="w-9 h-9 rounded-full bg-brand-bg flex items-center justify-center text-brand-ink hover:bg-brand-dark hover:text-white transition-colors"
      >
        <TikTokIcon className="w-4 h-4" />
      </a>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-brand-ink">Na kontaktoni</h1>
          <p className="text-sm text-brand-muted mt-3">
            Vizitoni një nga lokacionet tona ose na kontaktoni direkt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {LOCATIONS.map((location) => (
            <div key={location.name} className="border border-brand-border rounded-card bg-white p-6 sm:p-8 flex flex-col gap-5">
              <h2 className="text-xl font-semibold text-brand-ink">{location.name}</h2>

              <a href={`tel:${location.phoneLink}`} className="flex items-center gap-3 text-sm text-brand-ink hover:text-brand-red transition-colors">
                <Phone className="w-5 h-5 text-brand-red" />
                {location.phone}
              </a>

              <SocialLinks instagram={location.instagram} tiktok={location.tiktok} />

              <a
                href={location.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-dark text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-brand-red transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Shiko në Google Maps
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        <a
          href={LOCATIONS[0].maps}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-card overflow-hidden border border-brand-border bg-brand-bg"
        >
          <div className="min-h-[320px] sm:min-h-[420px] flex flex-col items-center justify-center text-center px-6 relative">
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(135deg, transparent 0%, rgba(241,192,63,0.12) 50%, transparent 100%)' }} />
            <div className="relative w-16 h-16 rounded-full bg-white border border-brand-border flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <MapPin className="w-8 h-8 text-brand-red" />
            </div>
            <h2 className="relative text-xl font-semibold text-brand-ink mt-5">Rruga e Durrësit</h2>
            <p className="relative text-sm text-brand-muted mt-2">Shtëpia e Celulareve</p>
            <span className="relative inline-flex items-center gap-2 mt-5 text-sm font-medium text-brand-red">
              Hap në Google Maps <ExternalLink className="w-4 h-4" />
            </span>
          </div>
        </a>
      </div>

      <TrustStrip />
      <PaymentStrip />
    </div>
  );
}
