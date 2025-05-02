import { useState } from 'react';
import { loginAdmin } from '../../api/adminApi';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminLogin = ({ setToken, setRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await loginAdmin({ username, password });
            if (result && result.token) {
                setToken(result.token);
                setRole('admin');

                localStorage.setItem('token', result.token);
                localStorage.setItem('role', 'admin');
                localStorage.setItem('adminId', result.admin._id);

                Swal.fire('Login Berhasil!', 'Selamat datang kembali, Admin!', 'success');
                navigate('/admin');
            }
        } catch (error) {
            let errorMessage = 'Terjadi kesalahan saat login.';

            if (error.message.includes('User tidak ditemukan')) {
                errorMessage = 'Akun tidak ditemukan. Silakan periksa kembali username Anda.';
            } else if (error.message.includes('Password salah')) {
                errorMessage = 'Password yang dimasukkan salah.';
            }

            Swal.fire('Login Gagal!', errorMessage, 'error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 px-2">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-green-400 text-2xl font-bold text-center mb-6">Login Admin</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Username" className="w-full px-4 py-2 rounded bg-gray-700 text-white" onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" className="w-full px-4 py-2 rounded bg-gray-700 text-white" onChange={(e) => setPassword(e.target.value)} />
                    <button className="w-full py-2 bg-green-500 hover:bg-green-400 rounded text-white">Login</button>
                </form>
                <p className="text-center text-white mt-4">
                    Kembali ke{' '}
                    <Link to="/" className="text-green-400 underline">Halaman Utama</Link>
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;

