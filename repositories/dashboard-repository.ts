import { prisma } from '@/lib/prisma';
import { Dashboard } from '@/types/dashboard';

export class DashboardRepository {
  async getUserDashboard(userId: string): Promise<Dashboard> {
    try {
      const orderList = await prisma.order.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const orders = orderList.map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        createdAt: order.createdAt,
        status: order.status,
        total: Number(order.total),
      }));

      const totalOrders = orders.length;

      const completedOrders = orders.filter((order) => order.status === 'DELIVERED').length;

      const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

      return {
        totalOrders,
        completedOrders,
        totalSpent,
        orders,
      };
    } catch (error) {
      console.error('Failed to get user dashboard:', error);

      throw new Error('Failed to fetch user dashboard');
    }
  }
}
