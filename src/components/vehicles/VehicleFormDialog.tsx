import { useState, useEffect } from 'react';
import { Vehicle, VehicleStatus } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface VehicleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle?: Vehicle | null;
  onSubmit: (data: Partial<Vehicle>) => void;
}

const brands = ['Toyota', 'Honda', 'Suzuki', 'Mitsubishi', 'Daihatsu', 'Nissan', 'Mazda', 'Hyundai', 'Kia', 'Wuling'];
const colors = ['Hitam', 'Putih', 'Silver', 'Abu-abu', 'Merah', 'Biru', 'Coklat'];

export function VehicleFormDialog({
  open,
  onOpenChange,
  vehicle,
  onSubmit,
}: VehicleFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    chassisNumber: '',
    engineNumber: '',
    kilometers: 0,
    purchasePrice: 0,
    sellingPrice: 0,
    status: 'available',
    description: '',
  });

  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
    } else {
      setFormData({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        color: '',
        chassisNumber: '',
        engineNumber: '',
        kilometers: 0,
        purchasePrice: 0,
        sellingPrice: 0,
        status: 'available',
        description: '',
      });
    }
  }, [vehicle, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSubmit(formData);
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const updateField = (field: keyof Vehicle, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{vehicle ? 'Edit Kendaraan' : 'Tambah Kendaraan Baru'}</DialogTitle>
          <DialogDescription>
            {vehicle
              ? 'Perbarui informasi kendaraan di bawah ini.'
              : 'Masukkan informasi kendaraan baru.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand">Merek *</Label>
              <Select
                value={formData.brand}
                onValueChange={(value) => updateField('brand', value)}
              >
                <SelectTrigger className="input-focus">
                  <SelectValue placeholder="Pilih merek" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                placeholder="Contoh: Avanza G"
                value={formData.model}
                onChange={(e) => updateField('model', e.target.value)}
                className="input-focus"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Tahun *</Label>
              <Input
                id="year"
                type="number"
                min="2000"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={(e) => updateField('year', parseInt(e.target.value))}
                className="input-focus"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Warna *</Label>
              <Select
                value={formData.color}
                onValueChange={(value) => updateField('color', value)}
              >
                <SelectTrigger className="input-focus">
                  <SelectValue placeholder="Pilih warna" />
                </SelectTrigger>
                <SelectContent>
                  {colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="kilometers">Kilometer *</Label>
              <Input
                id="kilometers"
                type="number"
                min="0"
                value={formData.kilometers}
                onChange={(e) => updateField('kilometers', parseInt(e.target.value))}
                className="input-focus"
                required
              />
            </div>
          </div>

          {/* Identification */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chassisNumber">Nomor Rangka *</Label>
              <Input
                id="chassisNumber"
                placeholder="MHFM1BA3J1K123456"
                value={formData.chassisNumber}
                onChange={(e) => updateField('chassisNumber', e.target.value.toUpperCase())}
                className="input-focus font-mono"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="engineNumber">Nomor Mesin *</Label>
              <Input
                id="engineNumber"
                placeholder="1NR-VE123456"
                value={formData.engineNumber}
                onChange={(e) => updateField('engineNumber', e.target.value.toUpperCase())}
                className="input-focus font-mono"
                required
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Harga Beli (Rp) *</Label>
              <Input
                id="purchasePrice"
                type="number"
                min="0"
                step="1000000"
                value={formData.purchasePrice}
                onChange={(e) => updateField('purchasePrice', parseInt(e.target.value))}
                className="input-focus"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sellingPrice">Harga Jual (Rp) *</Label>
              <Input
                id="sellingPrice"
                type="number"
                min="0"
                step="1000000"
                value={formData.sellingPrice}
                onChange={(e) => updateField('sellingPrice', parseInt(e.target.value))}
                className="input-focus"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => updateField('status', value as VehicleStatus)}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Tersedia</SelectItem>
                <SelectItem value="reserved">Reservasi</SelectItem>
                <SelectItem value="sold">Terjual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              placeholder="Tambahkan catatan tentang kondisi kendaraan..."
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              className="input-focus min-h-[100px]"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="btn-gradient"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : vehicle ? (
                'Simpan Perubahan'
              ) : (
                'Tambah Kendaraan'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
