import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroBannerCarousel from '@/components/HeroBannerCarousel';
import BenefitsCarousel from '@/components/BenefitsCarousel';
import CountdownTimer from '@/components/CountdownTimer';
import CTASection from '@/components/CTASection';
import SquareBanners from '@/components/SquareBanners';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Footer from '@/components/Footer';
import { fetchProductsFromSheets, Product } from '@/lib/sheetsApi';
import LoadingSpinner from '@/components/LoadingSpinner';
import PromocoesCarousel from '@/components/PromocoesCarousel';
import ProductRowCarousel from '@/components/ProductRowCarousel';

export default function Home() {
  const [novidades, setNovidades] = useState<Product[]>([]);
  const [maisVendidos, setMaisVendidos] = useState<Product[]>([]);
  const [promocoes, setPromocoes] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Delay para melhorar UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      const products = await fetchProductsFromSheets();
      
      // Novidades (últimos 8 produtos adicionados - do fim para o começo)
      const reversedProducts = [...products].reverse();
      setNovidades(reversedProducts.slice(0, 8));
      
      // Mais vendidos (produtos mais baratos como exemplo)
      const sorted = [...products].sort((a, b) => a.preco - b.preco);
      setMaisVendidos(sorted.slice(0, 8));
      
      // Promoções (produtos com promocao = true - pegando as mais recentes primeiro)
      const allPromocoes = products.filter(p => p.promocao === true).reverse();
      setPromocoes(allPromocoes.slice(0, 8));
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroBannerCarousel />
        <BenefitsCarousel />
        
        <div className="w-screen">
          <CountdownTimer 
            title="Promoção Especial"
            description="Aproveite enquanto dura! Produtos selecionados com condições especiais."
          />
        </div>

        {!loading && (
          <>
            <PromocoesCarousel
              title="Promoções"
              products={promocoes}
              link="/categoria/promoções"
              banner={{
                image: '/banner_vertical2.jpg',
                title: 'Promoções',
                subtitle: 'Veja mais promoções',
                link: '/categoria/promoções',
                position: 'right',
              }}
            />
            <CTASection />
            <PromocoesCarousel
              title="Mais Vendidos"
              products={maisVendidos}
              link="/loja"
              banner={{
                image: '/banner_vertical.jpg',
                title: 'Mais Vendidos',
                subtitle: 'Veja os mais vendidos',
                link: '/loja',
                position: 'left',
                overlayGradient: 'linear-gradient(to right top, rgb(150 133 103 / 89%) 29%, rgb(150 133 103 / 9%) 40%, #00000000 100%)',
              }}
            />
            <ProductRowCarousel
              title="Novidades"
              products={novidades}
              link="/loja"
            />
            <SquareBanners />
          </>
        )}

        {loading && (
          <div className="container py-12 text-center">
            <LoadingSpinner size={48} className="mb-4" />
            <p className="text-muted-foreground">Carregando produtos...</p>
          </div>
        )}
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
