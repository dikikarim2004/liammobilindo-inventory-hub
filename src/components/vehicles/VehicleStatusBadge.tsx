import { Badge } from '@/components/ui/badge';
import { VehicleStatus } from '@/types';
import { cn } from '@/lib/utils';

interface VehicleStatusBadgeProps {
  status: VehicleStatus;
}

const statusConfig: Record<VehicleStatus, { label: string; className: string }> = {
  available: {
    label: 'Tersedia',
    className: 'badge-available',
  },
  sold: {
    label: 'Terjual',
    className: 'badge-sold',
  },
  reserved: {
    label: 'Reservasi',
    className: 'badge-reserved',
  },
};

export function VehicleStatusBadge({ status }: VehicleStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={cn('font-medium', config.className)}>
      {config.label}
    </Badge>
  );
}
