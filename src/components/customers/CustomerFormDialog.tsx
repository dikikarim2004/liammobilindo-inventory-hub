import { useEffect, useState } from 'react';
import { Customer, CustomerType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserPlus, User } from 'lucide-react';

interface CustomerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer?: Customer | null;
  onSubmit: (data: Partial<Customer>) => void;
}

export function CustomerFormDialog({ open, onOpenChange, customer, onSubmit }: CustomerFormDialogProps) {
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: '',
    type: 'buyer',
    phone: '',
    email: '',
    address: '',
    idNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        type: customer.type,
        phone: customer.phone,
        email: customer.email || '',
        address: customer.address,
        idNumber: customer.idNumber,
      });
    } else {
      setFormData({
        name: '',
        type: 'buyer',
        phone: '',
        email: '',
        address: '',
        idNumber: '',
      });
    }
    setErrors({});
  }, [customer, open]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Nama wajib diisi';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Nama maksimal 100 karakter';
    }

    if (!formData.type) {
      newErrors.type = 'Tipe konsumen wajib dipilih';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi';
    } else if (!/^[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Nomor telepon tidak valid (10-15 digit)';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.address?.trim()) {
      newErrors.address = 'Alamat wajib diisi';
    } else if (formData.address.length > 500) {
      newErrors.address = 'Alamat maksimal 500 karakter';
    }

    if (!formData.idNumber?.trim()) {
      newErrors.idNumber = 'Nomor KTP wajib diisi';
    } else if (!/^[0-9]{16}$/.test(formData.idNumber)) {
      newErrors.idNumber = 'Nomor KTP harus 16 digit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onOpenChange(false);
    }
  };

  const isEditing = !!customer;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEditing ? (
              <>
                <User className="w-5 h-5" />
                Edit Konsumen
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Tambah Konsumen Baru
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Ubah data konsumen yang sudah terdaftar.'
              : 'Masukkan data konsumen baru ke dalam sistem.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tipe Konsumen */}
          <div className="space-y-2">
            <Label htmlFor="type">Tipe Konsumen *</Label>
            <Select
              value={formData.type}
              onValueChange={(value: CustomerType) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger id="type" className={errors.type ? 'border-destructive' : ''}>
                <SelectValue placeholder="Pilih tipe konsumen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seller">Penjual (Menjual mobil ke showroom)</SelectItem>
                <SelectItem value="buyer">Pembeli (Membeli mobil dari showroom)</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
          </div>

          {/* Nama */}
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Masukkan nama lengkap"
              className={errors.name ? 'border-destructive' : ''}
              maxLength={100}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          {/* Telepon & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                placeholder="081234567890"
                className={errors.phone ? 'border-destructive' : ''}
                maxLength={15}
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className={errors.email ? 'border-destructive' : ''}
                maxLength={255}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
          </div>

          {/* No KTP */}
          <div className="space-y-2">
            <Label htmlFor="idNumber">Nomor KTP *</Label>
            <Input
              id="idNumber"
              value={formData.idNumber}
              onChange={(e) => setFormData({ ...formData, idNumber: e.target.value.replace(/\D/g, '') })}
              placeholder="16 digit nomor KTP"
              className={errors.idNumber ? 'border-destructive' : ''}
              maxLength={16}
            />
            {errors.idNumber && <p className="text-sm text-destructive">{errors.idNumber}</p>}
          </div>

          {/* Alamat */}
          <div className="space-y-2">
            <Label htmlFor="address">Alamat Lengkap *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Masukkan alamat lengkap"
              className={errors.address ? 'border-destructive' : ''}
              rows={3}
              maxLength={500}
            />
            {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" className="btn-gradient">
              {isEditing ? 'Simpan Perubahan' : 'Tambah Konsumen'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
