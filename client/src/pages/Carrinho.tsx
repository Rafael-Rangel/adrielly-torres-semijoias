import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShoppingCart } from 'lucide-react';
import { fetchProductsFromSheets } from '@/lib/sheetsApi';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Product {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  imagem: string;
  descricao: string;
  disponivel: boolean;
}

export default function Carrinho() {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart, addToCart } = useCart();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadRelatedProducts();
  }, []);

  const loadRelatedProducts = async () => {
    try {
      // Delay para melhorar UX
      await new Promise(resolve => setTimeout(resolve, 500));
      const products = await fetchProductsFromSheets();
      // Produtos mais baratos (até 5)
      const sorted = [...products].sort((a, b) => a.preco - b.preco);
      const related = sorted
        .filter(p => !items.some(item => item.id === p.id))
        .slice(0, 4);
      setRelatedProducts(related);
    } catch (error) {
      console.error('Erro ao carregar produtos relacionados:', error);
    }
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 container py-8">
          <div className="text-center py-12">
            <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-6">Adicione produtos para começar suas compras</p>
            <Link href="/loja">
              <Button size="lg">Continuar Comprando</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const total = getTotal();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Carrinho de Compras</h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Lista de Produtos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-4 flex gap-4"
              >
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">{item.nome}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.descricao}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={item.quantidade <= 1}
                        onClick={() => handleQuantityChange(item.id, item.quantidade - 1)}
                        className={item.quantidade <= 1 ? 'opacity-50 cursor-not-allowed bg-muted/50 border-muted' : ''}
                      >
                        <Minus size={16} />
                      </Button>
                      <Input
                        type="number"
                        min={1}
                        value={item.quantidade}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          handleQuantityChange(item.id, isNaN(val) || val < 1 ? 1 : val);
                        }}
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, item.quantidade + 1)}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-accent">
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        R$ {item.preco.toFixed(2)} cada
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    removeFromCart(item.id);
                    toast.success('Produto removido do carrinho');
                  }}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={20} />
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-secondary/50 rounded-lg p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.nome} x{item.quantidade}
                    </span>
                    <span className="font-medium">
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Subtotal:</span>
                  <span className="text-lg font-bold text-accent">R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total:</span>
                  <span className="text-2xl font-bold text-accent">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full mb-4 gap-2" size="lg">
                  Finalizar Compra
                  <ArrowRight size={20} />
                </Button>
              </Link>

              <Link href="/loja">
                <Button variant="outline" className="w-full">
                  Continuar Comprando
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Leve também - fora da coluna sticky, em horizontal */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="font-bold text-foreground mb-4">Leve também</h3>
            <div className="flex flex-wrap gap-4">
              {relatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  className="flex-shrink-0 flex flex-col bg-white rounded-lg border border-border overflow-hidden min-w-[160px] sm:min-w-[220px]"
                >
                  <Link href={`/produto/${product.id}`} className="flex flex-col sm:flex-row items-center gap-2 hover:bg-secondary/30 p-3 transition-colors">
                    <img
                      src={product.imagem}
                      alt={product.nome}
                      className="w-16 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="text-center sm:text-left min-w-0 flex-1">
                      <p className="font-medium text-sm line-clamp-2">{product.nome}</p>
                      <p className="text-accent font-bold">R$ {product.preco.toFixed(2)}</p>
                    </div>
                  </Link>
                  <div className="p-2 border-t border-border">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full gap-1.5 text-xs"
                      onClick={() => {
                        addToCart({
                          id: product.id,
                          nome: product.nome,
                          categoria: product.categoria,
                          preco: product.preco,
                          imagem: product.imagem,
                          descricao: product.descricao,
                          codigo: product.id,
                        }, 1);
                        toast.success('Adicionado ao carrinho');
                      }}
                    >
                      <ShoppingCart size={16} />
                      Adicionar ao Carrinho
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}
