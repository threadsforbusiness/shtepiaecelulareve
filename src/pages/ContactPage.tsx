import { Phone, Mail, MapPin, ExternalLink, Facebook, Instagram } from 'lucide-react';
import { useLocations, useSettings } from '@/lib/hooks';
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/supabase';
import TrustStrip from '@/components/TrustStrip';
import PaymentStrip from '@/components/PaymentStrip';
import type { SocialLink } from '@/lib/types';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  );
}

function SocialIcon({ platform, className }: { platform: string; className?: string }) {
  if (platform === 'facebook') return <Facebook className={className} />;
  if (platform === 'instagram') return <Instagram className={className} />;
  if (platform === 'tiktok') return <TikTokIcon className={className} />;
  return <ExternalLink className={className} />;
}

function SocialLinks({ links }: { links: SocialLink[] }) {
  if (!links || links.length === 0) return null;
  return (
    <div className="flex items-center gap-3 mt-2">
      {links.map((s, i) => (
        <a
          key={i}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center text-white hover:bg-brand-dark hover:text-white transition-colors"
          aria-label={s.platform}
        >
          <SocialIcon platform={s.platform} className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}

export default function ContactPage() {
  const { locations } = useLocations();
  const { settings } = useSettings();

  const mapSrc = 'https://www.google.com/maps?q=Rruga+e+Durrësit,+Tiranë,+Albania&q=Lake+View+Residence,+Tiranë,+Albania&z=13&output=embed';

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white">Na kontaktoni</h1>
          <p className="text-sm text-brand-muted mt-3">
            Jemi këtu për t'ju ndihmuar. Na telefononi, na shkruani në WhatsApp, ose na vizitoni në një nga dyqanet tona.
          </p>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <a href={`tel:${PHONE_TEL}`} className="flex flex-col items-center gap-2 p-6 border border-brand-border rounded-card hover:border-brand-dark/20 transition-colors">
            <Phone className="w-6 h-6 text-brand-red" />
            <span className="text-sm font-semibold text-white">Telefon</span>
            <span className="text-sm text-brand-muted">{PHONE_DISPLAY}</span>
          </a>
          <a href={`mailto:${settings?.email || 'info@smartstore.al'}`} className="flex flex-col items-center gap-2 p-6 border border-brand-border rounded-card hover:border-brand-dark/20 transition-colors">
            <Mail className="w-6 h-6 text-brand-red" />
            <span className="text-sm font-semibold text-white">Email</span>
            <span className="text-sm text-brand-muted">{settings?.email || 'info@smartstore.al'}</span>
          </a>
        </div>

        {/* Store locations */}
        <h2 className="text-xl font-semibold text-white mb-6">Dyqanet tona</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {locations.map((loc) => (
            <div key={loc.id} className="border border-brand-border rounded-card p-6 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-semibold text-white">{loc.name}</h3>
                  <p className="text-sm text-brand-muted mt-1">{loc.address}</p>
                </div>
              </div>
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 text-sm text-white hover:text-brand-red">
                <Phone className="w-4 h-4" /> {loc.phone}
              </a>
              <a
                href={loc.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-red hover:underline"
              >
                <ExternalLink className="w-4 h-4" /> Shiko në hartë
              </a>
              <SocialLinks links={loc.social_links || []} />
            </div>
          ))}
        </div>

        {/* Embedded map with both store markers */}
        <div className="rounded-card overflow-hidden border border-brand-border">
          <iframe
            title="Harta e dyqaneve"
            src={mapSrc}
            className="w-full h-[400px]"
            loading="lazy"
          />
        </div>
      </div>

      <TrustStrip />
      <PaymentStrip />
    </div>
  );
}
