import { Link } from 'react-router-dom';

export default function LegalPage({ title, body }: { title: string; body: string[] }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/" className="text-sm text-brand-red hover:underline mb-6 inline-block">← Kthehu në faqe</Link>
      <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-6">{title}</h1>
      <div className="space-y-4">
        {body.map((p, i) => (
          <p key={i} className="text-sm text-brand-muted leading-relaxed">{p}</p>
        ))}
      </div>
    </div>
  );
}
