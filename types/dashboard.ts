import { OrderStatus, PaymentStatus } from '@/generated/prisma/enums';

export type DashboardOrderItem = {
  id: string;
  title: string;
  createdAt: Date;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type DashboardOrderAddress = {
  fullName: string;
  company?: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
};

export type DashboardOrderDetail = {
  id: string;
  orderNumber: number;
  createdAt: Date;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  email: string;
  subtotal: number;
  shippingTotal: number;
  taxTotal: number;
  discountTotal: number;
  total: number;
  currency: string;
  orderItems: DashboardOrderItem[];
  dashboardOrderAddress: DashboardOrderAddress;
};

export type DashboardOrder = {
  id: string;
  orderNumber: number;
  createdAt: Date;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  email: string;

  subtotal: number;
  shippingTotal: number;
  taxTotal: number;
  discountTotal: number;
  total: number;
  currency: string;
  orderItems: DashboardOrderItem[];
  dashboardOrderAddress: DashboardOrderAddress;
};

export type Dashboard = {
  totalOrders: number;
  completedOrders: number;
  totalSpent: number;
  orders: DashboardOrder[];
};
