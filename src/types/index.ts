// User & Auth Types
export type UserRole = 'super_admin' | 'stock_manager' | 'cashier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

// Vehicle Types
export type VehicleStatus = 'available' | 'sold' | 'reserved';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  chassisNumber: string;
  engineNumber: string;
  kilometers: number;
  purchasePrice: number;
  sellingPrice: number;
  status: VehicleStatus;
  photos: string[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VehicleCost {
  id: string;
  vehicleId: string;
  category: 'fuel' | 'service' | 'repair' | 'advertising' | 'other';
  description: string;
  amount: number;
  date: Date;
}

// Customer Types
export type CustomerType = 'seller' | 'buyer';

export interface Customer {
  id: string;
  name: string;
  type: CustomerType;
  phone: string;
  email?: string;
  address: string;
  idNumber: string; // KTP
  createdAt: Date;
}

// Transaction Types
export type TransactionType = 'purchase' | 'sale';
export type PaymentMethod = 'cash' | 'transfer' | 'credit';

export interface Transaction {
  id: string;
  type: TransactionType;
  vehicleId: string;
  customerId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  date: Date;
  notes?: string;
  createdAt: Date;
}

// Dashboard Stats
export interface DashboardStats {
  totalStock: number;
  soldThisMonth: number;
  revenue: number;
  netProfit: number;
  stockChange: number;
  soldChange: number;
  revenueChange: number;
  profitChange: number;
}

// Chart Data
export interface SalesChartData {
  month: string;
  sales: number;
  revenue: number;
}

export interface StockByBrandData {
  brand: string;
  count: number;
  fill: string;
}
