# Guia de Integração com Google Sheets

## Objetivo

Este guia explica como conectar seu site ao Google Sheets para gerenciar o catálogo de produtos dinamicamente. Assim, você pode atualizar produtos, preços e disponibilidade diretamente na planilha, sem precisar editar código.

## Passo 1: Criar a Planilha no Google Sheets

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha chamada "Produtos Adrielly Torres"
3. Configure as colunas conforme abaixo:

| ID | Nome | Categoria | Preço | Imagem | Descrição | Disponível |
|----|------|-----------|-------|--------|-----------|------------|
| 1 | Anel Dourado Clássico | ANÉIS | 89.90 | [URL da imagem] | Anel elegante em ouro | SIM |
| 2 | Brinco Gota Cristal | BRINCOS | 79.90 | [URL da imagem] | Brinco com cristal brilhante | SIM |

### Descrição das Colunas

- **ID**: Número único para cada produto (ex: 1, 2, 3)
- **Nome**: Nome do produto (ex: "Anel Dourado Clássico")
- **Categoria**: Uma das seguintes: ANÉIS, BRINCOS, COLARES, PIERCINGS, PINGENTES, PULSEIRAS, ACESSÓRIOS
- **Preço**: Preço em reais (ex: 89.90)
- **Imagem**: URL completa da imagem do produto
- **Descrição**: Descrição breve do produto
- **Disponível**: SIM ou NÃO (indica se o produto está em estoque)

## Passo 2: Publicar a Planilha como CSV

1. Na sua planilha, clique em **Arquivo** → **Compartilhar**
2. Clique em **Alterar para qualquer pessoa com o link**
3. Copie o ID da planilha da URL (está entre `/d/` e `/edit`)
   - Exemplo: `https://docs.google.com/spreadsheets/d/1ABC123DEF456/edit` → ID é `1ABC123DEF456`

## Passo 3: Configurar a URL no Código

1. Abra o arquivo `client/src/lib/sheetsApi.ts`
2. Encontre a linha com `const SHEETS_URL = ...`
3. Substitua `YOUR_SHEET_ID` pelo ID da sua planilha:

```typescript
const SHEETS_URL = 'https://docs.google.com/spreadsheets/d/1ABC123DEF456/export?format=csv&gid=0';
```

Se sua planilha tiver múltiplas abas, você pode usar o `gid` para especificar qual aba usar:
- `gid=0` para a primeira aba
- `gid=1` para a segunda aba
- etc.

## Passo 4: Descomente o Código de Integração

1. Abra `client/src/lib/sheetsApi.ts`
2. Encontre o comentário `/*` e descomente o código de busca do Google Sheets
3. Comente ou remova a linha `return getMockProducts();`

Seu código deve ficar assim:

```typescript
export async function fetchProductsFromSheets(): Promise<Product[]> {
  try {
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
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return getMockProducts();
  }
}
```

## Passo 5: Atualizar o Componente ProductCatalog

No arquivo `client/src/components/ProductCatalog.tsx`, substitua a função `fetchProducts` para usar a integração com Google Sheets:

```typescript
const fetchProducts = async () => {
  try {
    setLoading(true);
    const products = await fetchProductsFromSheets();
    setProducts(products);
    setError(null);
  } catch (err) {
    setError('Erro ao carregar produtos');
    console.error(err);
  } finally {
    setLoading(false);
  }
};
```

E adicione o import no topo do arquivo:

```typescript
import { fetchProductsFromSheets } from '@/lib/sheetsApi';
```

## Passo 6: Testar

1. Salve todas as alterações
2. O site deve recarregar automaticamente
3. Verifique se os produtos aparecem na página
4. Teste alterando um produto na planilha (ex: mude "SIM" para "NÃO" em Disponível)
5. Recarregue a página para ver as alterações

## Dicas Importantes

### Imagens

- Use URLs completas (começando com `https://`)
- Recomendamos usar um serviço de hospedagem de imagens como:
  - Unsplash
  - Pexels
  - Seu próprio servidor
  - Google Drive (compartilhe publicamente)

### Formatação de Dados

- **Preço**: Use ponto (.) como separador decimal (ex: 89.90, não 89,90)
- **Disponível**: Use exatamente "SIM" ou "NÃO" (maiúsculas)
- **Categoria**: Use exatamente uma das categorias listadas

### Problemas Comuns

**Produtos não aparecem:**
- Verifique se a planilha está compartilhada publicamente
- Confirme se a URL está correta em `sheetsApi.ts`
- Abra o console do navegador (F12) e procure por erros

**Imagens não carregam:**
- Certifique-se de que as URLs das imagens estão corretas
- Teste a URL em um navegador para confirmar que a imagem existe

**Preços aparecem como NaN:**
- Verifique se o preço está em formato numérico (ex: 89.90)
- Não use símbolos de moeda (R$) na coluna de preço

## Próximos Passos

Após configurar a integração com Google Sheets, você pode:

1. **Adicionar mais produtos** diretamente na planilha
2. **Atualizar preços** sem tocar no código
3. **Gerenciar disponibilidade** marcando como "SIM" ou "NÃO"
4. **Adicionar novas categorias** criando novos produtos com categorias diferentes

## Suporte

Se encontrar problemas, verifique:
- A URL da planilha está correta
- A planilha está compartilhada publicamente
- Os dados estão formatados corretamente
- Não há espaços em branco extras nas células
