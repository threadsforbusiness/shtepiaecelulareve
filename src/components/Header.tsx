import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Phone } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative grid grid-cols-3 items-center h-16 lg:flex lg:justify-between">
          <div className="flex items-center gap-3 shrink-0 order-1 lg:order-1">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-1 text-white"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <a href={`tel:${PHONE_TEL}`} className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-white hover:text-brand-red transition-colors">
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
          </div>

          <Link to="/" className="flex items-center justify-self-center shrink-0 order-2 lg:order-2 lg:mr-6">
            <img src="/img_logo.png" alt="Smart Store" className="block w-44 sm:w-40 h-auto object-contain" />
          </Link>

          <nav className="hidden lg:flex items-center gap-7 lg:order-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium text-white hover:text-brand-red transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-self-end gap-3 order-3 lg:order-4">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-medium text-white hover:text-brand-red transition-colors"
              aria-label="Kërko"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">Kërko</span>
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
                className="px-2 py-2.5 text-sm font-medium text-white hover:text-brand-red border-b border-brand-border/50"
              >
                {item.label}
              </Link>
            ))}
            <a href={`tel:${PHONE_TEL}`} className="px-2 py-2.5 text-sm font-medium text-white flex items-center gap-2">
              <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
