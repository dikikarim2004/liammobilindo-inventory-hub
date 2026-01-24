import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Laporan</h1>
          <p className="text-muted-foreground mt-1">
            Lihat laporan penjualan dan laba per unit kendaraan.
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Laporan
        </Button>
      </div>

      {/* Placeholder Content */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl mb-2">Halaman Laporan</CardTitle>
          <p className="text-muted-foreground text-center max-w-md">
            Fitur laporan sedang dalam pengembangan. Di sini Anda dapat melihat laporan
            penjualan bulanan, laba/rugi per kendaraan, dan analisis performa showroom.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
