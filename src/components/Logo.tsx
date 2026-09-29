import { Link } from 'react-router-dom';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center ${className}`} aria-label="Shtëpia e Celulareve">
      <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight leading-none text-brand-ink whitespace-nowrap">
        Shtëpia e <span className="text-brand-red">Celulareve</span>
      </span>
    </Link>
  );
}
