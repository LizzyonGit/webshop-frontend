import { OrderStatus, PaymentStatus } from '@/generated/prisma/enums';

export type OrderDetailItem = {
  id: string;
  title: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type OrderAddress = {
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

export type OrderDetail = {
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

  orderItems: OrderDetailItem[];

  shippingAddress: OrderAddress | null;
  billingAddress: OrderAddress | null;

  paidAt: Date | null;
  refundedAt: Date | null;
};

export type DashboardOrder = {
  id: string;
  orderNumber: number;
  createdAt: Date;
  status: OrderStatus;
  total: number;
};

export type Dashboard = {
  totalOrders: number;
  completedOrders: number;
  totalSpent: number;
  orders: DashboardOrder[];
};
