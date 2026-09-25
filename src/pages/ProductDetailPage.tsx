import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Calculator, ShieldCheck } from 'lucide-react';
import { useProduct, useProducts } from '@/lib/hooks';
import { buildWhatsAppLink, computeVariantPrice, formatPrice } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import TrustStrip from '@/components/TrustStrip';
import PaymentStrip from '@/components/PaymentStrip';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading } = useProduct(slug);
  const { products } = useProducts();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [selectedCondition, setSelectedCondition] = useState(0);

  const currentPrice = useMemo(() => {
    if (!product) return 0;
    const storageAdj = product.storage_options[selectedStorage]?.adjustment ?? 0;
    const conditionAdj = product.conditions[selectedCondition]?.adjustment ?? 0;
    return computeVariantPrice(product, storageAdj, conditionAdj);
  }, [product, selectedStorage, selectedCondition]);

  const oldPrice = useMemo(() => {
    if (!product) return 0;
    const storageAdj = product.storage_options[selectedStorage]?.adjustment ?? 0;
    const conditionAdj = product.conditions[selectedCondition]?.adjustment ?? 0;
    return Math.max(0, product.old_price + storageAdj + conditionAdj);
  }, [product, selectedStorage, selectedCondition]);

  const savings = oldPrice > currentPrice ? oldPrice - currentPrice : 0;

  const related = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 8);
  }, [products, product]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square bg-brand-bg rounded-card animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-brand-bg rounded animate-pulse" />
            <div className="h-4 bg-brand-bg rounded animate-pulse w-2/3" />
            <div className="h-12 bg-brand-bg rounded animate-pulse w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-white">Produkti nuk u gjet</h1>
        <Link to="/" className="text-brand-red hover:underline mt-4 inline-block">Kthehu në faqe</Link>
      </div>
    );
  }

  const colorImages = product.colors[selectedColor]?.images?.length ? product.colors[selectedColor].images : product.images;
  const colorName = product.colors[selectedColor]?.name || '—';
  const storageName = product.storage_options[selectedStorage]?.name || '—';
  const conditionName = product.conditions[selectedCondition]?.name || '—';
  const waLink = buildWhatsAppLink(product, colorName, storageName, conditionName, currentPrice);

  return (
    <div className="bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image gallery */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            {colorImages.length > 1 && (
              <div className="flex sm:flex-col gap-2 overflow-x-auto no-scrollbar">
                {colorImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${
                      selectedImage === i ? 'border-brand-ring' : 'border-brand-border'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-contain bg-brand-bg" />
                  </button>
                ))}
              </div>
            )}
            <div className="flex-1 aspect-[4/3] sm:aspect-square max-h-[420px] lg:max-h-[520px] bg-brand-bg rounded-card overflow-hidden p-4 sm:p-6 lg:p-8 flex items-center justify-center">
              <img src={colorImages[Math.min(selectedImage, colorImages.length - 1)]} alt={product.name} className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Product info */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-5">
            <div>
              <span className="text-xs text-brand-muted uppercase tracking-wider">{product.brand}</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">{product.name}</h1>
              {product.specs && <p className="text-sm text-brand-muted mt-2">{product.specs}</p>}
            </div>

            {/* Price */}
            {currentPrice > 0 ? (
              <div>
                {oldPrice > currentPrice && (
                  <p className="text-sm text-brand-muted line-through">{formatPrice(oldPrice)}</p>
                )}
                <p className="text-lg font-normal text-white">{formatPrice(currentPrice)}</p>
                {savings > 0 && (
                  <p className="text-sm text-brand-red font-medium mt-1">Ju kurseni {formatPrice(savings)}</p>
                )}
              </div>
            ) : (
              <p className="text-lg font-normal text-[#f1c03f]">Rezervo Tani</p>
            )}

            {/* Color selector */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Ngjyra: <span className="font-normal text-brand-muted">{colorName}</span></h3>
                <div className="flex gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => { setSelectedColor(i); setSelectedImage(0); }}
                      className={`w-9 h-9 rounded-full border-2 transition-all ${
                        selectedColor === i ? 'border-brand-ring ring-2 ring-brand-ring/20' : 'border-brand-border'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Storage selector */}
            {product.storage_options.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Memoria</h3>
                <div className="grid grid-cols-3 gap-2">
                  {product.storage_options.map((s, i) => (
                    <button
                      key={s.name}
                      onClick={() => setSelectedStorage(i)}
                      className={`relative px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        selectedStorage === i
                          ? 'border-brand-ring ring-2 ring-brand-ring/20 bg-brand-ring/10'
                          : 'border-brand-border hover:border-brand-red/40'
                      }`}
                    >
                      {s.name}
                      {s.name.includes('eSIM') && (
                        <span className="absolute -top-1.5 -right-1.5 bg-brand-red text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">eSIM</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Condition selector */}
            {product.conditions.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Cilësia</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.conditions.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedCondition(i)}
                      className={`px-3 py-3 rounded-lg border text-sm font-medium transition-all text-left ${
                        selectedCondition === i
                          ? 'border-brand-ring ring-2 ring-brand-ring/20 bg-brand-ring/10'
                          : 'border-brand-border hover:border-brand-red/40'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-brand-whatsapp text-white px-6 py-3.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Bli me WhatsApp
              </a>
            </div>

            {/* Financing */}
            {currentPrice > 0 && (
            <div className="border border-brand-border rounded-card p-4 bg-brand-bg">
              <div className="flex items-start gap-3">
                <Calculator className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white">Paguani me</h4>
                    <img src="/Gemini_Generated_Image_acqofeacqofeacqo-removebg-preview copy.png" alt="iute" className="w-[76px] h-8 object-contain" />
                  </div>
                  <p className="text-xs text-brand-muted mt-1">iute ofron shërbim pagesash transparent dhe fleksibël për blerësit e zgjuar, të mundëson të blesh tani dhe të paguash më vonë me këste.</p>
                  <a href="https://iute.al/refer-partner/" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-red font-medium hover:underline mt-2 inline-block">Llogarit</a>
                </div>
              </div>
            </div>
            )}
            <div className="flex items-center gap-2 text-sm text-white">
              <Check className="w-5 h-5 text-brand-whatsapp" />
              <ShieldCheck className="w-5 h-5 text-white" />
              <span className="font-medium">Garanci 24 muaj</span>
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="mt-12 max-w-3xl">
            <h2 className="text-lg font-semibold text-white mb-3">Përshkrimi</h2>
            <p className="text-sm text-brand-muted leading-relaxed">{product.description}</p>
          </div>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-lg sm:text-xl font-medium text-white mb-6">Produkte të ngjashme</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <TrustStrip />
      <PaymentStrip />
    </div>
  );
}
