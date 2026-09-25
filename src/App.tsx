import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import CategoryPage from '@/pages/CategoryPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import ContactPage from '@/pages/ContactPage';
import SearchPage from '@/pages/SearchPage';
import LegalPage from '@/pages/LegalPage';
import AdminPage from '@/pages/AdminPage';
import AdminGate from '@/components/AdminGate';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<LegalPage title="Politika e Privatësisë" body={[
            'Smart Store Albania respekton privatësinë tuaj. Të dhënat personale që na jepni përdoren vetëm për përpunimin e porosive dhe komunikimin me ju.',
            'Ne nuk i shesim apo shpërndajmë të dhënat tuaja palëve të treta. Mund të kërkoni fshirjen e të dhënave tuaj në çdo kohë duke na kontaktuar.',
          ]} />} />
          <Route path="/cookies" element={<LegalPage title="Politika e Cookies" body={[
            'Ky faqe përdor cookies për të përmirësuar përvojën tuaj. Cookies na ndihmojnë të ruajmë preferencat tuaja dhe të analizojmë trafikun.',
            'Mund t\'i çaktivizoni cookies nga cilësimet e shfletuesit tuaj.',
          ]} />} />
          <Route path="/terms" element={<LegalPage title="Kushtet e Përdorimit" body={[
            'Përdorimi i kësaj faqeje nënkupton pranimin e kushteve tona. Të gjitha çmimet janë në Lekë shqiptare dhe mund të ndryshojnë pa paralajmërim.',
            'Produktet kanë garanci 24 muaj. Kthimi i produkteve është i mundur brenda 14 ditëve nga data e blerjes.',
          ]} />} />
          <Route path="/faq" element={<LegalPage title="Pyetje të Shpeshta" body={[
            'Si porosit? Zgjidhni produktin, ngjyrën, memorien dhe cilësinë, pastaj klikoni "Bli me WhatsApp" për të na dërguar porosinë.',
            'Sa zgjat dërgimi? Dërgimi brenda Tiranës bëhet brenda 24 orëve. Për qytetet e tjera, 2-3 ditë pune.',
            'A ofroni financim? Po, ofrojmë financim me kuota mujore përmes partnerëve tanë bankarë.',
          ]} />} />
        </Route>
        <Route path="/admin" element={<AdminGate><AdminPage /></AdminGate>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
