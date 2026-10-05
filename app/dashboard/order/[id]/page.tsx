import { Badge } from '@/components/ui/badge';
import { auth } from '@/lib/auth';
import { DashboardRepository } from '@/repositories/dashboard-repository';
import { DashboardOrderDetail } from '@/types/dashboard';
import { OrderStatus } from '@/generated/prisma/enums';
import { ReceiptText, MapPin, Mail, Phone } from 'lucide-react';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import OrderItems from '@/components/order-items';

type Props = {
  params: Promise<{
    orderId: string;
  }>;
};

export default async function OrderDetailPage({ params }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  const { orderId } = await params;

  const dashboardRepository = new DashboardRepository();

  const order: DashboardOrderDetail | null = await dashboardRepository.getDashboardOrderDetail(orderId);

  if (!order) {
    notFound();
  }

  return (
    <section className="min-h-screen w-full bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Order header */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
              <ReceiptText className="h-8 w-8" />
              Order #{order.orderNumber}
            </h1>

            <p className="mt-2 text-muted-foreground">Here are the details of your order.</p>
            <p className="mt-1 text-sm text-muted-foreground">Placed on {order.createdAt.toLocaleDateString()}</p>
          </div>

          <OrderStatus status={order.status} />
        </div>

        {/* Order items + summary */}
        <div className="grid gap-6 lg:grid-cols-3">
          <OrderItems orders={order.orderItems} />

          {/* Order summary */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">Order summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>€{order.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>€{order.shippingTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>€{order.taxTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span>€{order.discountTotal.toFixed(2)}</span>
              </div>

              <div className="my-4 border-t" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>€{order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment status */}
            <div className="mt-6 border-t pt-5">
              <p className="text-sm text-muted-foreground">Payment status</p>

              <p className="mt-1 font-medium">{order.paymentStatus}</p>
            </div>
          </div>
        </div>

        {/* Shipping information */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-2">
            <MapPin className="h-5 w-5" />

            <h2 className="text-xl font-semibold">Shipping information</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Address */}
            <div>
              <p className="font-medium">{order.dashboardOrderAddress.fullName}</p>

              {order.dashboardOrderAddress.company && <p className="text-muted-foreground">{order.dashboardOrderAddress.company}</p>}

              <p className="text-muted-foreground">{order.dashboardOrderAddress.line1}</p>

              {order.dashboardOrderAddress.line2 && <p className="text-muted-foreground">{order.dashboardOrderAddress.line2}</p>}

              <p className="text-muted-foreground">
                {order.dashboardOrderAddress.postalCode} {order.dashboardOrderAddress.city}
              </p>

              {order.dashboardOrderAddress.state && <p className="text-muted-foreground">{order.dashboardOrderAddress.state}</p>}

              <p className="text-muted-foreground">{order.dashboardOrderAddress.country}</p>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{order.email}</p>
                </div>
              </div>

              {order.dashboardOrderAddress.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />

                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>{order.dashboardOrderAddress.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrderStatus({ status }: { status: OrderStatus }) {
  switch (status) {
    case 'DELIVERED':
      return <Badge className="px-3 py-1 text-sm">Delivered</Badge>;

    case 'SHIPPED':
      return (
        <Badge variant="secondary" className="px-3 py-1 text-sm">
          Shipped
        </Badge>
      );

    case 'PROCESSING':
      return (
        <Badge variant="outline" className="px-3 py-1 text-sm">
          Processing
        </Badge>
      );

    case 'PENDING':
      return (
        <Badge variant="outline" className="px-3 py-1 text-sm">
          Pending
        </Badge>
      );

    case 'CANCELLED':
      return (
        <Badge variant="destructive" className="px-3 py-1 text-sm">
          Cancelled
        </Badge>
      );

    default:
      return (
        <Badge variant="outline" className="px-3 py-1 text-sm">
          {status}
        </Badge>
      );
  }
}
