import { Dashboard, DashboardOrder, DashboardOrderAddress, DashboardOrderDetail } from '@/types/dashboard';

import { Prisma } from '@/generated/prisma/client';
export type DashboardOrderData = Prisma.OrderGetPayload<{
  include: {
    items: true;
    addresses: true;
  };
}>;

export class DashboardMapper {
  static mapOrderDboToOrder(order: DashboardOrderData): DashboardOrder {
    const shippingAddress = order.addresses.find((address) => address.type === 'SHIPPING');

    if (!shippingAddress) {
      throw new Error(`Shipping address missing for order ${order.id}`);
    }

    const dashboardOrderAddress: DashboardOrderAddress = {
      fullName: shippingAddress.fullName,
      company: shippingAddress.company ?? '',
      line1: shippingAddress.line1,
      line2: shippingAddress.line2 ?? '',
      city: shippingAddress.city,
      state: shippingAddress.state ?? '',
      postalCode: shippingAddress.postalCode,
      country: shippingAddress.country,
      phone: shippingAddress.phone ?? '',
    };

    return {
      id: order.id,
      orderNumber: order.orderNumber,
      createdAt: order.createdAt,
      status: order.status,
      paymentStatus: order.paymentStatus,
      email: order.email,

      subtotal: Number(order.subtotal),
      shippingTotal: Number(order.shippingTotal),
      taxTotal: Number(order.taxTotal),
      discountTotal: Number(order.discountTotal),
      total: Number(order.total),

      currency: order.currency,

      orderItems: order.items.map((orderItem) => ({
        id: orderItem.id,
        title: orderItem.title,
        createdAt: orderItem.createdAt,
        unitPrice: Number(orderItem.unitPrice),
        quantity: orderItem.quantity,
        lineTotal: Number(orderItem.lineTotal),
      })),

      dashboardOrderAddress: dashboardOrderAddress,
    };
  }

  static mapOrderDataToOrderDetail(DashboardOrderData: DashboardOrder): DashboardOrderDetail {
    return {
      id: DashboardOrderData.id,
      orderNumber: DashboardOrderData.orderNumber,
      createdAt: DashboardOrderData.createdAt,
      status: DashboardOrderData.status,
      paymentStatus: DashboardOrderData.paymentStatus,
      email: DashboardOrderData.email,
      subtotal: DashboardOrderData.subtotal,
      shippingTotal: DashboardOrderData.shippingTotal,
      taxTotal: DashboardOrderData.taxTotal,
      discountTotal: DashboardOrderData.discountTotal,
      total: DashboardOrderData.total,
      currency: DashboardOrderData.currency,
      orderItems: DashboardOrderData.orderItems,
      dashboardOrderAddress: DashboardOrderData.dashboardOrderAddress,
    };
  }

  static mapOrdersToDashboard(orderData: DashboardOrderData[]): Dashboard {
    const orders = orderData.map((order) => this.mapOrderDboToOrder(order));

    const totalOrders = orders.length;

    const completedOrders = orders.filter((order) => order.status === 'DELIVERED').length;

    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

    return {
      totalOrders,
      completedOrders,
      totalSpent,
      orders,
    };
  }
}
