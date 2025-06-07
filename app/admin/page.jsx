import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AdminDashboard from './AdminDashboard';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  return <AdminDashboard />;
}

