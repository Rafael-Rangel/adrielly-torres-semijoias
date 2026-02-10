import { MessageCircle, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">ADRIELLY TORRES</h3>
            <p className="text-gray-400 text-sm">
              Revendedora oficial de semijoias Munra. Qualidade, elegância e exclusividade.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">NAVEGAÇÃO</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="#produtos" className="hover:text-accent transition-colors">Produtos</a></li>
              <li><a href="#sobre" className="hover:text-accent transition-colors">Sobre</a></li>
              <li><a href="#contato" className="hover:text-accent transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-4">CATEGORIAS</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-accent transition-colors">Anéis</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Brincos</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Colares</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Pulseiras</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">CONTATO</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <MessageCircle size={16} className="text-accent" />
                <a href="https://wa.me/5511999999999" className="hover:text-accent transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <a href="mailto:adrielly@example.com" className="hover:text-accent transition-colors">
                  Email
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-accent" />
                <span>(11) 99999-9999</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2026 Adrielly Torres. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-accent transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-accent transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
