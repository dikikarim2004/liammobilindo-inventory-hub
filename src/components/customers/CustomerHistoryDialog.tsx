import { Customer, Transaction } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { History, ArrowDownCircle, ArrowUpCircle, Receipt } from 'lucide-react';
import { CustomerTypeBadge } from './CustomerTypeBadge';

interface CustomerHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
  transactions: Transaction[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export function CustomerHistoryDialog({ open, onOpenChange, customer, transactions }: CustomerHistoryDialogProps) {
  if (!customer) return null;

  const customerTransactions = transactions.filter((t) => t.customerId === customer.id);
  const totalAmount = customerTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Riwayat Transaksi
          </DialogTitle>
          <DialogDescription>
            Daftar semua transaksi konsumen ini dengan showroom.
          </DialogDescription>
        </DialogHeader>

        {/* Customer Summary */}
        <Card className="bg-muted/50">
          <CardContent className="pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">{customer.name}</h3>
                <p className="text-sm text-muted-foreground">{customer.phone}</p>
              </div>
              <div className="flex items-center gap-4">
                <CustomerTypeBadge type={customer.type} />
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Transaksi</p>
                  <p className="font-semibold text-lg">{customerTransactions.length} kali</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Nilai</p>
                  <p className="font-semibold text-lg text-primary">{formatCurrency(totalAmount)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction List */}
        {customerTransactions.length > 0 ? (
          <div className="rounded-lg border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Tanggal</TableHead>
                  <TableHead className="font-semibold">Tipe</TableHead>
                  <TableHead className="font-semibold">Nilai</TableHead>
                  <TableHead className="font-semibold">Metode</TableHead>
                  <TableHead className="font-semibold">Catatan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {transaction.type === 'purchase' ? (
                          <>
                            <ArrowDownCircle className="w-4 h-4 text-primary" />
                            <span className="text-primary">Pembelian</span>
                          </>
                        ) : (
                          <>
                            <ArrowUpCircle className="w-4 h-4 text-accent" />
                            <span className="text-accent">Penjualan</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {transaction.paymentMethod === 'cash'
                          ? 'Tunai'
                          : transaction.paymentMethod === 'transfer'
                          ? 'Transfer'
                          : 'Kredit'}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-muted-foreground">
                      {transaction.notes || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Receipt className="w-8 h-8 text-muted-foreground" />
            </div>
            <h4 className="font-medium mb-1">Belum Ada Transaksi</h4>
            <p className="text-sm text-muted-foreground max-w-sm">
              Konsumen ini belum memiliki riwayat transaksi dengan showroom.
            </p>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
