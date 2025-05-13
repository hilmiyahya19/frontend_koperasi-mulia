import { useState } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-950 shadow-lg z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-400 tracking-wide">
          Koperasi Mulia
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6 text-white">
            <li><Link to="hero" smooth={true} duration={500} className="cursor-pointer hover:text-green-400 transition duration-300">Beranda</Link></li>
            <li><Link to="promo" smooth={true} duration={500} className="cursor-pointer hover:text-green-400 transition duration-300">Produk</Link></li>
            <li><Link to="service" smooth={true} duration={500} className="cursor-pointer hover:text-green-400 transition duration-300">Layanan</Link></li>
            <li><Link to="article" smooth={true} duration={500} className="cursor-pointer hover:text-green-400 transition duration-300">Artikel</Link></li>
            <li><Link to="activity" smooth={true} duration={500} className="cursor-pointer hover:text-green-400 transition duration-300">Kegiatan</Link></li>
            <li><Link to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-green-400 transition duration-300">Kontak</Link></li>
          </ul>
          {/* <button onClick={() => navigate('/anggota/login')} className="ml-6 bg-green-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-green-400 transition duration-300 font-semibold">
            Login
          </button> */}
          <button 
            onClick={() => window.open('/member/login', '_blank')}
            className="ml-6 bg-green-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-green-400 transition duration-300 font-semibold"
          >
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-green-400 text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-gray-900 flex flex-col items-center justify-center transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-[-100%]"}`}>
        {/* Tombol X */}
        <button onClick={toggleMenu} className="absolute top-6 right-6 text-green-400 text-3xl">
          <FaTimes />
        </button>

        <ul className="text-xl space-y-6 text-white">
          <li><Link to="hero" smooth={true} duration={500} className="cursor-pointer hover:text-green-400 transition duration-300" onClick={toggleMenu}>Beranda</Link></li>
          <li><Link to="promo" smooth={true} duration={500} className="cursor-pointer hover:text-green-400 transition duration-300" onClick={toggleMenu}>Promo</Link></li>
          <li><Link to="service" smooth={true} duration={500} className="cursor-pointer hover:text-green-400 transition duration-300" onClick={toggleMenu}>Layanan</Link></li>
          <li><Link to="article" smooth={true} duration={500} className="cursor-pointer hover:text-green-400 transition duration-300" onClick={toggleMenu}>Artikel</Link></li>
          <li><Link to="activity" smooth={true} duration={500} className="cursor-pointer hover:text-green-400 transition duration-300" onClick={toggleMenu}>Kegiatan</Link></li>
          <li><Link to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-green-400 transition duration-300" onClick={toggleMenu}>Kontak</Link></li>
        </ul>
        {/* <button onClick={() => { navigate('/anggota/login'); toggleMenu(); }} className="mt-6 bg-green-500 text-gray-900 px-6 py-2 rounded-lg hover:bg-green-400 transition duration-300 font-semibold">
          Login
        </button> */}
        <button 
          onClick={() => { window.open('/member/login', '_blank'); toggleMenu(); }} 
          className="mt-6 bg-green-500 text-gray-900 px-6 py-2 rounded-lg hover:bg-green-400 transition duration-300 font-semibold"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

