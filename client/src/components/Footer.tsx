import { Link } from 'wouter';
import { getWhatsAppUrl, getWhatsAppPresetMessage } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <img 
              src="/logo.png" 
              alt="MUNRÁ semijoias" 
              className="h-10 mb-4 w-auto object-contain"
            />
            <p className="text-gray-400 text-sm">
              Joias & Semijoias com qualidade, elegância e exclusividade. 
              Venda direta ao cliente final.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">NAVEGAÇÃO</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/loja" className="hover:text-accent transition-colors">Loja</Link></li>
              <li><Link href="/ajuda" className="hover:text-accent transition-colors">Ajuda</Link></li>
              <li><Link href="/contato" className="hover:text-accent transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-bold mb-4">INFORMAÇÕES</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/ajuda" className="hover:text-accent transition-colors">Entrega</Link></li>
              <li><Link href="/ajuda" className="hover:text-accent transition-colors">Garantia</Link></li>
              <li><Link href="/ajuda" className="hover:text-accent transition-colors">Formas de Pagamento</Link></li>
              <li><Link href="/contato" className="hover:text-accent transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">CONTATO</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href={getWhatsAppUrl(getWhatsAppPresetMessage('footer'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="text-gray-400">
                Telefone
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2026 Adrielly Torres. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/ajuda" className="hover:text-accent transition-colors">Ajuda</Link>
              <Link href="/contato" className="hover:text-accent transition-colors">Contato</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
