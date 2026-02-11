import { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchProductsFromSheets, Product } from '@/lib/sheetsApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Heart, Shield, Truck, CreditCard, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import WhatsAppButton from '@/components/WhatsAppButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import { motion } from 'framer-motion';

export default function Produto() {
  const [, params] = useRoute('/produto/:id');
  const productId = params?.id || '';
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      // Delay para melhorar UX
      await new Promise(resolve => setTimeout(resolve, 600));
      const products = await fetchProductsFromSheets();
      const found = products.find(p => p.id === productId);
      
      if (found) {
        setProduct(found);
        // Produtos relacionados (mesma categoria, excluindo o atual)
        const related = products
          .filter(p => p.categoria === found.categoria && p.id !== found.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
      toast.error('Produto não encontrado');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      nome: product.nome,
      categoria: product.categoria,
      preco: product.preco,
      imagem: product.imagem,
      descricao: product.descricao,
      codigo: product.id
    }, quantity);
    
    toast.success(`${quantity} ${product.nome} adicionado${quantity > 1 ? 's' : ''} ao carrinho!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 container py-8">
          <div className="text-center py-12">
            <LoadingSpinner size={48} className="mb-4" />
            <p className="text-muted-foreground">Carregando produto...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 container py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Produto não encontrado</p>
            <Link href="/loja">
              <Button className="mt-4">Voltar para a loja</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Criar array de imagens (por enquanto usando a mesma imagem)
  const images = [product.imagem, product.imagem, product.imagem];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container py-8">
        <Link href="/loja">
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeft size={16} />
            Voltar para a loja
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Galeria de Imagens */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden">
                      <img
                        src={img}
                        alt={`${product.nome} - Imagem ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>

          {/* Informações do Produto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{product.nome}</h1>
              <p className="text-muted-foreground mb-2">Código: {product.id}</p>
              <p className="text-2xl font-bold text-accent mb-4">R$ {product.preco.toFixed(2)}</p>
              <p className="text-foreground">{product.descricao}</p>
            </div>

            {!product.disponivel && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-semibold">Produto esgotado</p>
              </div>
            )}

            {/* Quantidade */}
            {product.disponivel && (
              <div className="flex items-center gap-4">
                <label className="font-medium">Quantidade:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            )}

            {/* Botões */}
            {product.disponivel && (
              <div className="flex gap-4 flex-wrap">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 min-w-[200px] gap-2 h-12 text-base"
                  size="lg"
                >
                  <ShoppingCart size={20} />
                  Adicionar ao Carrinho
                </Button>
                <WhatsAppButton
                  preset="produto"
                  productName={product?.nome}
                  className="flex-1 min-w-[200px] h-12 justify-center"
                  size="lg"
                >
                  Comprar pelo WhatsApp
                </WhatsAppButton>
              </div>
            )}

            {/* Bloco de Confiança */}
            <div className="bg-secondary/50 rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="text-accent mt-1" size={24} />
                <div>
                  <h3 className="font-semibold mb-1">Garantia dos Produtos</h3>
                  <p className="text-sm text-muted-foreground">
                    Todos os produtos têm garantia de qualidade
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="text-accent mt-1" size={24} />
                <div>
                  <h3 className="font-semibold mb-1">Entrega</h3>
                  <p className="text-sm text-muted-foreground">
                    Entrega feita até sua residência
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="text-accent mt-1" size={24} />
                <div>
                  <h3 className="font-semibold mb-1">Formas de Pagamento</h3>
                  <p className="text-sm text-muted-foreground">
                    Cartão de crédito, débito, Pix e dinheiro
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Leve também */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Leve também</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related, index) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/produto/${related.id}`} className="block group">
                    <div className="relative overflow-hidden bg-secondary h-48">
                      <img
                        src={related.imagem}
                        alt={related.nome}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 pb-2">
                      <h3 className="font-bold text-foreground mb-1 line-clamp-2">{related.nome}</h3>
                      <p className="text-lg font-bold text-accent">R$ {related.preco.toFixed(2)}</p>
                    </div>
                  </Link>
                  <div className="p-4 pt-0">
                    <Button
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => {
                        addToCart({
                          id: related.id,
                          nome: related.nome,
                          categoria: related.categoria,
                          preco: related.preco,
                          imagem: related.imagem,
                          descricao: related.descricao,
                          codigo: related.id,
                        }, 1);
                        toast.success('Adicionado ao carrinho');
                      }}
                    >
                      <ShoppingCart size={18} />
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
