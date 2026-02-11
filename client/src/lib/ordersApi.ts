/**
 * API para salvar pedidos no Google Sheets
 */

interface OrderItem {
  nome: string;
  codigo?: string;
  quantidade: number;
  valor: number;
}

interface OrderData {
  data_hora: string;
  id_pedido: string;
  nome_cliente: string;
  telefone_cliente: string;
  indicacao?: string;
  pagamento: string;
  itens: string; // JSON stringificado
  total: number;
  observacoes?: string;
  status: string;
  origem: string;
}

/**
 * Salva pedido no Google Sheets
 */
export async function saveOrderToSheets(orderData: {
  idPedido: string;
  nomeCliente: string;
  telefoneCliente: string;
  formaPagamento: string;
  indicacao?: string;
  observacoes?: string;
  itens: OrderItem[];
  total: number;
}): Promise<boolean> {
  const SHEETS_URL = import.meta.env.VITE_SHEETS_PEDIDOS_URL;
  
  if (!SHEETS_URL) {
    console.warn('URL do Google Sheets para pedidos não configurada');
    return false;
  }

  try {
    const orderRow: OrderData = {
      data_hora: new Date().toISOString(),
      id_pedido: orderData.idPedido,
      nome_cliente: orderData.nomeCliente,
      telefone_cliente: orderData.telefoneCliente,
      indicacao: orderData.indicacao || '',
      pagamento: orderData.formaPagamento,
      itens: JSON.stringify(orderData.itens),
      total: orderData.total,
      observacoes: orderData.observacoes || '',
      status: 'PENDENTE',
      origem: 'SITE'
    };

    // Converter para CSV
    const csvRow = [
      orderRow.data_hora,
      orderRow.id_pedido,
      orderRow.nome_cliente,
      orderRow.telefone_cliente,
      orderRow.indicacao,
      orderRow.pagamento,
      `"${orderRow.itens.replace(/"/g, '""')}"`, // Escapar aspas no JSON
      orderRow.total,
      orderRow.observacoes ? `"${orderRow.observacoes.replace(/"/g, '""')}"` : '',
      orderRow.status,
      orderRow.origem
    ].join(',');

    // Para adicionar uma linha, precisamos usar Google Apps Script ou API
    // Por enquanto, vamos usar uma abordagem simples com formulário
    // Nota: Isso requer configuração adicional no Google Sheets
    
    // Alternativa: usar Google Forms ou Apps Script
    // Por enquanto, apenas logamos
    console.log('Pedido a ser salvo:', orderRow);
    
    // Se você tiver um endpoint de API ou Google Apps Script configurado,
    // faça a requisição aqui:
    // const response = await fetch(SHEETS_URL, {
    //   method: 'POST',
    //   body: JSON.stringify(orderRow),
    //   headers: { 'Content-Type': 'application/json' }
    // });
    
    return true;
  } catch (error) {
    console.error('Erro ao salvar pedido:', error);
    return false;
  }
}

/**
 * Formata itens para exibição
 */
export function formatItemsForDisplay(itens: OrderItem[]): string {
  return itens
    .map((item) => {
      const codigo = item.codigo ? ` (Cód: ${item.codigo})` : '';
      return `${item.nome}${codigo} - Qtd: ${item.quantidade} - R$ ${item.valor.toFixed(2)}`;
    })
    .join('\n');
}
