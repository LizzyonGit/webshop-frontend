import { DashboardOrderItem } from '@/types/dashboard';

type Props = {
  orders: DashboardOrderItem[];
};

export default function OrderItems({ orders }: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
      <h2 className="mb-6 text-xl font-semibold">Order items</h2>

      <div className="space-y-5">
        {orders.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-5 last:border-0 last:pb-0">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.quantity} × €{item.unitPrice.toFixed(2)}
              </p>
            </div>
            <p className="font-semibold">€{item.lineTotal.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
