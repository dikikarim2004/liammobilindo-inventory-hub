import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Receipt, Plus } from 'lucide-react';

export default function Transactions() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transaksi</h1>
          <p className="text-muted-foreground mt-1">
            Kelola transaksi jual-beli kendaraan.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Transaksi Beli
          </Button>
          <Button className="btn-gradient">
            <Plus className="w-4 h-4 mr-2" />
            Transaksi Jual
          </Button>
        </div>
      </div>

      {/* Placeholder Content */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Receipt className="w-8 h-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl mb-2">Halaman Transaksi</CardTitle>
          <p className="text-muted-foreground text-center max-w-md">
            Fitur transaksi sedang dalam pengembangan. Di sini Anda dapat mencatat transaksi
            pembelian dan penjualan kendaraan, cetak invoice, dan kelola metode pembayaran.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
