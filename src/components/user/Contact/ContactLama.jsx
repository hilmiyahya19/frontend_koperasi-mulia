import { useState } from "react";
import { sendMessage } from "../../../api/landingPageApi";
import Swal from "sweetalert2";

const ContactLama = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendMessage(form);
            Swal.fire({
                title: "Berhasil!",
                text: "Pesan berhasil dikirim.",
                icon: "success",
                confirmButtonColor: "#22c55e",
            });
            setForm({ name: "", email: "", message: "" });
        } catch (error) {
            Swal.fire({
                title: "Gagal!",
                text: "Terjadi kesalahan, silakan coba lagi.",
                icon: "error",
                confirmButtonColor: "#ef4444",
            });
            console.log(error);    
        }
    };

    return (
        <section id="contact" className="px-2 py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center text-green-400 mb-10">Kontak Kami</h2>
            <form className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nama"
                    className="block w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mb-4 text-white focus:ring-2 focus:ring-green-400"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="block w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mb-4 text-white focus:ring-2 focus:ring-green-400"
                    required
                />
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Pesan"
                    className="block w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mb-4 text-white focus:ring-2 focus:ring-green-400"
                    rows="4"
                    required
                ></textarea>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 transition font-bold text-lg">
                    Kirim
                </button>
            </form>
        </section>
    );
};

export default ContactLama;
