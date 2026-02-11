import { Link } from 'wouter';
import { ShoppingCart, BadgePercent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { Product } from '@/lib/sheetsApi';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const isPromocao = product.promocao === true;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      nome: product.nome,
      categoria: product.categoria,
      preco: product.preco,
      imagem: product.imagem,
      descricao: product.descricao,
      codigo: product.id
    });
    toast.success(`${product.nome} adicionado ao carrinho!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }}
      whileHover={{ y: -5 }}
      className="product-card group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link href={`/produto/${product.id}`}>
        <div className="relative overflow-hidden bg-secondary h-48 sm:h-56 md:h-64 cursor-pointer">
          <img
            src={product.imagem}
            alt={product.nome}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Selo de Promoção */}
          {isPromocao && (
            <div className="absolute top-2 left-2 bg-amber-100 text-amber-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg z-10 flex items-center gap-1.5 border border-amber-200">
              <BadgePercent size={22} className="flex-shrink-0" />
              PROMOÇÃO
            </div>
          )}
          {!product.disponivel && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">ESGOTADO</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-3 sm:p-4">
        <Link href={`/produto/${product.id}`}>
          <h3 className="font-bold text-foreground mb-1 line-clamp-2 hover:text-accent cursor-pointer text-sm sm:text-base">
            {product.nome}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">{product.descricao}</p>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex flex-col">
            {isPromocao && (
              <span className="text-xs text-muted-foreground line-through">
                R$ {(product.preco * 1.3).toFixed(2)}
              </span>
            )}
            <span className={`text-base sm:text-lg font-bold ${isPromocao ? 'text-red-600' : 'text-accent'}`}>
              R$ {product.preco.toFixed(2)}
            </span>
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.disponivel}
            className="gap-2 w-full sm:w-auto"
          >
            <ShoppingCart size={16} />
            Adicionar
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
