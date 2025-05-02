import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../../App";
import { FiMenu, FiX, FiHome, FiUsers, FiDollarSign, FiLogOut, FiUserCheck, FiPackage, FiShoppingCart, FiCreditCard, FiTag, FiFileText, FiCalendar } from "react-icons/fi";
import Swal from "sweetalert2";

const Sidebar = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { role } = useContext(AuthContext); // Ambil role dari context

    const handleLogout = () => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Anda akan keluar dari akun admin!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Logout",
            cancelButtonText: "Batal"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Logout Berhasil!",
                    text: "Anda telah keluar.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });

                setTimeout(() => {
                    onLogout();
                }, 2000);
            }
        });
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 p-5 transition-transform duration-300 ease-in-out overflow-y-auto h-screen ${isOpen ? 'translate-x-0' : '-translate-x-64'} sm:translate-x-0`}>
                <h2 className="text-2xl font-bold mb-6 text-center md:text-start text-green-400">Admin Page</h2>
                <nav className="space-y-4">
                    <Link to="/admin" className={`flex items-center space-x-3 p-3 rounded-md hover:bg-gray-800 text-gray-300 hover:text-green-400 ${location.pathname === '/admin' ? 'bg-gray-800 text-green-400' : ''}`}>
                        <FiHome />
                        <span>Dashboard</span>
                    </Link>

                    {/* Hanya SuperAdmin yang bisa melihat Manajemen Admin */}
                    {role === "superAdmin" && (
                    <Link to="/admin/manage-admins" className={`flex items-center space-x-3 p-3 rounded-md hover:bg-gray-800 text-gray-300 hover:text-green-400 ${location.pathname === '/admin/manage-admins' ? 'bg-gray-800 text-green-400' : ''}`}>
                        <FiUserCheck />
                        <span>Manajemen Admin</span>
                    </Link>
                    )}

                    <Link to="/admin/manage-members" className={`flex items-center space-x-3 p-3 rounded-md hover:bg-gray-800 text-gray-300 hover:text-green-400 ${location.pathname === '/admin/manage-members' ? 'bg-gray-800 text-green-400' : ''}`}>
                        <FiUsers />
                        <span>Manajemen Anggota</span>
                    </Link>
                    <Link to="/admin/manage-products" className={`flex items-center space-x-3 p-3 rounded-md hover:bg-gray-800 text-gray-300 hover:text-green-400 ${location.pathname === '/admin/manage-products' ? 'bg-gray-800 text-green-400' : ''}`}>
                        <FiPackage />
                        <span>Manajemen Produk</span>
                    </Link>
                    <Link to="/admin/manage-sales" className={`flex items-center space-x-3 p-3 rounded-md hover:bg-gray-800 text-gray-300 hover:text-green-400 ${location.pathname === '/admin/manage-sales' ? 'bg-gray-800 text-green-400' : ''}`}>
                        <FiShoppingCart />
                        <span>Manajemen Penjualan</span>
                    </Link>
                    <Link to="/admin/manage-purchases" className={`flex items-center space-x-3 p-3 rounded-md hover:bg-gray-800 text-gray-300 hover:text-green-400 ${location.pathname === '/admin/manage-purchases' ? 'bg-gray-800 text-green-400' : ''}`}>
                        <FiCreditCard />
                        <span>Manajemen Pembelian</span>
                    </Link>
                    <Link to="/admin/manage-finances" className={`flex items-center space-x-3 p-3 rounded-md hover:bg-gray-800 text-gray-300 hover:text-green-400 ${location.pathname === '/admin/manage-finances' ? 'bg-gray-800 text-green-400' : ''}`}>
                        <FiDollarSign />
                        <span>Manajemen Keuangan</span>
                    </Link>
                    {/* CRUD untuk Landing Page */}
                    {/* <Link to="/admin/manage-promotions" className={`flex items-center space-x-3 p-3 rounded-md hover:bg-gray-800 text-gray-300 hover:text-green-400 ${location.pathname === '/admin/manage-promotions' ? 'bg-gray-800 text-green-400' : ''}`}>
                        <FiTag />
                        <span>Manajemen Promosi</span>
                    </Link> */}
                    <Link to="/admin/manage-articles" className={`flex items-center space-x-3 p-3 rounded-md hover:bg-gray-800 text-gray-300 hover:text-green-400 ${location.pathname === '/admin/manage-articles' ? 'bg-gray-800 text-green-400' : ''}`}>
                        <FiFileText />
                        <span>Manajemen Artikel</span>
                    </Link>
                    <Link to="/admin/manage-activities" className={`flex items-center space-x-3 p-3 rounded-md hover:bg-gray-800 text-gray-300 hover:text-green-400 ${location.pathname === '/admin/manage-activities' ? 'bg-gray-800 text-green-400' : ''}`}>
                        <FiCalendar />
                        <span>Manajemen Kegiatan</span>
                    </Link>
                    <button 
                        onClick={handleLogout} 
                        className="flex items-center space-x-3 p-3 rounded-md hover:bg-red-600 w-full text-left"
                    >
                        <FiLogOut />
                        <span>Logout</span>
                    </button>
                </nav>
            </div>
            
            {/* Hamburger Button */}
            <button 
                className="fixed top-4 left-4 z-50 sm:hidden p-2 bg-gray-900 text-green-400 rounded-md hover:bg-gray-700 transition duration-300" 
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
        </div>
    );
};

export default Sidebar;
