import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Tag } from 'lucide-react';
import { PROMOCAO_END_DATE } from '@/lib/promocao';

interface CountdownTimerProps {
  title?: string;
  description?: string;
}

export default function CountdownTimer({ 
  title = 'Promoção Especial',
  description = 'Aproveite enquanto dura! Produtos selecionados com condições especiais.'
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = PROMOCAO_END_DATE.getTime();
      const difference = end - now;

      if (difference <= 0) {
        setExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setExpired(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (expired) {
    return null;
  }

  return (
    <section className="relative w-full py-14 md:py-20 mb-12 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/background_promocao2.jpg)' }}
      />
      {/* Overlay: gradiente diagonal bege escuro → bege transparente */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right bottom, rgb(120 100 75 / 63%) 0%, rgb(132 115 89 / 87%) 40%, rgb(196 171 128 / 60%) 70%, rgb(152 129 101) 100%)',
        }}
      />
      {/* Conteúdo */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 font-gumani drop-shadow-sm tracking-wide">
            {title}
          </h2>
          <p className="text-white/90 text-base md:text-lg max-w-xl mx-auto">
            {description}
          </p>
        </div>

        <div className="flex justify-center gap-3 md:gap-5 mb-8 flex-wrap">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-lg text-center min-w-[76px] md:min-w-[88px] border border-white/30">
            <div className="text-2xl md:text-3xl font-bold text-[#968567] tabular-nums">{String(timeLeft.days).padStart(2, '0')}</div>
            <div className="text-xs text-[#6b5d52] font-medium mt-1 uppercase tracking-wider">Dias</div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-lg text-center min-w-[76px] md:min-w-[88px] border border-white/30">
            <div className="text-2xl md:text-3xl font-bold text-[#968567] tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-xs text-[#6b5d52] font-medium mt-1 uppercase tracking-wider">Horas</div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-lg text-center min-w-[76px] md:min-w-[88px] border border-white/30">
            <div className="text-2xl md:text-3xl font-bold text-[#968567] tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-xs text-[#6b5d52] font-medium mt-1 uppercase tracking-wider">Min</div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-lg text-center min-w-[76px] md:min-w-[88px] border border-white/30">
            <div className="text-2xl md:text-3xl font-bold text-[#968567] tabular-nums">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-xs text-[#6b5d52] font-medium mt-1 uppercase tracking-wider">Seg</div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/categoria/promoções">
            <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:opacity-95 border-2 border-white/40 shadow-lg">
              <Tag size={20} className="flex-shrink-0" />
              Ver Promoções
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
