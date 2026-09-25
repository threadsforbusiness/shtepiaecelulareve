import { Link } from 'react-router-dom';
import type { StoreProduct } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export default function ProductCard({ product }: { product: StoreProduct }) {
  const savings = product.old_price > product.price ? product.old_price - product.price : 0;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group flex flex-col bg-brand-bg border border-brand-border rounded-card overflow-hidden hover:border-brand-red/40 transition-all hover:shadow-sm"
    >
      <div className="aspect-square bg-brand-bg overflow-hidden p-3 sm:p-4 flex items-center justify-center">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 5).map((c) => (
              <span
                key={c.name}
                className="w-3 h-3 rounded-full border border-brand-border"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}

        <h3 className="text-sm font-medium text-white leading-snug line-clamp-2">{product.name}</h3>

        <div className="mt-auto">
          {product.old_price > product.price && product.price > 0 && (
            <p className="text-xs text-brand-muted line-through">{formatPrice(product.old_price)}</p>
          )}
          <p className={`text-lg font-normal ${product.price > 0 ? 'text-white' : 'text-[#f1c03f]'}`}>
            {product.price > 0 ? formatPrice(product.price) : 'Rezervo Tani'}
          </p>
          {savings > 0 && (
            <p className="text-xs text-brand-red font-medium mt-0.5">Ju kurseni {formatPrice(savings)}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
