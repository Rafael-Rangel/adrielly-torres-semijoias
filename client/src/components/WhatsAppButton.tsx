import { useState, useCallback } from 'react';
import { getWhatsAppUrl, formatWhatsAppMessage, getWhatsAppPresetMessage, type WhatsAppPreset } from '@/lib/config';
import WhatsAppIcon from '@/components/WhatsAppIcon';

interface WhatsAppButtonProps {
  /** Dados do pedido (só no checkout). Se não informado, use preset ou será "contato". */
  message?: Parameters<typeof formatWhatsAppMessage>[0];
  /** Contexto do botão: mensagem pré-definida para dúvida, contato, produto, etc. */
  preset?: WhatsAppPreset;
  /** Para preset "produto", nome do produto para incluir na mensagem */
  productName?: string;
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'default' | 'lg' | 'xl';
  /** default = accent (paleta). outline = borda clara para fundos escuros */
  variant?: 'default' | 'outline';
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  default: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-base gap-3',
  xl: 'px-8 py-4 text-lg gap-4',
};

const iconSizes = {
  sm: 18,
  default: 22,
  lg: 26,
  xl: 30,
};

const variantClasses = {
  default: 'bg-accent text-accent-foreground hover:opacity-95',
  outline: 'bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20',
};

export default function WhatsAppButton({
  message,
  preset,
  productName,
  children = 'WhatsApp',
  className = '',
  size = 'default',
  variant = 'default',
}: WhatsAppButtonProps) {
  const [shineKey, setShineKey] = useState(0);

  const handleClick = () => {
    if (message) {
      window.open(getWhatsAppUrl(formatWhatsAppMessage(message)), '_blank');
      return;
    }
    const context = preset ?? 'contato';
    const text = getWhatsAppPresetMessage(context, productName ? { productName } : undefined);
    window.open(getWhatsAppUrl(text), '_blank');
  };

  const triggerShine = useCallback(() => {
    setShineKey((k) => k + 1);
  }, []);

  return (
    <div
      className={`whatsapp-shine-wrapper relative overflow-hidden rounded-lg inline-flex ${className}`}
      onMouseEnter={triggerShine}
      onTouchStart={triggerShine}
    >
      <div className="whatsapp-shine-beam" aria-hidden />
      <div key={shineKey} className="whatsapp-shine-trigger" aria-hidden />
      <button
        type="button"
        onClick={handleClick}
        className={`relative z-10 inline-flex items-center font-semibold w-full h-full justify-center rounded-lg transition-colors ${sizeClasses[size]} ${variantClasses[variant]}`}
        aria-label="Abrir WhatsApp"
      >
        <WhatsAppIcon size={iconSizes[size]} className="flex-shrink-0 [color:inherit]" />
        {children}
      </button>
    </div>
  );
}
