import { useState, useEffect } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

interface Product {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  imagem: string;
  descricao: string;
  disponivel: boolean;
}

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    'TODOS',
    'ANÉIS',
    'BRINCOS',
    'COLARES',
    'PIERCINGS',
    'PINGENTES',
    'PULSEIRAS',
    'ACESSÓRIOS'
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Replace with your Google Sheets API endpoint
      // For now, using mock data
      const mockProducts: Product[] = [
        {
          id: '1',
          nome: 'Anel Dourado Clássico',
          categoria: 'ANÉIS',
          preco: 89.90,
          imagem: 'https://private-us-east-1.manuscdn.com/sessionFile/9uLoVLJ5UJWwXCBFqHLr2F/sandbox/XF9vVEPeZ3bQ4FJ6W3bHXP-img-2_1770739746000_na1fn_Y29sbGVjdGlvbi1zaG93Y2FzZQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOXVMb1ZMSjVVSld3WENCRnFITHIyRi9zYW5kYm94L1hGOXZWRVBlWjNiUTRGSjZXM2JIWFAtaW1nLTJfMTc3MDczOTc0NjAwMF9uYTFmbl9ZMjlzYkdWamRHbHZiaTF6YUc5M1kyRnpaUS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=NG6PwcfjQy60eVAMC2R60xG7mZUbAXFYOvVqRwP7cCPGIxwfvKC2HKWldfTn8FH9S3YSvc9UNUzLUusjwOQXxl8W3eohJtkuBMW5OXhPqBagRGlPZJPDpRXtmWPME3sDJrEnurVYvBlaJi3olFojBkqT1nfqYCvQ1hiJKD~AkUCnXRUd4gevX-gPI-tgZSorYaocnBU9T38KBQuyjR2PepREomDmq2TXBxtATjqe0bUQtHj8DPaeDIPghrpEFwj3ip03RCuWdp2vMU1sZTC1jCTZF4pIjAEHZR94SxOdbh9Sp~TFoUhSnra0zxA05lS64JLG5jzrHJ7cGLsm5fjGPA__',
          descricao: 'Anel elegante em ouro com acabamento sofisticado',
          disponivel: true
        },
        {
          id: '2',
          nome: 'Brinco Gota Cristal',
          categoria: 'BRINCOS',
          preco: 79.90,
          imagem: 'https://private-us-east-1.manuscdn.com/sessionFile/9uLoVLJ5UJWwXCBFqHLr2F/sandbox/XF9vVEPeZ3bQ4FJ6W3bHXP-img-4_1770739747000_na1fn_cHJvZHVjdC1kZXRhaWwtYmc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOXVMb1ZMSjVVSld3WENCRnFITHIyRi9zYW5kYm94L1hGOXZWRVBlWjNiUTRGSjZXM2JIWFAtaW1nLTRfMTc3MDczOTc0NzAwMF9uYTFmbl9jSEp2WkhWamRDMWtaWFJoYVd3dFltYy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=DFltv3BBqd55o2Sr3r4yoKCPVDq2Eg0a6lVWAyZFQIlHcsMFc1hA5a~MXJLyd5SGRYUF36RwWH9Egh8sadUtnoJPWktBeY~wdOVqULZHm1kRHG2VjR-LERvs44DcuLhIrXVUVBrhqvJZQzcn1lto3X-wgomyOKqPGi2rVEUkaj2alAv4PoKG--CGdqDuxWQ4HCd-4Ax~aNkm7jzpifGlN1svxP1dceICaYWwv8TbkVYSslGLmmLGv3yTTqL93eNRkaKG4vTzo~I6CNRRXSu9WtxkqJKQscb0ujmh~D3BoW8asSNOwfM6z5jdgedFVq~mQO3fvvUZydFaglOHDFF2NQ__',
          descricao: 'Brinco com cristal brilhante e acabamento delicado',
          disponivel: true
        },
        {
          id: '3',
          nome: 'Colar Malha Fina',
          categoria: 'COLARES',
          preco: 129.90,
          imagem: 'https://private-us-east-1.manuscdn.com/sessionFile/9uLoVLJ5UJWwXCBFqHLr2F/sandbox/XF9vVEPeZ3bQ4FJ6W3bHXP-img-2_1770739746000_na1fn_Y29sbGVjdGlvbi1zaG93Y2FzZQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOXVMb1ZMSjVVSld3WENCRnFITHIyRi9zYW5kYm94L1hGOXZWRVBlWjNiUTRGSjZXM2JIWFAtaW1nLTJfMTc3MDczOTc0NjAwMF9uYTFmbl9ZMjlzYkdWamRHbHZiaTF6YUc5M1kyRnpaUS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=NG6PwcfjQy60eVAMC2R60xG7mZUbAXFYOvVqRwP7cCPGIxwfvKC2HKWldfTn8FH9S3YSvc9UNUzLUusjwOQXxl8W3eohJtkuBMW5OXhPqBagRGlPZJPDpRXtmWPME3sDJrEnurVYvBlaJi3olFojBkqT1nfqYCvQ1hiJKD~AkUCnXRUd4gevX-gPI-tgZSorYaocnBU9T38KBQuyjR2PepREomDmq2TXBxtATjqe0bUQtHj8DPaeDIPghrpEFwj3ip03RCuWdp2vMU1sZTC1jCTZF4pIjAEHZR94SxOdbh9Sp~TFoUhSnra0zxA05lS64JLG5jzrHJ7cGLsm5fjGPA__',
          descricao: 'Colar com malha fina e acabamento em ouro',
          disponivel: false
        },
        {
          id: '4',
          nome: 'Pulseira Elos Dourados',
          categoria: 'PULSEIRAS',
          preco: 99.90,
          imagem: 'https://private-us-east-1.manuscdn.com/sessionFile/9uLoVLJ5UJWwXCBFqHLr2F/sandbox/XF9vVEPeZ3bQ4FJ6W3bHXP-img-2_1770739746000_na1fn_Y29sbGVjdGlvbi1zaG93Y2FzZQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOXVMb1ZMSjVVSld3WENCRnFITHIyRi9zYW5kYm94L1hGOXZWRVBlWjNiUTRGSjZXM2JIWFAtaW1nLTJfMTc3MDczOTc0NjAwMF9uYTFmbl9ZMjlzYkdWamRHbHZiaTF6YUc5M1kyRnpaUS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=NG6PwcfjQy60eVAMC2R60xG7mZUbAXFYOvVqRwP7cCPGIxwfvKC2HKWldfTn8FH9S3YSvc9UNUzLUusjwOQXxl8W3eohJtkuBMW5OXhPqBagRGlPZJPDpRXtmWPME3sDJrEnurVYvBlaJi3olFojBkqT1nfqYCvQ1hiJKD~AkUCnXRUd4gevX-gPI-tgZSorYaocnBU9T38KBQuyjR2PepREomDmq2TXBxtATjqe0bUQtHj8DPaeDIPghrpEFwj3ip03RCuWdp2vMU1sZTC1jCTZF4pIjAEHZR94SxOdbh9Sp~TFoUhSnra0zxA05lS64JLG5jzrHJ7cGLsm5fjGPA__',
          descricao: 'Pulseira com elos dourados e design elegante',
          disponivel: true
        }
      ];
      setProducts(mockProducts);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'TODOS'
    ? products
    : products.filter(p => p.categoria === selectedCategory);

  return (
    <section id="produtos" className="py-16 bg-background">
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Nossa Coleção</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore nossa seleção exclusiva de semijoias. Cada peça é escolhida com cuidado para garantir qualidade e beleza.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-12 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-foreground hover:bg-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando produtos...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card group">
                {/* Image Container */}
                <div className="relative overflow-hidden bg-secondary h-64">
                  <img
                    src={product.imagem}
                    alt={product.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!product.disponivel && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">ESGOTADO</span>
                    </div>
                  )}
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100">
                    <Heart size={18} className="text-accent" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-2 line-clamp-2">
                    {product.nome}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.descricao}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-accent">
                      R$ {product.preco.toFixed(2)}
                    </span>
                    <button
                      disabled={!product.disponivel}
                      className={`p-2 rounded-md transition-colors ${
                        product.disponivel
                          ? 'bg-accent text-white hover:bg-opacity-90'
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
