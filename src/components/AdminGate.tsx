import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Home } from 'lucide-react';
import { adminLogin, adminLogout, isAdminAuthed } from '@/lib/adminAuth';

export default function AdminGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(isAdminAuthed());
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  if (authed) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <div className="border-b border-brand-border bg-brand-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src="/img_logo.png" alt="Smart Store" className="h-7 w-auto" />
              <span className="text-sm font-bold text-white hidden sm:inline">Admin</span>
            </Link>
            <div className="flex items-center gap-4">
              <a href="/" className="text-xs text-brand-muted hover:text-brand-red flex items-center gap-1">
                <Home className="w-3.5 h-3.5" /> Faqja
              </a>
              <button
                onClick={() => {
                  adminLogout();
                  setAuthed(false);
                }}
                className="text-xs text-brand-muted hover:text-brand-red flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" /> Dilni
              </button>
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg px-4">
      <div className="w-full max-w-sm">
        <div className="bg-brand-bg border border-brand-border rounded-card p-8">
          <div className="flex flex-col items-center mb-6">
            <img src="/img_logo.png" alt="Smart Store" className="h-10 w-auto mb-3" />
            <h1 className="text-lg font-bold text-white">Admin Panel</h1>
            <p className="text-xs text-brand-muted mt-1">Smart Store Albania</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (adminLogin(user, pass)) {
                setAuthed(true);
                setError('');
              } else {
                setError('Kredencialet janë të gabuara.');
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="text-xs font-medium text-white mb-1.5 block">Përdoruesi</label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full px-3 py-2.5 border border-brand-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-ring"
                placeholder="Smartstore"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-white mb-1.5 block">Fjalëkalimi</label>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full px-3 py-2.5 border border-brand-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-ring"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-xs text-brand-red">{error}</p>}
            <button
              type="submit"
              className="w-full bg-brand-dark text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-dark/90 transition-colors"
            >
              Hyni
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
