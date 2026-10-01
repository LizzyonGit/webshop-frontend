import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { LogoutButton } from '@/components/auth/logout-button';
import { DashboardRepository } from '@/repositories/dashboard-repository';
import { Smile } from 'lucide-react';
import Orders from '@/components/orders';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  if (session.user.role === 'ADMIN') {
    redirect('/admin');
  }

  const dashboardRepository = new DashboardRepository();
  const dashboardData = await dashboardRepository.getUserDashboard(session.user.id);

  const orders = dashboardData?.orders;

  return (
    <section className="min-h-screen w-full bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
              <Smile className="h-8 w-8" />
              Hello, {session.user.name}!
            </h1>
            <p className="mt-2 text-muted-foreground">Heres an overview of your orders.</p>
          </div>

          <LogoutButton />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="mt-2 text-3xl font-bold">{dashboardData?.totalOrders}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Completed Orders</p>
            <p className="mt-2 text-3xl font-bold">{dashboardData?.completedOrders}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="mt-2 text-3xl font-bold">{`${dashboardData?.totalSpent}`} €</p>
          </div>
        </div>

        {/* Orders */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">History of orders</h2>
          </div>

          <Orders orders={orders} />
        </div>
      </div>
    </section>
  );
}
