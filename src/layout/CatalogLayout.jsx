import { Outlet, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CatalogLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <header className="p-4 sm:p-6 shadow-xl flex justify-between items-center bg-gray-800 border-b border-gray-700 flex-wrap gap-y-2">
        {/* Link Kembali */}
        <Link
          to="/"
          className="flex items-center gap-2 text-green-400 hover:text-green-300 transition text-lg sm:xl"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Kembali</span>
        </Link>

        {/* Judul */}
        <h1 className="text-3xl sm:text-4xl font-bold text-green-400 text-center w-full sm:w-auto sm:flex-1 sm:text-center">
          Katalog Produk
        </h1>

        {/* Spacer untuk keseimbangan layout */}
        <div className="w-20 sm:w-32 hidden sm:block" />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default CatalogLayout;
