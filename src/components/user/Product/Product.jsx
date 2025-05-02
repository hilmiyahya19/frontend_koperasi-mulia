import { useEffect, useState } from "react";
import { getAllProducts } from "../../../api/productApi";
import { Link } from "react-router-dom"; 

const Promo = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts().then(setProducts).catch(console.error);
    }, []);

    return (
        <section id="promo" className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white">
            <h2 className="text-4xl font-bold text-center mb-10 tracking-wide text-green-400">
                Produk Kami
            </h2>
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, index) => {
                        const product = products[index];
                        return (
                        <div
                            key={product?._id || index}
                            className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col justify-between"
                        >
                            {product ? (
                            <>
                                {/* Gambar Produk */}
                                <img
                                src={product.image || ``}
                                alt={product.name}
                                className="w-full h-80 object-cover"
                                />

                                {/* Konten Card */}
                                <div className="p-6">
                                <h3 className="text-xl font-semibold text-green-400">{product.name}</h3>
                                    {/* Harga Sebelum & Sesudah Diskon */}
                                    <div className="mt-2">
                                        <p className="text-xl font-bold text-white">Rp {product.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            </>
                            ) : (
                            <div className="h-full p-6 flex flex-col items-center justify-center text-center text-gray-400">
                                <p className="text-lg font-semibold">Belum ada produk</p>
                                <p className="text-sm mt-2">Silakan cek kembali nanti.</p>
                            </div>
                            )}
                        </div>
                        );
                    })}
                </div>
                
                {/* Tombol Lihat Semua Produk */}
                <div className="flex justify-center mt-12">
                    <Link
                        to="/produk"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        <span>Lihat Semua Produk</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Promo;
