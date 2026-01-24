import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
  format?: 'number' | 'currency';
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'bg-accent/10 text-accent',
  format = 'number',
}: StatsCardProps) {
  const formattedValue =
    format === 'currency'
      ? new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(Number(value))
      : value;

  const isPositive = change !== undefined && change >= 0;

  return (
    <Card className="stats-card card-hover">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{formattedValue}</p>
            {change !== undefined && (
              <div
                className={cn(
                  'flex items-center gap-1 text-sm font-medium',
                  isPositive ? 'metric-up' : 'metric-down'
                )}
              >
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>
                  {isPositive ? '+' : ''}
                  {change}%
                </span>
                <span className="text-muted-foreground font-normal">dari bulan lalu</span>
              </div>
            )}
          </div>
          <div className={cn('p-3 rounded-xl', iconColor)}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
