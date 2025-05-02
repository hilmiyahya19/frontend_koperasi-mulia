import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AuthContext } from './App';
import Dashboard from './components/admin/Dashboard/Dashboard';
import UserLayout from './layout/UserLayout';
import AdminLayout from './layout/AdminLayout';
import Home from './pages/user/Home';
import MemberLayout from './layout/MemberLayout';
import MemberLogin from './components/member/MemberLogin/MemberLogin';
import MemberPage from './components/member/MemberPage/MemberPage';
import MemberRegister from './components/member/MemberRegister/MemberRegister';
import AdminLogin from './components/admin/AdminLogin';
import ProtectedMemberRoute from "./components/protected/ProtectedMemberRoute";
import ManageAdmins from './components/admin/ManageAdmins';
import ManageMembers from './components/admin/ManageMembers';
import ManageProducts from './components/admin/ManageProducts';
import ManageSales from './components/admin/ManageSales';
import ManagePurchases from './components/admin/ManagePurchases';
import ManageFinances from './components/admin/ManageFinances';
// import ManagePromotions from './components/admin/landing-page/ManagePromotions';
import ManageArticles from './components/admin/landing-page/ManageArticles';
import ManageActivities from './components/admin/landing-page/ManageActivities';
import NotFoundPage from './pages/NotFoundPage';
import AllProducts from './components/user/AllProducts/AllProducts';
import CatalogLayout from './layout/CatalogLayout';

const AppRouter = () => {
    const { token, role, setToken, setRole } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const memberId = localStorage.getItem('memberId'); // Ambil ID member dari localStorage
    const adminId = localStorage.getItem('adminId'); // Ambil ID member dari localStorage

    useEffect(() => {
        if (role === 'admin' && location.pathname === '/admin/login' && adminId) {
            navigate('/admin');
        } else if (!role && location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
            navigate('/admin/login');
        } else if (role === 'member' && !memberId) {
            navigate('/member/login'); // Jika role member tapi tidak ada ID, arahkan ke login
        } else if (!role && location.pathname.startsWith('/member')) {  
            navigate('/member/login'); // Jika tidak ada role dan akses ke /member atau /member/:id, redirect ke login
        }
    }, [role, adminId, memberId, location, navigate]);
    
    const handleLogout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('memberId'); // Hapus ID member saat logout
        localStorage.removeItem('adminId'); // Hapus ID admin saat logout
        navigate('/');
    };

    return (
        <Routes>
            {/* Layout untuk user */}
            <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />
            </Route>

             {/* Layout untuk produk */}
            <Route path="/produk" element={<CatalogLayout />}>
                <Route index element={<AllProducts />} />
            </Route>

            {/* Layout untuk anggota */}
            <Route path="/member/login" element={<MemberLogin setToken={setToken} setRole={setRole} />} />
            <Route path="/member/register" element={<MemberRegister />} /> 
            <Route path="/member/:id" element={
                <ProtectedMemberRoute>
                    <MemberLayout />
                </ProtectedMemberRoute>
            }>
                <Route index element={<MemberPage onLogout={handleLogout} />} />
            </Route>

            {/* Layout untuk admin */}
            <Route path="/admin/login" element={<AdminLogin setToken={setToken} setRole={setRole} />} />
            <Route path="/admin" element={token && adminId ? <AdminLayout onLogout={handleLogout} /> : <Navigate to="/admin/login" />}>
                <Route index element={<Dashboard onLogout={handleLogout} />} />
                {/* Manajemen admin khusus superAdmin */}
                {role === "superAdmin" && (
                    <>
                        <Route path="manage-admins" element={<ManageAdmins />} />
                    </>
                )}
                <Route path="manage-members" element={<ManageMembers />} />
                <Route path="manage-products" element={<ManageProducts />} />
                <Route path="manage-sales" element={<ManageSales />} />
                <Route path="manage-purchases" element={<ManagePurchases />} />
                <Route path="manage-finances" element={<ManageFinances />} />
                {/* <Route path="manage-promotions" element={<ManagePromotions />} /> */}
                <Route path="manage-articles" element={<ManageArticles />} />
                <Route path="manage-activities" element={<ManageActivities />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;
