import { Link } from "react-router-dom"; // Atau 'next/link' jika di Next.js

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-green-400 px-4">
            <div className="text-center space-y-6">
                <h1 className="text-9xl font-extrabold tracking-widest text-green-400 drop-shadow-lg glitch relative">
                    404
                </h1>
                <p className="text-2xl md:text-3xl font-semibold animate-pulse">
                    Halaman Tidak Ditemukan
                </p>
                <p className="max-w-md mx-auto text-base text-gray-300">
                    Sepertinya kamu tersesat di dimensi lain. Tapi jangan khawatir, kamu bisa kembali ke jalur yang benar!
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 mt-4 text-lg font-medium rounded-xl border border-green-400 hover:bg-green-400 hover:text-gray-900 transition-all duration-300"
                >
                    Kembali ke Beranda
                </Link>
            </div>

            <style>{`
                .glitch {
                    position: relative;
                    color: #22c55e;
                }
                .glitch::before,
                .glitch::after {
                    content: '404';
                    position: absolute;
                    left: 0;
                    width: 100%;
                    overflow: hidden;
                    clip: rect(0, 900px, 0, 0);
                }
                .glitch::before {
                    animation: glitchTop 2s infinite linear alternate-reverse;
                    color: #0f0;
                }
                .glitch::after {
                    animation: glitchBottom 1.5s infinite linear alternate-reverse;
                    color: #0ff;
                }
                @keyframes glitchTop {
                    0% {
                        clip: rect(0, 9999px, 0, 0);
                    }
                    5% {
                        clip: rect(0, 9999px, 40px, 0);
                        transform: translate(-3px, -3px);
                    }
                    10% {
                        clip: rect(0, 9999px, 0, 0);
                        transform: none;
                    }
                }
                @keyframes glitchBottom {
                    0% {
                        clip: rect(0, 9999px, 0, 0);
                    }
                    5% {
                        clip: rect(60px, 9999px, 90px, 0);
                        transform: translate(3px, 3px);
                    }
                    10% {
                        clip: rect(0, 9999px, 0, 0);
                        transform: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default NotFoundPage;
