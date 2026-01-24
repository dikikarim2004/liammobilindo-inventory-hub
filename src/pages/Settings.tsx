import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="text-2xl font-bold">Pengaturan</h1>
        <p className="text-muted-foreground mt-1">
          Konfigurasi sistem dan preferensi aplikasi.
        </p>
      </div>

      {/* Placeholder Content */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <SettingsIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl mb-2">Halaman Pengaturan</CardTitle>
          <p className="text-muted-foreground text-center max-w-md">
            Fitur pengaturan sedang dalam pengembangan. Di sini Anda dapat mengatur profil
            showroom, format invoice, preferensi notifikasi, dan konfigurasi sistem lainnya.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
