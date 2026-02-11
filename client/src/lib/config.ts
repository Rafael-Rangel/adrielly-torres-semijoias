/**
 * Configurações do e-commerce
 */

// WhatsApp da Adrielly (configurável via variável de ambiente)
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5521975548317';

// Google Sheets para salvar pedidos
export const SHEETS_PEDIDOS_URL = import.meta.env.VITE_SHEETS_PEDIDOS_URL || '';

// Categorias disponíveis
export const CATEGORIAS = [
  'ANÉIS',
  'BRINCOS',
  'COLARES',
  'PIERCINGS',
  'PINGENTES',
  'PULSEIRAS',
  'ACESSÓRIOS',
  'CONJUNTOS',
  'PROMOÇÕES'
] as const;

// Formas de pagamento
export const FORMAS_PAGAMENTO = [
  { value: 'pix', label: 'Pix' },
  { value: 'credito', label: 'Cartão de Crédito' },
  { value: 'debito', label: 'Cartão de Débito' },
  { value: 'dinheiro', label: 'Dinheiro' },
] as const;

// Gerar ID único para pedido
export function generateOrderId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `PED-${timestamp}-${random}`;
}

// Formatar mensagem WhatsApp
export function formatWhatsAppMessage(orderData: {
  idPedido: string;
  nomeCliente: string;
  telefoneCliente: string;
  formaPagamento: string;
  indicacao?: string;
  observacoes?: string;
  itens: Array<{
    nome: string;
    codigo?: string;
    quantidade: number;
    valor: number;
  }>;
  total: number;
}): string {
  const { idPedido, nomeCliente, telefoneCliente, formaPagamento, indicacao, observacoes, itens, total } = orderData;
  
  let message = `Olá, Adrielly! Quero finalizar meu pedido:\n\n`;
  message += `*Cliente:* ${nomeCliente}\n`;
  message += `*WhatsApp:* ${telefoneCliente}\n`;
  message += `*Pagamento:* ${formaPagamento}\n`;
  
  if (indicacao) {
    message += `*Indicação:* ${indicacao}\n`;
  }
  
  message += `\n*Itens:*\n`;
  
  itens.forEach((item) => {
    const codigo = item.codigo ? ` — Cód: ${item.codigo}` : '';
    message += `${item.nome}${codigo} — Qtd: ${item.quantidade} — Valor: R$ ${item.valor.toFixed(2)}\n`;
  });
  
  message += `\n*Total: R$ ${total.toFixed(2)}*\n`;
  
  if (observacoes) {
    message += `\n*Observações:* ${observacoes}`;
  }
  
  message += `\n\n*ID do Pedido:* ${idPedido}`;
  
  return encodeURIComponent(message);
}

// URL do WhatsApp
export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

/** Contextos para mensagem pré-definida (quando não é finalização de pedido) */
export type WhatsAppPreset =
  | 'duvida'      // Atendimento / dúvida geral
  | 'contato'     // Página Contato ou contato geral
  | 'ajuda'       // Página Ajuda
  | 'entrega'     // Dúvida sobre entrega (chat atendimento)
  | 'cta'         // Seção CTA "Comprar pelo WhatsApp"
  | 'hero'        // Banner principal "Comprar pelo WhatsApp"
  | 'footer'      // Link WhatsApp no rodapé
  | 'produto';    // Botão na página do produto (use extra.productName)

/** Gera mensagem pré-definida para cada contexto de clique no WhatsApp */
export function getWhatsAppPresetMessage(
  preset: WhatsAppPreset,
  extra?: { productName?: string }
): string {
  const prefix = 'Olá, Adrielly! ';
  const messages: Record<WhatsAppPreset, string> = {
    duvida: prefix + 'Estou com uma dúvida e gostaria de falar com você. Pode me ajudar?',
    contato: prefix + 'Entrei em contato pelo site. Gostaria de mais informações sobre seus produtos.',
    ajuda: prefix + 'Preciso de ajuda com uma dúvida (entrega, garantia ou produtos). Pode me atender?',
    entrega: prefix + 'Tenho dúvida sobre a entrega (horário, local ou como combinar). Pode me explicar?',
    cta: prefix + 'Vi a coleção no site e quero comprar! Pode me mostrar as opções disponíveis?',
    hero: prefix + 'Gostaria de ver a coleção e fazer meu pedido. Pode me atender?',
    footer: prefix + 'Entrei no site e gostaria de falar com você. Pode me atender?',
    produto: extra?.productName
      ? prefix + `Tenho interesse no produto *${extra.productName}*. Pode me passar mais informações ou reservar para mim?`
      : prefix + 'Tenho interesse em um produto que vi no site. Pode me atender?',
  };
  return encodeURIComponent(messages[preset]);
}
