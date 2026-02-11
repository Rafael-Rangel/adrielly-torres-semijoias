import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { BadgePercent, Tag } from 'lucide-react';
import { PROMOCAO_END_DATE } from '@/lib/promocao';

export default function HeaderCountdown() {
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
    <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap px-1" style={{ color: '#ffffff' }}>
      <span className="text-xs sm:text-sm font-semibold whitespace-nowrap flex items-center gap-1.5" style={{ color: '#ffffff' }}>
        <BadgePercent size={18} className="flex-shrink-0 sm:w-[22px] sm:h-[22px]" strokeWidth={2} style={{ color: '#ffffff' }} aria-hidden />
        PROMOÇÃO:
      </span>
      <div className="flex items-center gap-1">
        <span className="text-xs sm:text-sm font-bold px-1.5 sm:px-2 py-1 rounded min-w-[24px] sm:min-w-[28px] text-center" style={{ backgroundColor: '#ffffff', color: '#968567' }}>
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-xs sm:text-sm" style={{ color: '#ffffff' }}>:</span>
        <span className="text-xs sm:text-sm font-bold px-1.5 sm:px-2 py-1 rounded min-w-[24px] sm:min-w-[28px] text-center" style={{ backgroundColor: '#ffffff', color: '#968567' }}>
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-xs sm:text-sm" style={{ color: '#ffffff' }}>:</span>
        <span className="text-xs sm:text-sm font-bold px-1.5 sm:px-2 py-1 rounded min-w-[24px] sm:min-w-[28px] text-center" style={{ backgroundColor: '#ffffff', color: '#968567' }}>
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
      <Link href="/categoria/promoções">
        <button
          className="text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded transition-colors whitespace-nowrap inline-flex items-center gap-1.5 sm:gap-2"
          style={{ backgroundColor: 'transparent', color: '#ffffff', border: '2px solid #ffffff' }}
        >
          <Tag size={19} className="flex-shrink-0" strokeWidth={2} aria-hidden />
          VER PROMOÇÕES
        </button>
      </Link>
    </div>
  );
}
