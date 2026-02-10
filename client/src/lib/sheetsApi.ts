/**
 * Google Sheets Integration
 * 
 * Este arquivo fornece funções para integrar com Google Sheets.
 * Para usar, você precisa:
 * 
 * 1. Criar uma planilha no Google Sheets com as colunas:
 *    - ID (único)
 *    - Nome (do produto)
 *    - Categoria (ANÉIS, BRINCOS, etc)
 *    - Preço (número)
 *    - Imagem (URL)
 *    - Descrição
 *    - Disponível (SIM/NÃO)
 * 
 * 2. Publicar a planilha como CSV
 * 3. Usar a URL do CSV neste arquivo
 * 
 * Exemplo de URL:
 * https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={SHEET_GID}
 */

interface Product {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  imagem: string;
  descricao: string;
  disponivel: boolean;
}

// Substitua com a URL da sua planilha
const SHEETS_URL = 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0';

/**
 * Busca produtos do Google Sheets
 */
export async function fetchProductsFromSheets(): Promise<Product[]> {
  try {
    // Se você não tiver configurado o Google Sheets, retorna dados mock
    // Descomente o código abaixo quando tiver a URL real
    
    /*
    const response = await fetch(SHEETS_URL);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados do Google Sheets');
    }
    
    const csv = await response.text();
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    
    const products: Product[] = lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(',');
        return {
          id: values[0]?.trim() || '',
          nome: values[1]?.trim() || '',
          categoria: values[2]?.trim() || '',
          preco: parseFloat(values[3]?.trim() || '0'),
          imagem: values[4]?.trim() || '',
          descricao: values[5]?.trim() || '',
          disponivel: values[6]?.trim().toUpperCase() === 'SIM'
        };
      });
    
    return products;
    */
    
    // Retorna dados mock por enquanto
    return getMockProducts();
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return getMockProducts();
  }
}

/**
 * Dados mock para demonstração
 */
function getMockProducts(): Product[] {
  return [
    {
      id: '1',
      nome: 'Anel Dourado Clássico',
      categoria: 'ANÉIS',
      preco: 89.90,
      imagem: 'https://via.placeholder.com/300x300?text=Anel+Dourado',
      descricao: 'Anel elegante em ouro com acabamento sofisticado',
      disponivel: true
    },
    {
      id: '2',
      nome: 'Brinco Gota Cristal',
      categoria: 'BRINCOS',
      preco: 79.90,
      imagem: 'https://via.placeholder.com/300x300?text=Brinco+Gota',
      descricao: 'Brinco com cristal brilhante e acabamento delicado',
      disponivel: true
    },
    {
      id: '3',
      nome: 'Colar Malha Fina',
      categoria: 'COLARES',
      preco: 129.90,
      imagem: 'https://via.placeholder.com/300x300?text=Colar+Malha',
      descricao: 'Colar com malha fina e acabamento em ouro',
      disponivel: false
    },
    {
      id: '4',
      nome: 'Pulseira Elos Dourados',
      categoria: 'PULSEIRAS',
      preco: 99.90,
      imagem: 'https://via.placeholder.com/300x300?text=Pulseira+Elos',
      descricao: 'Pulseira com elos dourados e design elegante',
      disponivel: true
    }
  ];
}

/**
 * Filtra produtos por categoria
 */
export function filterByCategory(products: Product[], category: string): Product[] {
  if (category === 'TODOS') {
    return products;
  }
  return products.filter(p => p.categoria === category);
}

/**
 * Ordena produtos por preço
 */
export function sortByPrice(products: Product[], order: 'asc' | 'desc' = 'asc'): Product[] {
  return [...products].sort((a, b) => {
    return order === 'asc' ? a.preco - b.preco : b.preco - a.preco;
  });
}

/**
 * Busca produtos por termo
 */
export function searchProducts(products: Product[], term: string): Product[] {
  const lowerTerm = term.toLowerCase();
  return products.filter(p =>
    p.nome.toLowerCase().includes(lowerTerm) ||
    p.descricao.toLowerCase().includes(lowerTerm) ||
    p.categoria.toLowerCase().includes(lowerTerm)
  );
}
