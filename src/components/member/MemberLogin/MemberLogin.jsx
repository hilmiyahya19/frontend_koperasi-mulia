import { useState } from 'react';
import { loginMember } from '../../../api/memberApi';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MemberLogin = ({ setToken, setRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await loginMember({ username, password });
            if (result && result.token) {
                setToken(result.token);
                setRole('member');

                localStorage.setItem('token', result.token);
                localStorage.setItem('role', 'member');
                localStorage.setItem('memberId', result.user._id); // Simpan ID member

                Swal.fire('Login Berhasil!', 'Selamat datang kembali!', 'success');
                
                // 🔥 Arahkan ke halaman profil member dengan ID dari response API
                navigate(`/member/${result.user._id}`);
            }
        } catch (error) {
            let errorMessage = 'Terjadi kesalahan saat login.';

            if (error.message.includes('User tidak ditemukan')) {
                errorMessage = 'Akun tidak ditemukan. Silakan periksa kembali username Anda.';
            } else if (error.message.includes('Akun belum disetujui oleh admin')) {
                errorMessage = 'Akun belum disetujui oleh admin. Harap tunggu persetujuan.';
            } else if (error.message.includes('Password salah')) {
                errorMessage = 'Password yang dimasukkan salah.';
            }

            Swal.fire('Login Gagal!', errorMessage, 'error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 px-2">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-green-400 text-2xl font-bold text-center mb-6">Login Member</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Username" className="w-full px-4 py-2 rounded bg-gray-700 text-white" onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" className="w-full px-4 py-2 rounded bg-gray-700 text-white" onChange={(e) => setPassword(e.target.value)} />
                    <button className="w-full py-2 bg-green-500 hover:bg-green-400 rounded text-white">Login</button>
                </form>
                {/* Tambahkan Link ke Registrasi */}
                <p className="text-center text-white mt-4">
                    Belum punya akun?{' '}
                    <Link to="/member/register" className="text-green-400 underline">Daftar di sini</Link>
                </p>
            </div>
        </div>
    );
};

export default MemberLogin;