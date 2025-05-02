import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMemberById } from '../../../api/memberApi';
import { getAllProducts } from '../../../api/productApi';
import Swal from 'sweetalert2';

const MemberPage = ({ onLogout }) => {
    const { id } = useParams();
    const [member, setMember] = useState(null);
    const [products, setProducts] = useState([]);

    // 🔹 Ambil semua produk dari API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productList = await getAllProducts();
                setProducts(productList);
            } catch (error) {
                console.error('Gagal mengambil produk:', error);
            }
        };

        fetchProducts();
    }, []);

    // 🔹 Ambil data member dan transaksi
    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const data = await getMemberById(id);
                if (!data) throw new Error('Member tidak ditemukan');
                setMember(data);
            } catch (error) {
                Swal.fire('Gagal Memuat Data!', error.message, 'error');
            }
        };

        fetchMemberData();
    }, [id]);

    // 🔹 Konversi ID produk ke Nama Produk
    const fetchProductName = (productId) => {
        if (products.length === 0) return 'Memuat...';
        const product = products.find((p) => String(p._id) === String(productId));
        return product ? product.name : 'Produk Tidak Ditemukan';
    };

    // 🔹 Handle logout dengan konfirmasi
    const handleLogout = () => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Anda akan keluar dari akun!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Logout',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Logout Berhasil!',
                    text: 'Anda telah keluar.',
                    icon: 'success',
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
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white">
            <h1 className="text-green-400 text-3xl font-bold my-6">Profil Member</h1>
            {member ? (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-2/3">
                    <p className="text-lg"><strong>Nama:</strong> {member.fullName}</p>
                    <p className="text-lg"><strong>Email:</strong> {member.email}</p>
                    <p className="text-lg"><strong>Username:</strong> {member.username}</p>
                    
                    <h2 className="text-green-400 text-2xl font-bold mt-4">Riwayat Transaksi</h2>
                    {member.transactionHistory.length > 0 ? (
                        <ul>
                            {member.transactionHistory.map((tx) => (
                                <li key={tx._id} className="bg-gray-700 p-4 rounded mt-3">
                                    {tx.products.map((product) => (
                                        <div key={product._id} className="mb-2">
                                            <p><strong>Produk:</strong> {fetchProductName(product.productId)}</p>
                                            <p><strong>Harga:</strong> Rp {product.price.toLocaleString('id-ID')}</p>
                                            <p><strong>Jumlah:</strong> {product.quantity}</p>
                                            <p><strong>Total:</strong> Rp {(product.price * product.quantity).toLocaleString('id-ID')}</p>
                                            <hr className="my-2 border-gray-500" />
                                        </div>
                                    ))}
                                    <p className="text-sm text-gray-400">
                                        <strong>Tanggal:</strong> {new Date(tx.saleDate).toLocaleDateString()} | 
                                        {/* <strong> Waktu:</strong> {new Date(tx.saleDate).toLocaleTimeString()} */}
                                        <strong> Waktu:</strong> 
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Tidak ada transaksi.</p>
                    )}
                </div>
            ) : <p>Memuat data...</p>}
            
            {/* Tombol Logout */}
            <button 
                onClick={handleLogout} 
                className="mt-6 mb-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-lg transition duration-300"
            >
                Logout
            </button>
        </div>
    );
};

export default MemberPage;
