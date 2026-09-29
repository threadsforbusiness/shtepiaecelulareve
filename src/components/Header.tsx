import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';
import { useState } from 'react';
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/supabase';

const NAV = [
  { label: 'Celular', href: '/category/Celular' },
  { label: 'Smartwatch', href: '/category/Smartwatch' },
  { label: 'Tablet', href: '/category/Tablet' },
  { label: 'Laptop', href: '/category/Laptop' },
  { label: 'Aksesorë', href: '/category/Aksesorë' },
  { label: 'Kontakt', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-6 min-h-16 py-3">
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-1.5 text-sm font-medium text-brand-ink hover:text-brand-red transition-colors">
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
          </div>

          <Logo className="order-1 lg:order-1 shrink-0" />

          <nav className="hidden lg:flex items-center gap-6 lg:order-2 flex-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium text-brand-ink hover:text-brand-red transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 order-3 lg:order-3 shrink-0">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-medium text-brand-ink hover:text-brand-red transition-colors"
              aria-label="Kërko"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">Kërko</span>
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-1 text-brand-ink"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="hidden lg:block w-6" />
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={submitSearch} className="pb-3 animate-fade-in">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Kërko produkte..."
              className="w-full px-4 py-2.5 border border-brand-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-ring"
            />
          </form>
        )}

        {mobileOpen && (
          <nav className="lg:hidden pb-4 flex flex-col gap-1 animate-fade-in">
            {NAV.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-2 py-2.5 text-sm font-medium text-brand-ink hover:text-brand-red border-b border-brand-border/50"
              >
                {item.label}
              </Link>
            ))}
            <a href={`tel:${PHONE_TEL}`} className="px-2 py-2.5 text-sm font-medium text-brand-ink flex items-center gap-2">
              <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
