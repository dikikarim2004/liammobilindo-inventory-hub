import { useState } from 'react';
import { Vehicle } from '@/types';
import { mockVehicles } from '@/data/mockVehicles';
import { VehicleTable } from '@/components/vehicles/VehicleTable';
import { VehicleFormDialog } from '@/components/vehicles/VehicleFormDialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, Car } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [deleteVehicle, setDeleteVehicle] = useState<Vehicle | null>(null);
  const { toast } = useToast();

  const handleAdd = () => {
    setSelectedVehicle(null);
    setFormOpen(true);
  };

  const handleView = (vehicle: Vehicle) => {
    // Navigate to detail page (for now, show toast)
    toast({
      title: 'Detail Kendaraan',
      description: `${vehicle.brand} ${vehicle.model} - ${vehicle.chassisNumber}`,
    });
  };

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setFormOpen(true);
  };

  const handleDelete = (vehicle: Vehicle) => {
    setDeleteVehicle(vehicle);
  };

  const confirmDelete = () => {
    if (deleteVehicle) {
      setVehicles((prev) => prev.filter((v) => v.id !== deleteVehicle.id));
      toast({
        title: 'Kendaraan Dihapus',
        description: `${deleteVehicle.brand} ${deleteVehicle.model} telah dihapus dari sistem.`,
      });
      setDeleteVehicle(null);
    }
  };

  const handleSubmit = (data: Partial<Vehicle>) => {
    if (selectedVehicle) {
      // Edit existing
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === selectedVehicle.id
            ? { ...v, ...data, updatedAt: new Date() }
            : v
        )
      );
      toast({
        title: 'Kendaraan Diperbarui',
        description: `${data.brand} ${data.model} berhasil diperbarui.`,
      });
    } else {
      // Add new
      const newVehicle: Vehicle = {
        id: Date.now().toString(),
        brand: data.brand!,
        model: data.model!,
        year: data.year!,
        color: data.color!,
        chassisNumber: data.chassisNumber!,
        engineNumber: data.engineNumber!,
        kilometers: data.kilometers!,
        purchasePrice: data.purchasePrice!,
        sellingPrice: data.sellingPrice!,
        status: data.status || 'available',
        photos: [],
        description: data.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setVehicles((prev) => [newVehicle, ...prev]);
      toast({
        title: 'Kendaraan Ditambahkan',
        description: `${data.brand} ${data.model} berhasil ditambahkan.`,
      });
    }
  };

  const stats = {
    total: vehicles.length,
    available: vehicles.filter((v) => v.status === 'available').length,
    reserved: vehicles.filter((v) => v.status === 'reserved').length,
    sold: vehicles.filter((v) => v.status === 'sold').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Kendaraan</h1>
          <p className="text-muted-foreground mt-1">
            Kelola data stok kendaraan showroom.
          </p>
        </div>
        <Button onClick={handleAdd} className="btn-gradient">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Kendaraan
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-card border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Stok</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-card border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Car className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.available}</p>
              <p className="text-sm text-muted-foreground">Tersedia</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-card border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Car className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.reserved}</p>
              <p className="text-sm text-muted-foreground">Reservasi</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-card border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Car className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.sold}</p>
              <p className="text-sm text-muted-foreground">Terjual</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Table */}
      <VehicleTable
        vehicles={vehicles}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Form Dialog */}
      <VehicleFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        vehicle={selectedVehicle}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteVehicle} onOpenChange={() => setDeleteVehicle(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Kendaraan?</AlertDialogTitle>
            <AlertDialogDescription>
              Anda yakin ingin menghapus{' '}
              <strong>
                {deleteVehicle?.brand} {deleteVehicle?.model}
              </strong>
              ? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
