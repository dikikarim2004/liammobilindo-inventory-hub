import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus } from 'lucide-react';

export default function Customers() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Konsumen</h1>
          <p className="text-muted-foreground mt-1">
            Kelola data penjual dan pembeli kendaraan.
          </p>
        </div>
        <Button className="btn-gradient">
          <UserPlus className="w-4 h-4 mr-2" />
          Tambah Konsumen
        </Button>
      </div>

      {/* Placeholder Content */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl mb-2">Halaman Konsumen</CardTitle>
          <p className="text-muted-foreground text-center max-w-md">
            Fitur manajemen konsumen sedang dalam pengembangan. Di sini Anda dapat mengelola
            data penjual (orang yang menjual mobil ke showroom) dan pembeli (orang yang
            membeli mobil dari showroom).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
