import { useState } from 'react';
import { Customer } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Users, UserPlus, UserCheck, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockCustomers, mockTransactions } from '@/data/mockCustomers';
import { CustomerTable } from '@/components/customers/CustomerTable';
import { CustomerFormDialog } from '@/components/customers/CustomerFormDialog';
import { CustomerDetailDialog } from '@/components/customers/CustomerDetailDialog';
import { CustomerHistoryDialog } from '@/components/customers/CustomerHistoryDialog';

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [deleteCustomer, setDeleteCustomer] = useState<Customer | null>(null);
  const [detailCustomer, setDetailCustomer] = useState<Customer | null>(null);
  const [historyCustomer, setHistoryCustomer] = useState<Customer | null>(null);
  const { toast } = useToast();

  const handleAdd = () => {
    setSelectedCustomer(null);
    setFormOpen(true);
  };

  const handleView = (customer: Customer) => {
    setDetailCustomer(customer);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setFormOpen(true);
  };

  const handleDelete = (customer: Customer) => {
    setDeleteCustomer(customer);
  };

  const handleViewHistory = (customer: Customer) => {
    setHistoryCustomer(customer);
  };

  const confirmDelete = () => {
    if (deleteCustomer) {
      setCustomers((prev) => prev.filter((c) => c.id !== deleteCustomer.id));
      toast({
        title: 'Konsumen Dihapus',
        description: `${deleteCustomer.name} telah dihapus dari sistem.`,
      });
      setDeleteCustomer(null);
    }
  };

  const handleSubmit = (data: Partial<Customer>) => {
    if (selectedCustomer) {
      // Edit existing
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === selectedCustomer.id
            ? { ...c, ...data }
            : c
        )
      );
      toast({
        title: 'Konsumen Diperbarui',
        description: `${data.name} berhasil diperbarui.`,
      });
    } else {
      // Add new
      const newCustomer: Customer = {
        id: Date.now().toString(),
        name: data.name!,
        type: data.type!,
        phone: data.phone!,
        email: data.email,
        address: data.address!,
        idNumber: data.idNumber!,
        createdAt: new Date(),
      };
      setCustomers((prev) => [newCustomer, ...prev]);
      toast({
        title: 'Konsumen Ditambahkan',
        description: `${data.name} berhasil ditambahkan.`,
      });
    }
  };

  const stats = {
    total: customers.length,
    sellers: customers.filter((c) => c.type === 'seller').length,
    buyers: customers.filter((c) => c.type === 'buyer').length,
  };

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
        <Button className="btn-gradient" onClick={handleAdd}>
          <UserPlus className="w-4 h-4 mr-2" />
          Tambah Konsumen
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Konsumen
            </CardTitle>
            <Users className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Terdaftar di sistem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Penjual
            </CardTitle>
            <UserCheck className="w-5 h-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.sellers}</div>
            <p className="text-xs text-muted-foreground">Menjual mobil ke showroom</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pembeli
            </CardTitle>
            <ShoppingCart className="w-5 h-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.buyers}</div>
            <p className="text-xs text-muted-foreground">Membeli mobil dari showroom</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Konsumen</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerTable
            customers={customers}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewHistory={handleViewHistory}
          />
        </CardContent>
      </Card>

      {/* Form Dialog */}
      <CustomerFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        customer={selectedCustomer}
        onSubmit={handleSubmit}
      />

      {/* Detail Dialog */}
      <CustomerDetailDialog
        open={!!detailCustomer}
        onOpenChange={(open) => !open && setDetailCustomer(null)}
        customer={detailCustomer}
      />

      {/* History Dialog */}
      <CustomerHistoryDialog
        open={!!historyCustomer}
        onOpenChange={(open) => !open && setHistoryCustomer(null)}
        customer={historyCustomer}
        transactions={mockTransactions}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteCustomer} onOpenChange={(open) => !open && setDeleteCustomer(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Konsumen?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus <strong>{deleteCustomer?.name}</strong> dari sistem?
              Tindakan ini tidak dapat dibatalkan.
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
