import { auth } from '@/lib/auth';
import { DashboardRepository } from '@/repositories/dashboard-repository';
import { Dashboard } from '@/types/dashboard';
import { headers } from 'next/headers';

export default async function OrderDetailPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const dashboardRepository = new DashboardRepository();
  const data: Dashboard = await dashboardRepository.getDashboard(session.user.id);
  console.log(data);
}
