import { Outlet } from 'react-router-dom';

const MemberLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white">
            <header className="bg-gray-800 py-4 shadow-md text-center text-green-400 font-bold text-xl">
                Selamat Datang, Anggota!
            </header>
            <main className="container mx-auto p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default MemberLayout;
