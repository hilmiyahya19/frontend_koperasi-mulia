import { useEffect, useState } from "react";
import { getAllProducts } from "../../../api/productApi";
import { Dialog } from "@headlessui/react";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/solid";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Temporary filter states
  const [tempSearch, setTempSearch] = useState("");
  const [tempCategory, setTempCategory] = useState("all");
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");

  const applyFilters = () => {
    setSearch(tempSearch);
    setCategoryFilter(tempCategory);
    setPriceRange([
      Number(tempMinPrice) || 0,
      Number(tempMaxPrice) || 10000000,
    ]);
  };

  const resetFilters = () => {
    setTempSearch("");
    setTempCategory("all");
    setTempMinPrice("");
    setTempMaxPrice("");
    setSearch("");
    setCategoryFilter("all");
    setPriceRange([0, 10000000]);
  };

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
      setFiltered(data);
    });
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
    setFiltered(filteredProducts);
  }, [search, categoryFilter, priceRange, products]);

  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  return (
    <section className="min-h-screen bg-gray-900 text-white p-6">
      {/* FILTER FORM */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-10 space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full pl-10 p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 text-white"
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
            />
          </div>

          <div className="relative">
            <FunnelIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <select
              className="w-full pl-10 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
              value={tempCategory}
              onChange={(e) => setTempCategory(e.target.value)}
            >
              <option value="all">Semua Kategori</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
              value={tempMinPrice}
              onChange={(e) => setTempMinPrice(e.target.value)}
            />
            <span className="text-white flex items-center">-</span>
            <input
              type="number"
              placeholder="Max"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
              value={tempMaxPrice}
              onChange={(e) => setTempMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end gap-4 mt-4">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg font-medium transition w-full sm:w-auto"
            onClick={resetFilters}
          >
            Reset
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition w-full sm:w-auto"
            onClick={applyFilters}
          >
            Terapkan
          </button>
        </div>
      </div>

      {/* PRODUK CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.length ? (
          filtered.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-green-400">
                  {product.name}
                </h3>
                <p className="mt-2 text-xl font-bold">
                  Rp {product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-300">
            Tidak ada produk ditemukan.
          </p>
        )}
      </div>

      {/* MODAL DETAIL PRODUK */}
      <Dialog
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        className="fixed z-50 inset-0 flex items-center justify-center"
      >
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        <Dialog.Panel className="relative bg-gray-900 text-white p-6 rounded-xl max-w-md w-full mx-auto shadow-lg max-h-[80vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-green-400">
                {selectedProduct.name}
              </h2>
              <p className="text-lg font-semibold mt-2">
                Rp {selectedProduct.price.toLocaleString()}
              </p>
              <p className="text-sm mt-2 text-gray-300">
                Kategori: {selectedProduct.category}
              </p>
              <p className="mt-4 text-gray-200">{selectedProduct.description}</p>
              <button
                className="mt-6 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg w-full"
                onClick={() => setSelectedProduct(null)}
              >
                Tutup
              </button>
            </>
          )}
        </Dialog.Panel>
      </Dialog>
    </section>
  );
};

export default AllProducts;
