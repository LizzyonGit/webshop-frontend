import { DashboardOrderDetail } from '@/types/dashboard';

type Props = {
  order: DashboardOrderDetail;
};

export default function OrderSummuary({ order }: Props) {
  return (
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
  );
}
