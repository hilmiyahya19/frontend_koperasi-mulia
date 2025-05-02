import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
    const profile = {
        name: 'Koperasi Konsumen "Mulia"',
        vision: "Mulia dan Sejahtera",
        mission: [
            "Menjadikan Koperasi Mulia sebagai solusi untuk memenuhi kebutuhan konsumen",
            "Menjadikan Koperasi Mulia sebagai tempat belanja yang pelayanannya baik, murah, nyaman dan fast respon",
            "Menjadikan Koperasi Mulia sebagai toko grosir",
            "Menjadikan Koperasi Mulia sebagai toko yang bernuansa Islami",
            "Menjadikan Koperasi Mulia memberi manfaat kepada umat",
        ]
    };
    const [missionIndex, setMissionIndex] = useState(0);

    useEffect(() => {
        if (profile.mission.length) {
            const displayTimeout = setTimeout(() => {
                setMissionIndex((prevIndex) => (prevIndex + 1) % profile.mission.length);
            }, 10000); // 2 detik ketik + 10 detik tampilan

            return () => clearTimeout(displayTimeout);
        }
    }, [missionIndex, profile.mission.length]);

    return (
        <section id="hero" className="relative flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-green-400">
            <div className="max-w-3xl">
                <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg">
                    {profile.name}
                </h1>
                <p className="mt-4 text-xl font-medium drop-shadow-md">
                    {profile.vision}
                </p>
                <div className="px-2 mt-6 relative h-20 flex items-center justify-center overflow-hidden">
                    {profile.mission && (
                        <p className="text-lg font-semibold transition-opacity duration-500 ease-in-out animate-fade">
                            "
                            <Typewriter
                                key={missionIndex} // Paksa re-render saat missionIndex berubah
                                words={[profile.mission[missionIndex]]}
                                loop={false}
                                cursor
                                cursorStyle="|"
                                typeSpeed={50} // tiap karakter diketik dalam 50ms
                                deleteSpeed={0} // setelah pengetikan selesai, teks tidak akan dihapus
                                delaySpeed={10000} // Biarkan teks bertahan selama 10 detik
                            />
                            "
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;
