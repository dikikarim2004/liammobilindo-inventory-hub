import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCog, UserPlus } from 'lucide-react';

export default function Users() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Pengguna</h1>
          <p className="text-muted-foreground mt-1">
            Kelola akun pengguna dan hak akses sistem.
          </p>
        </div>
        <Button className="btn-gradient">
          <UserPlus className="w-4 h-4 mr-2" />
          Tambah Pengguna
        </Button>
      </div>

      {/* Placeholder Content */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <UserCog className="w-8 h-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl mb-2">Halaman Manajemen Pengguna</CardTitle>
          <p className="text-muted-foreground text-center max-w-md">
            Fitur manajemen pengguna sedang dalam pengembangan. Di sini Super Admin dapat
            menambah, mengedit, dan menghapus akun pengguna serta mengatur role (Super Admin,
            Stok Kendaraan, Kasir).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
