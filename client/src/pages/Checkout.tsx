import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { FORMAS_PAGAMENTO, generateOrderId, formatWhatsAppMessage, getWhatsAppUrl } from '@/lib/config';
import { saveOrderToSheets } from '@/lib/ordersApi';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Checkout() {
  const { items, getTotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    bairro: '',
    observacoes: '',
    indicacao: '',
    formaPagamento: 'pix'
  });

  useEffect(() => {
    if (items.length === 0) {
      setLocation('/carrinho');
    }
  }, [items, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.telefone) {
      toast.error('Preencha nome e telefone');
      return;
    }

    setLoading(true);

    try {
      const idPedido = generateOrderId();
      const total = getTotal();

      // Salvar no Google Sheets
      await saveOrderToSheets({
        idPedido,
        nomeCliente: formData.nome,
        telefoneCliente: formData.telefone,
        formaPagamento: FORMAS_PAGAMENTO.find(f => f.value === formData.formaPagamento)?.label || formData.formaPagamento,
        indicacao: formData.indicacao || undefined,
        observacoes: formData.observacoes || undefined,
        itens: items.map(item => ({
          nome: item.nome,
          codigo: item.codigo || item.id,
          quantidade: item.quantidade,
          valor: item.preco * item.quantidade
        })),
        total
      });

      // Gerar mensagem WhatsApp
      const message = formatWhatsAppMessage({
        idPedido,
        nomeCliente: formData.nome,
        telefoneCliente: formData.telefone,
        formaPagamento: FORMAS_PAGAMENTO.find(f => f.value === formData.formaPagamento)?.label || formData.formaPagamento,
        indicacao: formData.indicacao || undefined,
        observacoes: formData.observacoes || undefined,
        itens: items.map(item => ({
          nome: item.nome,
          codigo: item.codigo || item.id,
          quantidade: item.quantidade,
          valor: item.preco * item.quantidade
        })),
        total
      });

      // Abrir WhatsApp
      window.open(getWhatsAppUrl(message), '_blank');
      
      // Limpar carrinho
      clearCart();
      
      toast.success('Pedido enviado! Redirecionando para WhatsApp...');
      
      // Redirecionar após um momento
      setTimeout(() => {
        setLocation('/');
      }, 2000);
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      toast.error('Erro ao processar pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  const total = getTotal();
  const formaPagamentoLabel = FORMAS_PAGAMENTO.find(f => f.value === formData.formaPagamento)?.label || '';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container py-8">
        <Link href="/carrinho">
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeft size={16} />
            Voltar ao carrinho
          </Button>
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-foreground mb-8"
        >
          Finalizar Compra
        </motion.h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulário */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Dados do Cliente */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-bold text-foreground mb-4">Dados do Cliente</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nome">Nome completo *</Label>
                    <Input
                      id="nome"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Seu nome completo"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">WhatsApp *</Label>
                    <Input
                      id="telefone"
                      required
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      placeholder="(11) 99999-9999"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bairro">Bairro ou referência (opcional)</Label>
                    <Input
                      id="bairro"
                      value={formData.bairro}
                      onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                      placeholder="Bairro ou ponto de referência"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="observacoes">Observações (opcional)</Label>
                    <Textarea
                      id="observacoes"
                      value={formData.observacoes}
                      onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                      placeholder="Alguma observação sobre o pedido?"
                      rows={3}
                      className="mt-2"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Forma de Pagamento */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-bold text-foreground mb-4">Forma de Pagamento</h2>
                <RadioGroup
                  value={formData.formaPagamento}
                  onValueChange={(value) => setFormData({ ...formData, formaPagamento: value })}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {FORMAS_PAGAMENTO.map((forma) => {
                      const isSelected = formData.formaPagamento === forma.value;
                      const iconClass = "text-[22px] text-foreground";
                      const iconByForma =
                        forma.value === 'pix' ? <i className={`fa-brands fa-pix ${iconClass}`} /> :
                        forma.value === 'credito' ? <i className={`fa-solid fa-credit-card ${iconClass}`} /> :
                        forma.value === 'debito' ? <i className={`fa-regular fa-credit-card ${iconClass}`} /> :
                        <i className={`fa-regular fa-money-bill-1 ${iconClass}`} />;
                      return (
                        <Label
                          key={forma.value}
                          htmlFor={forma.value}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-secondary/50 ${
                            isSelected ? 'border-accent bg-accent/5' : 'border-border bg-secondary/30'
                          }`}
                        >
                          <RadioGroupItem value={forma.value} id={forma.value} className="absolute opacity-0 w-0 h-0 pointer-events-none" />
                          <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-border text-foreground">
                            {iconByForma}
                          </span>
                          <span className="font-medium text-sm">{forma.label}</span>
                        </Label>
                      );
                    })}
                  </div>
                </RadioGroup>
              </motion.div>

              {/* Indicação */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
              >
                <h2 className="text-xl font-bold text-foreground mb-2">Quem indicou você?</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Quem indica ganha 10% de desconto!
                </p>
                <Input
                  value={formData.indicacao}
                  onChange={(e) => setFormData({ ...formData, indicacao: e.target.value })}
                  placeholder="Nome de quem indicou (opcional)"
                  className="mt-2"
                />
              </motion.div>
            </motion.div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-secondary/50 rounded-lg p-6 sticky top-24"
              >
                <h2 className="text-xl font-bold text-foreground mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.imagem}
                        alt={item.nome}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.nome}</p>
                        <p className="text-xs text-muted-foreground">
                          Qtd: {item.quantidade} x R$ {item.preco.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-bold text-accent">
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Subtotal:</span>
                    <span className="text-lg font-bold text-accent">R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total:</span>
                    <span className="text-2xl font-bold text-accent">R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full mb-4 gap-2"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size={20} />
                      Processando...
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={20} />
                      Comprar Agora
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Ao clicar em "Comprar Agora", você será redirecionado para o WhatsApp para finalizar o pedido.
                </p>
              </motion.div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
