import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/sheetsApi';
import { ChevronRight, ChevronLeft, Store } from 'lucide-react';


interface LeftBannerConfig {
  image: string;
  title: string;
  subtitle: string;
  link: string;
}

interface ProductRowCarouselProps {
  title: string;
  products: Product[];
  link: string;
  leftBanner?: LeftBannerConfig;
}

const CARD_GAP = 24;
const INTERVAL_MS = 2000;
const RESUME_DELAY_MS = 500;

export default function ProductRowCarousel({ title, products, link, leftBanner }: ProductRowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(280);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const pause = useCallback(() => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = null;
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = null;
    setIsPaused(false);
  }, []);

  const scheduleResumeAfterRelease = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(scheduleResume, RESUME_DELAY_MS);
  }, [scheduleResume]);

  useEffect(() => {
    const updateWidth = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const totalWidth = container.offsetWidth;
      const isMobile = totalWidth < 640;
      const isTablet = totalWidth >= 640 && totalWidth < 1024;
      const visible = isMobile ? 1 : isTablet ? 2 : 4;
      const gapTotal = CARD_GAP * (visible - 1);
      setCardWidth(Math.max(200, (totalWidth - gapTotal) / visible));
    };

    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (products.length <= 4 || isPaused) return;
    const t = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % products.length);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, [products.length, isPaused]);

  useEffect(() => {
    if (products.length <= 4) setCurrentIndex(0);
  }, [products.length]);

  if (products.length === 0) return null;

  const duplicated = [...products, ...products];
  const step = cardWidth + CARD_GAP;
  const translateX = -currentIndex * step;

  const carouselInner = (
    <div
      className="flex gap-6 transition-transform duration-500 ease-out"
      style={{
        transform: `translateX(${translateX}px)`,
        width: 'max-content',
      }}
    >
      {duplicated.map((product, index) => (
        <div
          key={`${product.id}-${index}`}
          className="flex-shrink-0"
          style={{ width: cardWidth }}
        >
          <ProductCard product={product} index={index % products.length} />
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground text-center sm:text-left">{title}</h2>
          <Link href={link} className="flex justify-center sm:justify-end">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Store size={18} />
              Ver todos
            </Button>
          </Link>
        </div>
      </div>

      <div className={`container flex flex-col ${leftBanner ? 'lg:flex-row' : ''} gap-6 lg:gap-8 items-stretch`}>
        {/* Banner vertical à esquerda (quando leftBanner existe) */}
        {leftBanner && (
          <Link href={leftBanner.link} className="flex-shrink-0 order-2 lg:order-1">
            <div className="relative w-full lg:w-[280px] xl:w-[320px] aspect-[3/4] max-h-[480px] rounded-xl overflow-hidden group">
              <img
                src={leftBanner.image}
                alt={leftBanner.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#968567]/90 via-[#968567]/50 to-[#968567]/20"
                aria-hidden
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <span className="text-white/95 text-lg font-medium mb-1">{leftBanner.title}</span>
                <span className="text-2xl md:text-3xl font-bold text-white font-gumani mb-3">
                  {leftBanner.subtitle}
                </span>
                <span className="inline-flex items-center gap-1 text-white font-semibold group-hover:underline">
                  Conferir
                  <ChevronRight size={18} />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Área do carrossel */}
        <div
          className={`relative flex-1 min-w-0 ${leftBanner ? 'order-1 lg:order-2' : ''}`}
          onMouseEnter={pause}
          onMouseLeave={scheduleResumeAfterRelease}
          onPointerDown={pause}
          onPointerUp={scheduleResumeAfterRelease}
          onPointerCancel={scheduleResumeAfterRelease}
          onPointerLeave={(e) => { if (e.buttons === 0) scheduleResumeAfterRelease(); }}
          onClick={() => { pause(); scheduleResume(); }}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setCurrentIndex((i) => (i - 1 + products.length) % products.length); pause(); scheduleResume(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-foreground transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setCurrentIndex((i) => (i + 1) % products.length); pause(); scheduleResume(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-foreground transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight size={24} />
          </button>
          {leftBanner && (
            <>
              <div
                className="absolute left-0 top-0 bottom-0 w-12 md:w-20 z-10 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
                }}
              />
              <div
                className="absolute right-0 top-0 bottom-0 w-12 md:w-20 z-10 pointer-events-none"
                style={{
                  background: 'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
                }}
              />
            </>
          )}
          <div ref={containerRef} className="overflow-hidden">
            {leftBanner ? (
              <div className="px-4 md:px-6">{carouselInner}</div>
            ) : (
              carouselInner
            )}
          </div>
          {products.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-4">
              {products.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); pause(); scheduleResume(); }}
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-accent w-6' : 'bg-muted-foreground/40'}`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
