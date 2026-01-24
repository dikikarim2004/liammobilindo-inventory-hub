import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Toyota', value: 12, fill: 'hsl(16, 100%, 60%)' },
  { name: 'Honda', value: 8, fill: 'hsl(215, 75%, 35%)' },
  { name: 'Suzuki', value: 6, fill: 'hsl(142, 70%, 45%)' },
  { name: 'Mitsubishi', value: 5, fill: 'hsl(38, 92%, 50%)' },
  { name: 'Daihatsu', value: 4, fill: 'hsl(200, 85%, 50%)' },
  { name: 'Lainnya', value: 3, fill: 'hsl(215, 15%, 60%)' },
];

export function StockByBrandChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Stok per Merek</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(214, 20%, 90%)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                formatter={(value: number) => [`${value} unit`, 'Stok']}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
