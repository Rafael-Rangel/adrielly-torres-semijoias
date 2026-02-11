import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';


interface BannerData {
  image: string;
  headline: string;
  subheadline: string;
  primaryButton: {
    text: string;
    link: string;
    action?: () => void;
  };
  secondaryButton?: {
    text: string;
    link: string;
    action?: () => void;
  };
}

const banners: BannerData[] = [
  {
    image: '/banner1.jpg',
    headline: 'Coleção Exclusiva de Joias',
    subheadline: 'Descubra peças únicas que destacam sua beleza natural. Cada joia é cuidadosamente selecionada para você.',
    primaryButton: {
      text: 'Ver Coleção',
      link: '/loja'
    },
    secondaryButton: {
      text: 'Comprar pelo WhatsApp',
      link: '#',
      action: () => {}
    }
  },
  {
    image: '/banner2.jpg',
    headline: 'Promoções Especiais',
    subheadline: 'Aproveite condições imperdíveis em produtos selecionados. Ofertas por tempo limitado!',
    primaryButton: {
      text: 'Ver Promoções',
      link: '/categoria/promoções'
    },
    secondaryButton: {
      text: 'Ver Tudo',
      link: '/loja'
    }
  },
  {
    image: '/banner3.jpg',
    headline: 'Elegância em Cada Detalhe',
    subheadline: 'Peças cuidadosamente selecionadas para você. Qualidade e sofisticação em cada joia.',
    primaryButton: {
      text: 'Explorar',
      link: '/loja'
    },
    secondaryButton: {
      text: 'Fale Conosco',
      link: '/contato'
    }
  },
  {
    image: '/banner4.jpg',
    headline: 'Novidades Chegaram',
    subheadline: 'Confira as últimas adições à nossa coleção. Seja a primeira a conhecer!',
    primaryButton: {
      text: 'Ver Novidades',
      link: '/loja'
    },
    secondaryButton: {
      text: 'Comprar pelo WhatsApp',
      link: '#',
      action: () => {}
    }
  },
  {
    image: '/banner5.jpg',
    headline: 'Sua Beleza Merece o Melhor',
    subheadline: 'Joias e semijoias com qualidade e sofisticação.',
    primaryButton: {
      text: 'Ver Produtos',
      link: '/loja'
    },
    secondaryButton: {
      text: 'Saiba Mais',
      link: '/ajuda'
    }
  }
];

export default function HeroBannerCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [bannerHeight, setBannerHeight] = useState('100vh');
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  }, []);

  const startAutoplay = useCallback(() => {
    if (!api) return;
    autoplayRef.current = setInterval(() => api.scrollNext(), 5000);
  }, [api]);

  const pause = useCallback(() => {
    stopAutoplay();
  }, [stopAutoplay]);

  const scheduleResume = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = null;
    startAutoplay();
  }, [startAutoplay]);

  useEffect(() => {
    // Calcular altura do header e ajustar banner
    const calculateBannerHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        const headerHeight = header.offsetHeight;
        const viewportHeight = window.innerHeight;
        const calculatedHeight = viewportHeight - headerHeight;
        setBannerHeight(`${calculatedHeight}px`);
      }
    };

    // Calcular na montagem
    calculateBannerHeight();

    // Recalcular no resize
    window.addEventListener('resize', calculateBannerHeight);
    
    return () => {
      window.removeEventListener('resize', calculateBannerHeight);
    };
  }, []);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api) return;
    startAutoplay();
    return () => stopAutoplay();
  }, [api, startAutoplay, stopAutoplay]);

  return (
    <section
      className="relative w-full bg-background"
      style={{ height: bannerHeight }}
      onMouseEnter={pause}
      onMouseLeave={scheduleResume}
      onClick={() => { pause(); scheduleResume(); }}
    >
      <Carousel className="w-full h-full" setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="h-full -ml-0">
          {banners.map((banner, index) => (
            <CarouselItem key={index} className="h-full pl-0 basis-full min-w-full flex-shrink-0">
              <div className="relative h-full w-full" style={{ height: bannerHeight }}>
                {/* Background Image */}
                <img
                  src={banner.image}
                  alt={banner.headline}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Overlay escuro para melhorar legibilidade do texto */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/20 via-black/15 to-black/10" />

                {/* Content - Texto à esquerda */}
                <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl"
                  >
                    <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight font-gumani">
                      {banner.headline}
                    </h1>
                    <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-xl font-gumani">
                      {banner.subheadline}
                    </p>
                    <div className="flex gap-4 flex-wrap">
                      {banner.primaryButton && (
                        <Link href={banner.primaryButton.link}>
                          <Button size="default" className="gap-2">
                            {banner.primaryButton.text}
                          </Button>
                        </Link>
                      )}
                      {banner.secondaryButton && (
                        banner.secondaryButton.action ? (
<WhatsAppButton preset="hero" size="default" variant="outline">
                              {banner.secondaryButton.text}
                            </WhatsAppButton>
                        ) : (
                          <Link href={banner.secondaryButton.link}>
                            <Button
                              size="default"
                              variant="outline"
                              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
                            >
                              {banner.secondaryButton.text}
                            </Button>
                          </Link>
                        )
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Indicadores de slide */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
