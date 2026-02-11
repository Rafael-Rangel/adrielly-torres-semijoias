import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/sheetsApi';
import { ChevronRight, ChevronLeft, Store } from 'lucide-react';

interface BannerConfig {
  image: string;
  title: string;
  subtitle: string;
  link: string;
  position: 'left' | 'right';
  /** Overlay em CSS (linear-gradient). Se não informado, usa o padrão. */
  overlayGradient?: string;
}

interface PromocoesCarouselProps {
  title: string;
  products: Product[];
  link: string;
  banner?: BannerConfig;
}

const SCROLL_SPEED = 0.35;
const CARD_WIDTH = 300;
const CARD_GAP = 24;
const NUDGE = CARD_WIDTH + CARD_GAP;
const RESUME_DELAY_MS = 500;

export default function PromocoesCarousel({ title, products, link, banner }: PromocoesCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
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

  const goPrev = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    pause();
    const halfWidth = track.scrollWidth / 2;
    positionRef.current -= NUDGE;
    if (positionRef.current < 0) positionRef.current += halfWidth;
    track.style.transform = `translate3d(${-positionRef.current}px,0,0)`;
    scheduleResume();
  }, [pause, scheduleResume]);

  const goNext = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    pause();
    const halfWidth = track.scrollWidth / 2;
    positionRef.current += NUDGE;
    if (positionRef.current >= halfWidth) positionRef.current = 0;
    track.style.transform = `translate3d(${-positionRef.current}px,0,0)`;
    scheduleResume();
  }, [pause, scheduleResume]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || products.length === 0) return;

    let rafId: number;

    const animate = () => {
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth <= 0) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      if (isPaused) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      positionRef.current += SCROLL_SPEED;
      if (positionRef.current >= halfWidth) positionRef.current = 0;
      track.style.transform = `translate3d(${-positionRef.current}px,0,0)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [products.length, isPaused]);

  if (products.length === 0) return null;

  const duplicated = [...products, ...products];

  const carouselBlock = (
    <div
      className="relative flex-1 min-w-0"
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
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-foreground transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-foreground transition-colors"
        aria-label="Próximo"
      >
        <ChevronRight size={24} />
      </button>
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
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 px-4 md:px-6 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {duplicated.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="flex-shrink-0 w-[280px] sm:w-[300px]"
            >
              <ProductCard product={product} index={0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const bannerBlock = banner ? (
    <Link href={banner.link} className="flex-shrink-0">
      <div className="relative w-full lg:w-[280px] xl:w-[320px] aspect-[3/4] max-h-[480px] rounded-xl overflow-hidden group">
        <img
          src={banner.image}
          alt={banner.subtitle}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#d4c4a8]/20" aria-hidden />
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background: banner.overlayGradient ?? 'linear-gradient(to right top, rgba(150, 133, 103, 0.85) 25%, rgba(150, 133, 103, 0.4) 35%, transparent 100%)',
          }}
          aria-hidden
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
          <span className="text-white/95 text-lg font-medium mb-1">{banner.title}</span>
          <span className="text-2xl md:text-3xl font-bold text-white font-gumani mb-3">
            {banner.subtitle}
          </span>
          <span className="inline-flex items-center gap-1 text-white font-semibold group-hover:underline">
            Conferir
            <ChevronRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  ) : null;

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-foreground">{title}</h2>
          <Link href={link}>
            <Button variant="outline" className="gap-2">
              <Store size={18} />
              Ver todos
            </Button>
          </Link>
        </div>
      </div>

      <div className="container flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
        {banner?.position === 'left' && bannerBlock}
        {carouselBlock}
        {banner?.position === 'right' && bannerBlock}
      </div>
    </section>
  );
}
