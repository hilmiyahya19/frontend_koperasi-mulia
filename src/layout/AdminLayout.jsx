import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar/Sidebar';

const AdminLayout = ({ onLogout }) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar onLogout={onLogout} />
      <main className="flex-1 w-full sm:w-auto overflow-x-auto md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
