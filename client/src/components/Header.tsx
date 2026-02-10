import { useState } from 'react';
import { Menu, X, ShoppingCart, Heart } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    'ANÉIS',
    'BRINCOS',
    'COLARES',
    'PIERCINGS',
    'PINGENTES',
    'PULSEIRAS',
    'ACESSÓRIOS'
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-black text-white py-2 px-4">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex gap-4">
            <a href="https://wa.me/5511999999999" className="hover:text-accent transition-colors">
              COMPRE PELO WHATSAPP
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              SEJA UMA REVENDEDORA
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-accent">ADRIELLY TORRES</h1>
            <p className="text-xs text-muted-foreground">Revendedora Munra Semijoias</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8 items-center">
            <a href="#" className="text-foreground hover:text-accent transition-colors font-medium">
              HOME
            </a>
            <a href="#produtos" className="text-foreground hover:text-accent transition-colors font-medium">
              PRODUTOS
            </a>
            <a href="#sobre" className="text-foreground hover:text-accent transition-colors font-medium">
              SOBRE
            </a>
            <a href="#contato" className="text-foreground hover:text-accent transition-colors font-medium">
              CONTATO
            </a>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-secondary rounded-md transition-colors">
              <Heart size={20} className="text-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-md transition-colors relative">
              <ShoppingCart size={20} className="text-foreground" />
              <span className="absolute top-1 right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
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
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4 flex flex-col gap-3">
            <a href="#" className="text-foreground hover:text-accent transition-colors font-medium">
              HOME
            </a>
            <a href="#produtos" className="text-foreground hover:text-accent transition-colors font-medium">
              PRODUTOS
            </a>
            <a href="#sobre" className="text-foreground hover:text-accent transition-colors font-medium">
              SOBRE
            </a>
            <a href="#contato" className="text-foreground hover:text-accent transition-colors font-medium">
              CONTATO
            </a>
          </nav>
        )}
      </div>

      {/* Categories Bar */}
      <div className="border-t border-border bg-secondary">
        <div className="container py-3 overflow-x-auto">
          <div className="flex gap-6 text-sm font-medium whitespace-nowrap">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`#${cat.toLowerCase()}`}
                className="text-foreground hover:text-accent transition-colors"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
