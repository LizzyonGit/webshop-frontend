import { Badge } from '@/components/ui/badge';
import { auth } from '@/lib/auth';
import { DashboardRepository } from '@/repositories/dashboard-repository';
import { DashboardOrderDetail } from '@/types/dashboard';
import { ReceiptText, MapPin, Mail, Phone, ArrowLeft } from 'lucide-react';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import OrderItems from '@/components/order-items';
import OrderSummuary from '@/components/order-summary';
import OrderShippingInformation from '@/components/order-shipping-information';
import OrderContactInformation from '@/components/order-contact-information';
import Link from 'next/link';

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
        {/* Back button */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to orders
        </Link>

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
          <OrderSummuary order={order} />
        </div>

        {/* Shipping & contact information */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Shipping information</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <OrderShippingInformation orderAdress={order.dashboardOrderAddress} />
            <OrderContactInformation order={order} />
          </div>
        </div>
      </div>
    </section>
  );
}

function OrderStatus({ status }: { status: string }) {
  switch (status) {
    case 'DELIVERED':
      return <Badge variant="default">Delivered</Badge>;

    case 'SHIPPED':
      return <Badge variant="secondary">Shipped</Badge>;

    case 'PROCESSING':
      return <Badge variant="outline">Processing</Badge>;

    case 'PENDING':
      return <Badge variant="outline">Pending</Badge>;

    case 'CANCELLED':
      return <Badge variant="destructive">Cancelled</Badge>;

    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
