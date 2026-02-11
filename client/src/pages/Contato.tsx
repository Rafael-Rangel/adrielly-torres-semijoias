import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function Contato() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Entre em Contato</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Informações */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Fale comigo!</h2>
              <p className="text-muted-foreground mb-6">
                Estou sempre disponível para ajudar você a encontrar a joia perfeita. 
                Entre em contato pelo WhatsApp para tirar dúvidas, fazer pedidos ou agendar uma visita.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <WhatsAppIcon size={24} className="text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <p className="text-muted-foreground">Mensagem rápida e direta</p>
                    <WhatsAppButton preset="contato" size="default" className="mt-2">
                      Abrir WhatsApp
                    </WhatsAppButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-3">Horário de Atendimento</h3>
              <p className="text-muted-foreground">
                Segunda a Sábado: 9h às 18h<br />
                Domingo: Fechado
              </p>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Envie uma Mensagem</h2>
            <p className="text-muted-foreground mb-6">
              Preencha o formulário abaixo ou clique no botão para abrir o WhatsApp diretamente.
            </p>
            
            <div className="space-y-4">
              <WhatsAppButton 
                preset="contato"
                className="w-full justify-center" 
                size="lg"
              >
                Abrir WhatsApp
              </WhatsAppButton>
              
              <p className="text-sm text-muted-foreground text-center">
                Ou entre em contato diretamente pelo WhatsApp para uma resposta mais rápida!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
