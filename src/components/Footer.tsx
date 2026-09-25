import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/supabase';

export default function Footer() {
  return (
    <footer className="bg-brand-bg border-t border-brand-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/img_logo.png" alt="Smart Store" className="h-9 w-auto" />
            </Link>
            <p className="text-sm text-brand-muted leading-relaxed">
              Be smart, spend smart.
            </p>
          </div>

          <div className="sm:justify-self-end sm:min-w-48">
            <h4 className="text-sm font-semibold text-white mb-4">Kontakt</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li>
                <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 hover:text-brand-red transition-colors">
                  <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-brand-red transition-colors">
                  <MapPin className="w-4 h-4" /> Adresat
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-brand-border text-center text-xs text-brand-muted">
          Website u krijua nga{' '}
          <a
            href="https://webgreal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-red hover:text-brand-red/80 transition-colors"
          >
            webgreal.com
          </a>
        </div>
      </div>
    </footer>
  );
}
