import { DashboardOrder } from '@/types/dashboard';
import { Mail, Phone } from 'lucide-react';

type Props = {
  order: DashboardOrder;
};

export default function OrderContactInformation({ order }: Props) {
  return (
    <div className="rounded-xl border bg-gray-50/70 p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Contact information</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="truncate font-medium">{order.email}</p>
          </div>
        </div>

        {order.dashboardOrderAddress.phone && (
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="font-medium">{order.dashboardOrderAddress.phone}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
