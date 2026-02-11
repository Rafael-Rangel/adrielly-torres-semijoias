import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchProductsFromSheets, filterByCategory, searchProducts, sortByPrice, filterByPriceRange, Product } from '@/lib/sheetsApi';
import { CATEGORIAS } from '@/lib/config';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from '@/components/ProductCard';
import PriceFilter from '@/components/PriceFilter';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from 'sonner';

export default function Loja() {
  const [location, setLocation] = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'popular'>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under50' | '50-100' | '100-200' | 'over200'>('all');
  const [promocaoOnly, setPromocaoOnly] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, selectedCategory, sortOrder, searchQuery, priceFilter, promocaoOnly]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const busca = params.get('busca');
    const categoria = params.get('categoria');
    
    if (busca) {
      setSearchQuery(busca);
    }
    if (categoria) {
      setSelectedCategory(categoria.toUpperCase());
    }
  }, [location]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Delay para melhorar UX
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = await fetchProductsFromSheets();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Filtro por categoria
    if (selectedCategory !== 'TODOS') {
      filtered = filterByCategory(filtered, selectedCategory);
    }

    // Filtro por busca
    if (searchQuery.trim()) {
      filtered = searchProducts(filtered, searchQuery);
    }

    // Filtro por preço
    filtered = filterByPriceRange(filtered, priceFilter);

    // Filtro só promoção
    if (promocaoOnly) {
      filtered = filtered.filter(p => p.promocao === true);
    }

    // Ordenação
    if (sortOrder === 'asc') {
      filtered = sortByPrice(filtered, 'asc');
    } else if (sortOrder === 'desc') {
      filtered = sortByPrice(filtered, 'desc');
    }

    setFilteredProducts(filtered);
  };


  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Loja</h1>
          <p className="text-muted-foreground">Encontre as joias perfeitas para você</p>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-secondary/50 rounded-lg p-4 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Busca */}
            <div className="md:col-span-2">
              <Input
                type="text"
                placeholder="Buscar por nome ou código..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categoria */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODOS">Todas as categorias</SelectItem>
                {CATEGORIAS.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Ordenação */}
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Mais vendidos</SelectItem>
                <SelectItem value="asc">Menor preço</SelectItem>
                <SelectItem value="desc">Maior preço</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtro de Preço + Promoção */}
          <PriceFilter
            value={priceFilter}
            onChange={setPriceFilter}
            showPromoOption
            promocaoOnly={promocaoOnly}
            onPromocaoOnlyChange={setPromocaoOnly}
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <LoadingSpinner size={48} className="mb-4" />
            <p className="text-muted-foreground">Carregando produtos...</p>
          </div>
        )}

        {/* Produtos */}
        {!loading && (
          <>
            <div className="mb-4">
              <p className="text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Nenhum produto encontrado</p>
                <p className="text-muted-foreground text-sm mt-2">Tente ajustar os filtros</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
