import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';
import type { PriceFilterValue } from '@/lib/sheetsApi';

const PRICE_OPTIONS: { value: PriceFilterValue; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'under50', label: 'Até R$ 50' },
  { value: '50-100', label: 'R$ 50 - R$ 100' },
  { value: '100-200', label: 'R$ 100 - R$ 200' },
  { value: 'over200', label: 'Acima de R$ 200' },
];

interface PriceFilterProps {
  value: PriceFilterValue;
  onChange: (value: PriceFilterValue) => void;
  /** Na página da loja: mostra botão PROMOÇÃO com ícone */
  showPromoOption?: boolean;
  /** Quando showPromoOption: valor do filtro "só promoção" */
  promocaoOnly?: boolean;
  onPromocaoOnlyChange?: (value: boolean) => void;
}

export default function PriceFilter({
  value,
  onChange,
  showPromoOption = false,
  promocaoOnly = false,
  onPromocaoOnlyChange,
}: PriceFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {PRICE_OPTIONS.map((opt) => (
        <Button
          key={opt.value}
          variant={value === opt.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
      {showPromoOption && onPromocaoOnlyChange && (
        <Button
          variant={promocaoOnly ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPromocaoOnlyChange(!promocaoOnly)}
          className="gap-1.5"
        >
          <Tag size={16} className="flex-shrink-0" />
          PROMOÇÃO
        </Button>
      )}
    </div>
  );
}
