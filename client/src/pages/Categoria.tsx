import { useState, useEffect, useMemo } from 'react';
import { useRoute } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchProductsFromSheets, filterByCategory, filterByPriceRange, Product, type PriceFilterValue } from '@/lib/sheetsApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';
import CategoryBanner from '@/components/CategoryBanner';
import PriceFilter from '@/components/PriceFilter';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Link } from 'wouter';
import { toast } from 'sonner';
import { Search, Store } from 'lucide-react';

export default function Categoria() {
  const [, params] = useRoute('/categoria/:categoria');
  const categoriaParam = params?.categoria || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState<PriceFilterValue>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProducts();
  }, [categoriaParam]);

  const normalizeCategory = (cat: string): string => {
    // Normaliza a categoria para comparação
    if (!cat) return '';
    const normalized = cat.toLowerCase().trim();
    // Trata diferentes variações de promoções
    if (normalized === 'promoções' || normalized === 'promocoes' || normalized === 'promocao' || normalized === 'promoção') {
      return 'PROMOÇÕES';
    }
    // Para outras categorias, converte para maiúsculas
    return cat.toUpperCase().trim();
  };

  const normalizedCategory = normalizeCategory(categoriaParam);

  const filteredProducts = useMemo(() => {
    const byCategory = filterByCategory(products, normalizedCategory);
    const byPrice = filterByPriceRange(byCategory, priceFilter);
    if (!searchQuery.trim()) return byPrice;
    const q = searchQuery.trim().toLowerCase();
    return byPrice.filter(
      (p) =>
        p.nome.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        (p.descricao && p.descricao.toLowerCase().includes(q))
    );
  }, [products, normalizedCategory, priceFilter, searchQuery]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Delay para melhorar UX
      await new Promise(resolve => setTimeout(resolve, 800));
      const allProducts = await fetchProductsFromSheets();
      const filtered = filterByCategory(allProducts, normalizedCategory);
      setProducts(filtered);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container py-8">
        <CategoryBanner categoria={normalizedCategory} />

        {loading ? (
          <div className="text-center py-12">
            <LoadingSpinner size={48} className="mb-4" />
            <p className="text-muted-foreground">Carregando produtos...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Nenhum produto encontrado nesta categoria</p>
            <Link href="/loja">
              <Button className="mt-4 gap-2">
                <Store size={18} />
                Ver todos os produtos
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-4 space-y-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Pesquisar por nome, código..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 bg-secondary/50 border-border"
                  aria-label="Pesquisar produtos"
                />
              </div>
              <p className="text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </p>
              <PriceFilter value={priceFilter} onChange={setPriceFilter} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
