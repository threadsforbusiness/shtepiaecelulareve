export default function PaymentStrip() {
  return (
    <section className="bg-brand-bg border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-6 items-center">
          <div className="flex w-full items-center justify-start sm:justify-center gap-2 border-t border-brand-border py-3 sm:border-0 sm:py-0 text-left sm:text-center text-sm font-medium text-brand-ink">
            <img src="/iute.png" alt="Iute Credit" className="h-6 w-11 shrink-0 object-contain" />
            <span className="whitespace-nowrap">Blerje me këste</span>
          </div>
          <div className="flex w-full items-center justify-start sm:justify-center gap-2 border-t border-brand-border py-3 sm:border-0 sm:py-0 text-left sm:text-center text-sm font-medium text-brand-ink">
            <span className="shrink-0" aria-hidden="true">🛵</span>
            <span>Dërgesa me postë në Shqipëri</span>
          </div>
        </div>
      </div>
    </section>
  );
}
