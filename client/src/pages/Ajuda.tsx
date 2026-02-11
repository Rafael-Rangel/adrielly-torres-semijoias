import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Truck, CreditCard } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Ajuda() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Ajuda & Informações</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Entrega */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="text-accent" size={32} />
              <h2 className="text-2xl font-bold text-foreground">Entrega</h2>
            </div>
            <div className="space-y-3">
              <p className="text-foreground">
                A entrega é feita pessoalmente até sua residência.
              </p>
              <p className="text-muted-foreground">
                Você encomenda e eu entrego! Entre em contato pelo WhatsApp para combinar o melhor horário e local de entrega.
              </p>
              <p className="text-muted-foreground">
                Trabalhamos com entrega em toda a região. Entrega rápida e segura!
              </p>
            </div>
          </div>

          {/* Garantia */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-accent" size={32} />
              <h2 className="text-2xl font-bold text-foreground">Garantia</h2>
            </div>
            <div className="space-y-3">
              <p className="text-foreground">
                <strong>Garantia dos Produtos</strong>
              </p>
              <p className="text-muted-foreground">
                Todos os produtos têm garantia de qualidade. Trabalhamos apenas com produtos selecionados e de alta qualidade.
              </p>
              <p className="text-muted-foreground">
                Em caso de qualquer problema com o produto, entre em contato conosco pelo WhatsApp.
              </p>
            </div>
          </div>

          {/* Pagamento */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="text-accent" size={32} />
              <h2 className="text-2xl font-bold text-foreground">Formas de Pagamento</h2>
            </div>
            <div className="space-y-3">
              <p className="text-foreground">Aceitamos as seguintes formas de pagamento:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Cartão de Crédito</li>
                <li>Cartão de Débito</li>
                <li>Pix</li>
                <li>Dinheiro</li>
              </ul>
              <p className="text-muted-foreground">
                O pagamento pode ser feito na entrega ou combinado antecipadamente.
              </p>
            </div>
          </div>

          {/* Contato */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <WhatsAppIcon size={32} className="text-accent" />
              <h2 className="text-2xl font-bold text-foreground">Contato</h2>
            </div>
            <div className="space-y-3">
              <p className="text-foreground">
                Entre em contato pelo WhatsApp para tirar dúvidas ou fazer seu pedido!
              </p>
              <p className="text-muted-foreground">
                Estou sempre disponível para ajudar você a encontrar a joia perfeita.
              </p>
              <WhatsAppButton preset="ajuda" size="default" className="mt-2">
                Abrir WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Perguntas Frequentes</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Como funciona a entrega?</AccordionTrigger>
              <AccordionContent>
                A entrega é feita pessoalmente até sua residência. Você encomenda e eu entrego! Combinamos o melhor horário e local de entrega pelo WhatsApp.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Quais formas de pagamento são aceitas?</AccordionTrigger>
              <AccordionContent>
                Aceitamos cartão de crédito, cartão de débito, Pix e dinheiro. O pagamento pode ser feito na entrega ou combinado antecipadamente.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Os produtos têm garantia?</AccordionTrigger>
              <AccordionContent>
                Sim! Todos os produtos têm garantia de qualidade. Trabalhamos apenas com produtos selecionados e de alta qualidade. Em caso de qualquer problema, entre em contato pelo WhatsApp.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Como faço para comprar?</AccordionTrigger>
              <AccordionContent>
                Você pode adicionar os produtos ao carrinho aqui no site e finalizar o pedido, ou entrar em contato diretamente pelo WhatsApp. O pedido será enviado para o WhatsApp para finalização.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Posso ver os produtos antes de comprar?</AccordionTrigger>
              <AccordionContent>
                Sim! Você pode ver todas as fotos dos produtos aqui no site. Se quiser ver pessoalmente ou tirar alguma dúvida, entre em contato pelo WhatsApp.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
