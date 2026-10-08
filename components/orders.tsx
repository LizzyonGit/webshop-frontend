import { Eye } from 'lucide-react';
import Link from 'next/link';
import { DashboardOrder } from '@/types/dashboard';
import { Badge } from '@/components/ui/badge';

type OrdersProps = {
  orders: DashboardOrder[];
};

export default function Orders({ orders }: OrdersProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <p className="mt-1 text-sm text-muted-foreground">Your latest orders</p>
        </div>
        <span className="text-sm text-muted-foreground">{orders.length} orders</span>
      </div>

      {orders.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="divide-y">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between gap-4 py-4">
              <div className="min-w-0">
                <p className="font-medium">Order #{order.orderNumber}</p>
                <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
              </div>

              <div className="hidden sm:block">
                <OrderStatus status={order.status} />
              </div>

              <p className="font-semibold whitespace-nowrap">{order.total.toFixed(2)} €</p>
              <Link className="flex gap-2 items-center" href={`/dashboard/order/${order.id}`}>
                <Eye className="h-5 w-5"></Eye>
                <span>View</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
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
