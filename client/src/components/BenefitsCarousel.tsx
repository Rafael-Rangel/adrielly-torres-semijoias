import { useEffect, useRef, useState, useCallback } from 'react';
import { Truck, Shield, Clock, Sparkles, Heart } from 'lucide-react';

const RESUME_DELAY_MS = 500;

const benefits = [
  { icon: Truck, text: 'Entrega feita até sua residência' },
  { icon: Shield, text: 'Garantia dos produtos' },
  { icon: Clock, text: 'Atendimento rápido' },
  { icon: Sparkles, text: 'Peças selecionadas' },
  { icon: Heart, text: 'Encomenda fácil' },
];

export default function BenefitsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const pause = useCallback(() => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = null;
  }, []);

  const resume = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = null;
    setIsPaused(false);
  }, []);

  const scheduleResumeAfterRelease = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(resume, RESUME_DELAY_MS);
  }, [resume]);

  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const PIXELS_PER_SECOND = 35;
    let lastTime: number | null = null;
    let cancelled = false;

    const scroll = (time: number) => {
      if (cancelled) return;
      if (lastTime != null && !isPaused) {
        const delta = (time - lastTime) / 1000;
        scrollPositionRef.current += PIXELS_PER_SECOND * delta;
        const half = carousel.scrollWidth / 2;
        if (scrollPositionRef.current >= half) scrollPositionRef.current = 0;
        carousel.scrollLeft = scrollPositionRef.current;
      }
      lastTime = time;
      rafIdRef.current = requestAnimationFrame(scroll);
    };

    rafIdRef.current = requestAnimationFrame(scroll);
    return () => {
      cancelled = true;
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    };
  }, [isPaused]);

  // Duplicar os benefícios para criar loop infinito
  const duplicatedBenefits = [...benefits, ...benefits];

  return (
    <div
      className="bg-secondary/30 py-4 sm:py-6 overflow-hidden relative"
      onMouseEnter={pause}
      onMouseLeave={scheduleResumeAfterRelease}
      onPointerDown={pause}
      onPointerUp={scheduleResumeAfterRelease}
      onPointerCancel={scheduleResumeAfterRelease}
      onPointerLeave={(e) => { if (e.buttons === 0) scheduleResumeAfterRelease(); }}
    >
      <div
        ref={carouselRef}
        className="flex gap-8 items-center"
        style={{
          width: '100%',
          overflowX: 'hidden',
        }}
      >
        {duplicatedBenefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0 px-4 sm:px-6"
              style={{ minWidth: 'fit-content' }}
            >
              <Icon className="text-accent flex-shrink-0" size={20} />
              <span className="text-foreground font-medium whitespace-nowrap text-sm sm:text-base">
                {benefit.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
