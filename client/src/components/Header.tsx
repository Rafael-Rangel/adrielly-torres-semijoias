import { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  Circle,
  Gem,
  Link2,
  CircleDot,
  Sparkles,
  Tag,
  type LucideIcon,
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useCart } from '@/contexts/CartContext';
import { CATEGORIAS } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import HeaderCountdown from './HeaderCountdown';

// Ícones Lucide (gratuitos, outline fino) para categorias
const CATEGORIA_ICONS: Record<string, LucideIcon> = {
  'ANÉIS': Circle,
  'BRINCOS': Gem,
  'COLARES': Link2,
  'PIERCINGS': CircleDot,
  'PINGENTES': Gem,
  'PULSEIRAS': Circle,
  'ACESSÓRIOS': Sparkles,
  'PROMOÇÕES': Tag,
};

const ICON_SIZE = 15;
const ICON_STROKE = 1.6;

const SCROLL_THRESHOLD = 80;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [spacerHeight, setSpacerHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const [location, setLocation] = useLocation();
  const { getItemCount } = useCart();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => setSpacerHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/loja?busca=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };


  return (
    <>
    <header ref={headerRef} className="bg-white border-b border-border fixed top-0 left-0 right-0 w-full z-50 shadow-sm transition-all duration-300">
      {/* Top Bar - Promoção */}
      <div className={`px-3 sm:px-4 transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2'}`} style={{ backgroundColor: '#968567' }}>
        <div className="container flex justify-center items-center min-w-0">
          <HeaderCountdown />
        </div>
      </div>

      {/* Main Header */}
      <div className={`container transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="flex justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="MUNRÁ semijoias" 
              className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-9 md:h-11' : 'h-12 md:h-16'}`}
            />
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <Input
              type="text"
              placeholder="Buscar produtos ou código..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-r-none"
            />
            <Button type="submit" size="icon" className="rounded-l-none">
              <Search size={18} />
            </Button>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6 items-center">
            <Link href="/" className="text-foreground hover:text-accent transition-colors font-medium">
              HOME
            </Link>
            <Link href="/loja" className="text-foreground hover:text-accent transition-colors font-medium">
              LOJA
            </Link>
            <Link href="/ajuda" className="text-foreground hover:text-accent transition-colors font-medium">
              AJUDA
            </Link>
            <Link href="/contato" className="text-foreground hover:text-accent transition-colors font-medium">
              CONTATO
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            {/* Search Button - Mobile */}
            <button
              onClick={() => setLocation('/loja')}
              className="md:hidden p-2 hover:bg-secondary rounded-md transition-colors"
            >
              <Search size={20} className="text-foreground" />
            </button>
            
            {/* Cart */}
            <Link href="/carrinho">
              <button className="p-2 hover:bg-secondary rounded-md transition-colors relative">
                <ShoppingCart size={20} className="text-foreground" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center font-bold">
                    {getItemCount() > 99 ? '99+' : getItemCount()}
                  </span>
                )}
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-secondary rounded-md transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className={`lg:hidden border-t border-border flex flex-col gap-2 transition-all duration-300 ${isScrolled ? 'mt-2 pb-2 pt-2' : 'mt-4 pb-4 pt-4'}`}>
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="py-2 text-foreground hover:text-accent transition-colors font-medium text-center sm:text-left">
              HOME
            </Link>
            <Link href="/loja" onClick={() => setIsMenuOpen(false)} className="py-2 text-foreground hover:text-accent transition-colors font-medium text-center sm:text-left">
              LOJA
            </Link>
            <Link href="/ajuda" onClick={() => setIsMenuOpen(false)} className="py-2 text-foreground hover:text-accent transition-colors font-medium text-center sm:text-left">
              AJUDA
            </Link>
            <Link href="/contato" onClick={() => setIsMenuOpen(false)} className="py-2 text-foreground hover:text-accent transition-colors font-medium text-center sm:text-left">
              CONTATO
            </Link>
          </nav>
        )}
      </div>

      {/* Categories Bar */}
      <div className="border-t border-border bg-secondary/50 transition-all duration-300">
        <div className={`container overflow-x-auto transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
          <div className="flex justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium whitespace-nowrap items-center min-w-max px-1">
            {CATEGORIAS.slice(0, 7).map((cat) => {
              const Icon = CATEGORIA_ICONS[cat];
              return (
                <Link
                  key={cat}
                  href={`/categoria/${cat.toLowerCase()}`}
                  className="flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
                >
                  {Icon && (
                    <Icon
                      size={ICON_SIZE}
                      strokeWidth={ICON_STROKE}
                      className="flex-shrink-0 opacity-80"
                      aria-hidden
                    />
                  )}
                  {cat}
                </Link>
              );
            })}
            <Link
              href="/categoria/promoções"
              className="flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors font-bold"
            >
              <Tag
                size={ICON_SIZE}
                strokeWidth={ICON_STROKE}
                className="flex-shrink-0 opacity-80"
                aria-hidden
              />
              PROMOÇÕES
            </Link>
          </div>
        </div>
      </div>
    </header>
    <div aria-hidden style={{ height: spacerHeight }} />
    </>
  );
}
