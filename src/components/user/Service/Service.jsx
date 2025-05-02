import { useState } from "react";

const Service = () => {
    const services = [
        { 
            title: "Jam Operasional", 
            description: "Buka setiap hari pukul 07.00 - 15.00, kecuali tanggal merah libur." 
        },
        { 
            title: "Layanan COD", 
            description: "Pesan produk dan bayar di tempat (Cash on Delivery) untuk kemudahan transaksi." 
        },
        { 
            title: "Pengiriman via Gojek", 
            description: "Tersedia layanan pengiriman produk menggunakan Gojek untuk kenyamanan belanja anggota." 
        }
    ];
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section id="service" className="py-20 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white">
            <h2 className="text-4xl font-bold text-center mb-10 tracking-wide text-green-400">
                Layanan Kami
            </h2>
            
            <div className="container mx-auto flex flex-col items-center space-y-6 px-3">
                {services.map((service, index) => (
                    <div key={index} className="w-full max-w-3xl">
                        {/* Title (Bisa Diklik) */}
                        <button 
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className="w-full text-left bg-gray-800 p-4 rounded-lg shadow-lg text-xl font-semibold hover:bg-green-500 transition duration-300"
                        >
                            {service.title}
                        </button>

                        {/* Deskripsi (Muncul Saat Diklik) */}
                        <div className={`overflow-hidden transition-all duration-500 ${activeIndex === index ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"}`}>
                            <p className="bg-gray-700 text-white p-4 rounded-lg shadow-md">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Service;
