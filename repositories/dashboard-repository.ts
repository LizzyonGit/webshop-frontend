import { prisma } from '@/lib/prisma';
import { DashboardMapper } from '@/mapping/dashboard-mapper';
import { Dashboard, DashboardOrderDetail } from '@/types/dashboard';

export class DashboardRepository {
  async getDashboardOrderDetail(orderId: string): Promise<DashboardOrderDetail | null> {
    try {
      const order = await prisma.order.findFirst({
        where: {
          id: orderId,
        },
        include: {
          items: true,
          addresses: true,
        },
      });

      if (!order) {
        return null;
      }

      const dashboardOrder = DashboardMapper.mapOrderDboToOrder(order);

      return DashboardMapper.mapOrderDataToOrderDetail(dashboardOrder);
    } catch (error) {
      console.error('Failed to get order detail data:', error);

      throw new Error('Failed to fetch order detail data');
    }
  }

  async getDashboard(userId: string): Promise<Dashboard> {
    try {
      const orders = await prisma.order.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          items: true,
          addresses: true,
        },
      });

      //Mapping Order Data to dashboard type
      const dashboard = DashboardMapper.mapOrdersToDashboard(orders);

      return dashboard;
    } catch (error) {
      console.error('Failed to get user dashboard:', error);

      throw new Error('Failed to fetch user dashboard');
    }
  }
}
