import { useState, useCallback, useRef, useEffect } from 'react';
import { getWhatsAppUrl, getWhatsAppPresetMessage, type WhatsAppPreset } from '@/lib/config';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { Headphones, X } from 'lucide-react';

const CHAT_OPTIONS = [
  { id: 'duvidas', label: 'Estou com Dúvidas' },
  { id: 'vendedor', label: 'Quero falar com vendedor real' },
  { id: 'entrega', label: 'Dúvida sobre entrega' },
  { id: 'outras', label: 'Outras dúvidas' },
] as const;

const CHAT_REPLIES: Record<string, string> = {
  duvidas: 'Entendemos! Nossa equipe está pronta para tirar todas as suas dúvidas sobre produtos, tamanhos e pedidos. 😊',
  vendedor: 'Perfeito! Você será atendido por um de nossos vendedores. Clique no botão abaixo para iniciar a conversa no WhatsApp.',
  entrega: 'Podemos te ajudar com prazos, rastreio e formas de envio. Clique abaixo para falar conosco!',
  outras: 'Sem problemas! Estamos aqui para ajudar no que precisar. Clique no botão para continuar.',
};

export default function WhatsAppFloat() {
  const [shineKey, setShineKey] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [replyVisible, setReplyVisible] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowBadge(true), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!selectedOption) {
      setReplyVisible(false);
      return;
    }
    setIsTyping(true);
    const t = setTimeout(() => {
      setIsTyping(false);
      setReplyVisible(true);
    }, 1800);
    return () => clearTimeout(t);
  }, [selectedOption]);

  const openWhatsApp = useCallback(() => {
    const preset: WhatsAppPreset = selectedOption === 'vendedor' ? 'contato'
      : selectedOption === 'entrega' ? 'entrega'
      : 'duvida';
    const message = getWhatsAppPresetMessage(preset);
    window.open(getWhatsAppUrl(message), '_blank');
    setPopupOpen(false);
  }, [selectedOption]);

  const triggerShine = useCallback(() => {
    setShineKey((k) => k + 1);
  }, []);

  const handleFloatClick = () => {
    setPopupOpen((open) => !open);
    if (popupOpen) {
      setSelectedOption(null);
      setIsTyping(false);
      setReplyVisible(false);
    }
  };

  const handleOptionClick = (id: string) => {
    setSelectedOption(id);
  };

  useEffect(() => {
    if (selectedOption || isTyping) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedOption, isTyping, replyVisible]);

  useEffect(() => {
    if (!popupOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedPopup = popupRef.current?.contains(target);
      const clickedFloat = (e.target as Element).closest('.whatsapp-shine-wrapper');
      if (!clickedPopup && !clickedFloat) {
        setPopupOpen(false);
        setSelectedOption(null);
        setIsTyping(false);
        setReplyVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popupOpen]);

  const handleClose = () => {
    setPopupOpen(false);
    setSelectedOption(null);
    setIsTyping(false);
    setReplyVisible(false);
  };

  return (
    <div
      className="whatsapp-float-container fixed z-50 flex flex-col items-end gap-2"
      style={{
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
        right: 'max(1rem, env(safe-area-inset-right))',
      }}
    >
      {/* Popup tipo chat WhatsApp */}
      {popupOpen && (
        <div
          ref={popupRef}
          className="animate-in fade-in slide-in-from-bottom-4 duration-200 bg-[#efeae2] rounded-2xl shadow-xl border border-border overflow-hidden w-[calc(100vw-2rem)] max-w-[320px] flex flex-col max-h-[min(420px,70vh)]"
          role="dialog"
          aria-label="Chat de atendimento"
        >
          {/* Cabeçalho estilo WhatsApp */}
          <div className="flex items-center justify-between gap-2 p-3 bg-[#f0f2f5] border-b border-border flex-shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {!avatarError ? (
                  <img
                    src="/avatar-vendedor.png"
                    alt=""
                    className="w-full h-full object-cover"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <Headphones className="size-4 text-accent" aria-hidden />
                )}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">Atendimento</p>
                <p className="text-xs text-green-600">Estamos online</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 rounded-full hover:bg-black/10 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
              aria-label="Fechar"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Área do chat */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
            {/* Uma única mensagem do atendente com saudação + opções */}
            <div className="flex gap-2 items-end">
              <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {!avatarError ? (
                  <img src="/avatar-vendedor.png" alt="" className="w-full h-full object-cover" onError={() => setAvatarError(true)} />
                ) : (
                  <Headphones className="size-3.5 text-accent" aria-hidden />
                )}
              </div>
              <div className="max-w-[85%] rounded-lg rounded-bl-none px-3 py-2 bg-white shadow-sm text-sm text-foreground">
                <p className="mb-2">Olá! Como podemos ajudar? Escolha uma opção:</p>
                <div className="flex flex-col gap-1">
                  {CHAT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleOptionClick(opt.id)}
                      disabled={!!selectedOption}
                      className="text-left py-1.5 px-2.5 rounded-md text-foreground bg-secondary/60 border border-accent/30 hover:bg-secondary/80 hover:border-accent/50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                    >
                      • {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mensagem do usuário (bolha direita) com animação de escolha */}
            {selectedOption && (
              <div className="flex justify-end animate-in fade-in slide-in-from-right-2 duration-300">
                <div className="max-w-[85%] rounded-lg rounded-br-none px-3 py-2 bg-[#d9fdd3] text-sm text-foreground shadow-sm">
                  {CHAT_OPTIONS.find((o) => o.id === selectedOption)?.label ?? selectedOption}
                </div>
              </div>
            )}

            {/* Indicador digitando com pontos animados */}
            {selectedOption && isTyping && (
              <div className="flex gap-2 items-end">
                <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {!avatarError ? (
                    <img src="/avatar-vendedor.png" alt="" className="w-full h-full object-cover" onError={() => setAvatarError(true)} />
                  ) : (
                    <Headphones className="size-3.5 text-accent" aria-hidden />
                  )}
                </div>
                <div className="rounded-lg rounded-bl-none px-3 py-2.5 bg-white shadow-sm flex gap-1 items-center min-w-[60px]">
                  <span className="whatsapp-typing-dot size-2 rounded-full bg-muted-foreground" />
                  <span className="whatsapp-typing-dot size-2 rounded-full bg-muted-foreground" />
                  <span className="whatsapp-typing-dot size-2 rounded-full bg-muted-foreground" />
                </div>
              </div>
            )}

            {/* Resposta do atendente + botão (só após digitando) */}
            {selectedOption && replyVisible && (
              <>
                <div className="flex gap-2 items-end animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {!avatarError ? (
                      <img src="/avatar-vendedor.png" alt="" className="w-full h-full object-cover" onError={() => setAvatarError(true)} />
                    ) : (
                      <Headphones className="size-3.5 text-accent" aria-hidden />
                    )}
                  </div>
                  <div className="max-w-[85%] rounded-lg rounded-bl-none px-3 py-2 bg-white shadow-sm text-sm text-foreground">
                    {CHAT_REPLIES[selectedOption] ?? CHAT_REPLIES.outras}
                  </div>
                </div>

                <div className="flex gap-2 items-end animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150">
                  <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {!avatarError ? (
                      <img src="/avatar-vendedor.png" alt="" className="w-full h-full object-cover" onError={() => setAvatarError(true)} />
                    ) : (
                      <Headphones className="size-3.5 text-accent" aria-hidden />
                    )}
                  </div>
                  <div className="max-w-[85%]">
                    <button
                      type="button"
                      onClick={openWhatsApp}
                      className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-medium shadow-md transition-colors"
                    >
                      <WhatsAppIcon size={18} className="[color:inherit]" />
                      Entrar em contato
                    </button>
                  </div>
                </div>
              </>
            )}

            <div ref={chatEndRef} />
          </div>
        </div>
      )}

      {/* Botão flutuante + badge */}
      <div
        className="whatsapp-shine-wrapper relative shadow-lg hover:shadow-xl transition-shadow"
        onMouseEnter={triggerShine}
        onTouchStart={triggerShine}
      >
        {/* Badge fora do overflow para não ser cortado */}
        {!popupOpen && showBadge && (
          <span
            className="whatsapp-badge absolute -top-1 -right-1 z-20 flex size-6 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold shadow"
            aria-hidden
          >
            1
          </span>
        )}
        <div className="rounded-full overflow-hidden relative">
          <div className="whatsapp-shine-beam rounded-full" aria-hidden />
          <div key={shineKey} className="whatsapp-shine-trigger rounded-full" aria-hidden />
          <button
            onClick={handleFloatClick}
            className="relative z-10 bg-accent text-accent-foreground rounded-full p-4 transition-all hover:scale-105 hover:opacity-95 w-full h-full"
            aria-label={popupOpen ? 'Fechar atendimento' : 'Ver mensagem de atendimento'}
          >
            <WhatsAppIcon size={32} className="[color:inherit]" />
          </button>
          {/* Faixas de luz por cima do botão (z-20 + pointer-events-none) */}
          <div className="whatsapp-float-beams rounded-full absolute inset-0 z-20 pointer-events-none" aria-hidden />
        </div>
      </div>
    </div>
  );
}
