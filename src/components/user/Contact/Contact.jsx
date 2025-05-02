import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Contact = () => {
    return (
        <footer id="contact" className="bg-gray-800 text-green-400 py-20 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start">
                {/* Alamat */}
                <div className="w-full md:w-1/3 text-left px-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Alamat Koperasi Mulia</h3>
                    <p className="text-md leading-relaxed">
                        Komplek Masjid Ummu Ali,<br />
                        Dusun Baran, Desa Besuk, Kecamatan Gurah,<br />
                        Kabupaten Kediri, Jawa Timur
                    </p>
                    </div>
                </div>

                {/* Jam Kerja */}
                <div className="w-full md:w-1/3 text-left px-4 md:flex md:justify-center pt-5 md:pt-0">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Jam Kerja</h3>
                    <p className="text-md leading-relaxed">
                        Buka setiap hari<br />
                        07.00 - 15.00 WIB<br />
                        (Libur pada tanggal merah)
                    </p>
                  </div>
                </div>

                {/* Hubungi Kami */}
                <div className="w-full md:w-1/3 text-left px-4 md:flex md:justify-end pt-5 md:pt-0">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Hubungi Kami</h3>
                    <div className="flex items-center gap-3 mb-2">
                        <a
                            href="https://wa.me/6281234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-green-300 transition"
                        >
                            <FaWhatsapp className="w-5 h-5 text-green-400" />
                            0812 3456 7890
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href="mailto:koperasimulia@example.com"
                            className="flex items-center gap-2 hover:text-green-300 transition"
                        >
                            <FaEnvelope className="w-5 h-5 text-green-400" />
                            koperasimulia@example.com
                        </a>
                    </div>
                  </div>
                </div>
            </div>            
        </footer>
    );
};

export default Contact;
