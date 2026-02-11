# E-commerce Adrielly Torres - Joias & Semijoias

Site e-commerce completo para venda direta de joias e semijoias da Adrielly Torres.

## 🚀 Funcionalidades

- ✅ Loja completa com catálogo de produtos
- ✅ Páginas por categoria
- ✅ Página de detalhe do produto com galeria
- ✅ Carrinho de compras funcional
- ✅ Checkout completo
- ✅ Finalização via WhatsApp
- ✅ Salvamento automático de pedidos no Google Sheets
- ✅ Busca de produtos
- ✅ Filtros e ordenação
- ✅ Carrossel infinito de benefícios
- ✅ Contagem regressiva para promoções
- ✅ Botão flutuante do WhatsApp
- ✅ Design responsivo (mobile-first)

## 📋 Pré-requisitos

- Node.js 20.19+ ou 22.12+
- pnpm (gerenciador de pacotes)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Rafael-Rangel/adrielly-torres-semijoias.git
cd adrielly-torres-semijoias
```

2. Instale as dependências:
```bash
npx pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure:
- `VITE_WHATSAPP_NUMBER`: Número do WhatsApp da Adrielly (formato: 5511999999999)
- `VITE_SHEETS_PEDIDOS_URL`: URL do Google Sheets para salvar pedidos (opcional)

4. Execute o projeto em desenvolvimento:
```bash
npx pnpm dev
```

O site estará disponível em `http://localhost:3000`

## 📦 Build para Produção

```bash
npx pnpm build
npx pnpm start
```

## ⚙️ Configuração do Google Sheets

### Para Produtos

1. Crie uma planilha no Google Sheets
2. Configure as colunas: ID, Nome, Categoria, Preço, Imagem, Descrição, Disponível
3. Compartilhe publicamente (qualquer pessoa com o link pode visualizar)
4. Copie o ID da planilha da URL
5. Configure em `client/src/lib/sheetsApi.ts`:
```typescript
const SHEETS_URL = 'https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid=0';
```

### Para Pedidos

1. Crie uma planilha separada para pedidos
2. Configure as colunas:
   - data_hora
   - id_pedido
   - nome_cliente
   - telefone_cliente
   - indicacao
   - pagamento
   - itens (JSON)
   - total
   - observacoes
   - status
   - origem
3. Configure um Google Apps Script ou endpoint para receber os pedidos
4. Configure a URL em `.env`:
```
VITE_SHEETS_PEDIDOS_URL=https://...
```

## 📱 Páginas do Site

- `/` - Home
- `/loja` - Loja completa com filtros
- `/categoria/:categoria` - Produtos por categoria
- `/produto/:id` - Detalhe do produto
- `/carrinho` - Carrinho de compras
- `/checkout` - Finalização do pedido
- `/ajuda` - Informações (Entrega, Garantia, Pagamento)
- `/contato` - Contato via WhatsApp

## 🎨 Estrutura do Projeto

```
client/
  src/
    components/     # Componentes reutilizáveis
    contexts/       # Contextos React (CartContext)
    lib/           # Utilitários e APIs
    pages/         # Páginas do site
    hooks/         # Hooks customizados
shared/            # Código compartilhado
server/            # Servidor (se necessário)
```

## 🔧 Tecnologias Utilizadas

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Wouter (roteamento)
- Radix UI (componentes)
- Sonner (notificações)

## 📝 Notas Importantes

- O site é para **venda direta** ao cliente final
- **Não há frete** - entrega feita pela Adrielly pessoalmente
- Todos os pedidos são finalizados via WhatsApp
- Os pedidos são salvos automaticamente no Google Sheets (se configurado)

## 🤝 Suporte

Para dúvidas ou problemas, entre em contato pelo WhatsApp ou abra uma issue no repositório.

## 📄 Licença

MIT
