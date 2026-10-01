export type DashboardOrder = {
  id: string;
  orderNumber: number;
  createdAt: Date;
  status: string;
  price: number;
};

export type Dashboard = {
  totalOrders: number;
  completedOrders: number;
  totalSpent: number;
  orders: DashboardOrder[];
};
