import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/layout/Sidebar';
import { TopBar } from '../../components/layout/TopBar';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <TopBar />
      <main className="ml-[240px] p-4 pt-20">
        <Outlet />
      </main>
    </div>
  );
}