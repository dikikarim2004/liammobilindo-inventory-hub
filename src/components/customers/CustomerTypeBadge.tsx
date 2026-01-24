import { Badge } from '@/components/ui/badge';
import { CustomerType } from '@/types';
import { cn } from '@/lib/utils';

interface CustomerTypeBadgeProps {
  type: CustomerType;
}

const typeConfig: Record<CustomerType, { label: string; className: string }> = {
  seller: {
    label: 'Penjual',
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  buyer: {
    label: 'Pembeli',
    className: 'bg-accent/10 text-accent border-accent/20',
  },
};

export function CustomerTypeBadge({ type }: CustomerTypeBadgeProps) {
  const config = typeConfig[type];

  return (
    <Badge variant="outline" className={cn('font-medium', config.className)}>
      {config.label}
    </Badge>
  );
}
