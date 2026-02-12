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

export interface Product {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  imagem: string;
  descricao: string;
  disponivel: boolean;
  promocao?: boolean;
}

// URL da planilha do Google Sheets
const SHEETS_BASE_URL = 'https://docs.google.com/spreadsheets/d/1OwvhupSDFUSclQFVyWW6VVB6kPldAxkBhQK3m6BKuJk/export?format=csv&gid=0';

/**
 * Busca produtos do Google Sheets
 */
/**
 * Parse CSV linha por linha, lidando com vírgulas dentro de valores entre aspas
 */
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Aspas duplas escapadas
        current += '"';
        i++; // Pula o próximo caractere
      } else {
        // Toggle aspas
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Vírgula fora de aspas = separador
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Adiciona o último valor
  values.push(current.trim());
  
  return values;
}

export async function fetchProductsFromSheets(): Promise<Product[]> {
  try {
    // Adiciona timestamp para evitar cache
    const urlWithTimestamp = `${SHEETS_BASE_URL}&t=${Date.now()}`;
    const response = await fetch(urlWithTimestamp);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados do Google Sheets');
    }
    
    const csv = await response.text();
    const lines = csv.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      console.warn('Planilha vazia ou sem dados');
      return getMockProducts();
    }
    
    // Pula a linha de cabeçalho e processa os dados
    const products: Product[] = lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = parseCSVLine(line);
        
        // Garante que temos pelo menos 7 colunas (8 se tiver PROMO)
        const id = values[0]?.trim() || '';
        const nome = values[1]?.trim() || '';
        const categoria = values[2]?.trim() || '';
        const precoStr = values[3]?.trim() || '0';
        const imagem = values[4]?.trim() || '';
        const descricao = values[5]?.trim() || '';
        const disponivel = values[6]?.trim().toUpperCase() === 'SIM';
        // PROMO é opcional (coluna 7), se não existir, assume FALSE
        const promocaoStr = values[7]?.trim() || 'FALSE';
        
        // Remove aspas das strings se existirem
        const cleanNome = nome.replace(/^"|"$/g, '');
        const cleanCategoria = categoria.replace(/^"|"$/g, '');
        const cleanImagem = imagem.replace(/^"|"$/g, '');
        const cleanDescricao = descricao.replace(/^"|"$/g, '');
        
        // Converte preço (remove espaços e converte vírgula para ponto se necessário)
        const preco = parseFloat(precoStr.replace(',', '.').replace(/\s/g, ''));
        
        // Converte PROMO (TRUE/FALSE ou SIM/NÃO)
        const promocao = promocaoStr.toUpperCase() === 'TRUE' || 
                         promocaoStr.toUpperCase() === 'SIM' || 
                         promocaoStr.toUpperCase() === 'VERDADEIRO';
        
        return {
          id,
          nome: cleanNome,
          categoria: cleanCategoria,
          preco: isNaN(preco) ? 0 : preco,
          imagem: cleanImagem,
          descricao: cleanDescricao,
          disponivel,
          promocao
        };
      })
      .filter(product => product.id && product.nome); // Remove linhas vazias
    
    if (products.length === 0) {
      console.warn('Nenhum produto válido encontrado na planilha');
      return getMockProducts();
    }
    
    return products;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return getMockProducts();
  }
}

import { mockProducts } from './mockProducts';

/**
 * Dados mock para demonstração
 */
function getMockProducts(): Product[] {
  return [...mockProducts];
}

/**
 * Normaliza categoria para comparação (remove acentos e converte para maiúsculas)
 */
function normalizeCategoryForComparison(cat: string): string {
  if (!cat) return '';
  const normalized = cat.toUpperCase().trim();
  // Tratamento especial para promoções
  if (normalized.includes('PROMO')) {
    return 'PROMOÇÕES';
  }
  return normalized;
}

/**
 * Filtra produtos por categoria
 */
export function filterByCategory(products: Product[], category: string): Product[] {
  if (!category || category === 'TODOS') {
    return products;
  }
  
  // Tratamento especial para promoções
  const normalizedCategory = normalizeCategoryForComparison(category);
  if (normalizedCategory === 'PROMOÇÕES') {
    return products.filter(p => p.promocao === true);
  }
  
  return products.filter(p => {
    const productCategory = normalizeCategoryForComparison(p.categoria);
    return productCategory === normalizedCategory;
  });
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

export type PriceFilterValue = 'all' | 'under50' | '50-100' | '100-200' | 'over200';

/**
 * Filtra produtos por faixa de preço
 */
export function filterByPriceRange(products: Product[], priceFilter: PriceFilterValue): Product[] {
  if (priceFilter === 'all') return products;
  if (priceFilter === 'under50') return products.filter(p => p.preco < 50);
  if (priceFilter === '50-100') return products.filter(p => p.preco >= 50 && p.preco <= 100);
  if (priceFilter === '100-200') return products.filter(p => p.preco >= 100 && p.preco <= 200);
  if (priceFilter === 'over200') return products.filter(p => p.preco > 200);
  return products;
}
