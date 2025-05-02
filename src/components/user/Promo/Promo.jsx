import { useEffect, useState } from "react";
import { getAllPromotions } from "../../../api/landing-page/promotionApi";

const Promo = () => {
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        getAllPromotions().then(setPromotions).catch(console.error);
    }, []);

    return (
        <section id="promo" className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white">
            <h2 className="text-4xl font-bold text-center mb-10 tracking-wide text-green-400">
                Promo Terbaru
            </h2>
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, index) => {
                        const promo = promotions[index];
                        return (
                        <div
                            key={promo?._id || index}
                            className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col justify-between"
                        >
                            {promo ? (
                            <>
                                {/* Gambar Produk */}
                                <img
                                src={promo.image || ``}
                                alt={promo.product}
                                className="w-full h-80 object-cover"
                                />

                                {/* Konten Card */}
                                <div className="p-6">
                                <h3 className="text-xl font-semibold text-green-400">{promo.product}</h3>
                                <p className="mt-2 text-gray-300">
                                    Diskon <span className="text-green-400 font-bold">{promo.discount}%</span>
                                </p>

                                {/* Harga Sebelum & Sesudah Diskon */}
                                <div className="mt-4">
                                    <p className="text-gray-500 line-through text-lg">Rp {promo.priceBefore.toLocaleString()}</p>
                                    <p className="text-2xl font-bold text-green-400">Rp {promo.priceAfter.toLocaleString()}</p>
                                </div>

                                {/* Tombol Beli */}
                                {/* <button className="mt-6 w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg transition duration-300">
                                    Beli Sekarang
                                </button> */}
                                </div>
                            </>
                            ) : (
                            <div className="h-full p-6 flex flex-col items-center justify-center text-center text-gray-400">
                                <p className="text-lg font-semibold">Belum ada promo produk</p>
                                <p className="text-sm mt-2">Silakan cek kembali nanti.</p>
                            </div>
                            )}
                        </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Promo;
