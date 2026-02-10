import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductCatalog from '@/components/ProductCatalog';
import Benefits from '@/components/Benefits';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

/**
 * Design Philosophy: Elegância Minimalista Sofisticada
 * 
 * Esta página segue a paleta de cores da Munra Semijoias:
 * - Branco (#FFFFFF): Fundo principal e espaço negativo
 * - Dourado/Bege (#968567): Acento para CTAs e destaques
 * - Cinza Escuro (#575756): Texto principal
 * - Preto (#000000): Barra superior e rodapé
 * 
 * Tipografia:
 * - Títulos: Montserrat Bold (700)
 * - Corpo: Montserrat Regular (400)
 * - Espaçamento generoso para respiro visual
 */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Benefits />
        <ProductCatalog />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
