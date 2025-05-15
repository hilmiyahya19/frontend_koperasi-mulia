import { useState } from 'react';
import { registerMember } from '../../../api/memberApi';
import Swal from 'sweetalert2';

const MemberRegister = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        phone: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerMember(formData);

            // 🔹 Kosongkan input setelah sukses
            setFormData({ fullName: '', email: '', username: '', password: '', phone: '' });

            Swal.fire('Registrasi Berhasil!', 'Akun Anda menunggu persetujuan admin.', 'success');
        } catch (error) {
            let errorMessage = 'Registrasi gagal. Silakan coba lagi.';
            if (error.message.includes('Nama, email, atau username sudah digunakan')) {
                errorMessage = 'Nama, email, atau username sudah digunakan. Silakan gunakan yang lain.';
            }
            Swal.fire('Registrasi Gagal!', errorMessage, 'error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 px-2">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-green-400 text-2xl font-bold text-center mb-6">Registrasi Member</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="fullName"
                        type="text"
                        placeholder="Nama Lengkap"
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <input
                        name="phone"
                        type="text"
                        placeholder="Nomor Telepon"
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <button className="w-full py-2 bg-green-500 hover:bg-green-400 rounded text-white">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MemberRegister;
