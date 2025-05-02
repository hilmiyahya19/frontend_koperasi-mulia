import { useState, useEffect, useRef } from "react";
import { 
  getAllProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  importProductsFromExcel, 
} from "../../api/productApi";
import Swal from "sweetalert2";
import useBulkSelection from "../../hooks/useBulkSelection";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ 
    name: "", 
    category: "", 
    price: "", 
    description: "",
    image: null, // ← Tambahkan ini
  });
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const {
    selectedItems: selectedProducts,
    handleCheckboxChange,
    isAllSelected,
    toggleSelectAll,
    handleBulkDelete,
    setSelectedItems, // berfungsi untuk reset seleksi data produk
  } = useBulkSelection(products, deleteProduct, fetchProducts);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!form.name || !form.category || !form.price || !form.description) {
      return Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Semua field harus diisi!",
      });
    }

    // Cek duplikat nama sudah digunakan
    const isDuplicate = products.some(product => 
      product.name === form.name &&
      product._id !== editingId
    );

    if (isDuplicate) {
      return Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Nama produk sudah digunakan!",
      });
    }

    try {
      const submitData = new FormData();
      submitData.append("name", form.name);
      submitData.append("category", form.category);
      submitData.append("price", form.price);
      submitData.append("description", form.description);
      if (form.image) {
        submitData.append("image", form.image); // kirim file asli
      }

      console.log("Data dikirim:", submitData);

      if (editingId) {
        await updateProduct(editingId, submitData);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Produk berhasil diperbarui.",
        });
      } else {
        await createProduct(submitData);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Produk berhasil ditambahkan.",
        });
      }

      // Reset input file secara manual
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setForm({ 
        name: "", 
        category: "", 
        price: "", 
        description: "",
        image: null,
      });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: error.response?.data?.message || "Gagal memproses data.",
      });
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: product.image || "",
    }); 
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Apakah yakin?",
      text: "Data produk ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await deleteProduct(id);
        await fetchProducts();
        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Produk berhasil dihapus.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan!",
          text: error.response?.data?.message || "Gagal menghapus produk.",
        });
      }
    }
  };

  const handleExcelFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  
  const handleExcelImport = async (e) => {
    e.preventDefault();
    const file = e.target.elements.excelFile.files[0];
    if (!file) {
      return Swal.fire("Peringatan", "File belum dipilih", "warning");
    }
    // menolak file selain .xlsx
    if (!file.name.endsWith(".xlsx")) {
      Swal.fire("Format Salah", "File harus berformat .xlsx", "error");
      return;
    }    

    const formData = new FormData();
    formData.append("excelFile", file);

    const result = await importProductsFromExcel(formData);
    if (result) {
      Swal.fire("Berhasil", result.message || "Produk diimpor", "success");
      fetchProducts();
    } else {
      Swal.fire("Gagal", "Gagal mengimpor produk", "error");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-4 text-center md:text-left">
        Halaman Manajemen Produk
      </h1>

      {/* Form Input */}
      <div className="bg-gray-800 p-4 my-4 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input name="name" placeholder="Nama Produk" className="p-2 rounded bg-gray-700 text-white w-full" value={form.name} onChange={handleInputChange} required />
          {/* <input name="category" placeholder="Kategori" className="p-2 rounded bg-gray-700 text-white w-full" value={form.category} onChange={handleInputChange} required /> */}
          <select
            name="category"
            className="p-2 rounded bg-gray-700 text-white w-full"
            value={form.category}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Pilih Kategori --</option>
            <option value="Sembako">Sembako</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
            <option value="Peralatan Rumah Tangga">Peralatan Rumah Tangga</option>
            <option value="Produk Kesehatan">Produk Kesehatan</option>
            <option value="Alat Tulis dan Perlengkapan Sekolah">Alat Tulis dan Perlengkapan Sekolah</option>
            <option value="Pakaian dan Tekstil">Pakaian dan Tekstil</option>
            <option value="-">-</option>
          </select>
          <input name="price" placeholder="Harga" type="number" className="p-2 rounded bg-gray-700 text-white w-full" value={form.price} onChange={handleInputChange} required />
          <textarea name="description" placeholder="Deskripsi" className="p-2 rounded bg-gray-700 text-white w-full" value={form.description} onChange={handleInputChange}></textarea>
          <input
            ref={fileInputRef}
            name="image"
            type="file"
            accept="image/*"
            className="p-2 rounded bg-gray-700 text-white w-full"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />
          <button type="submit" className="bg-green-600 hover:bg-green-500 p-2 rounded">
            {editingId ? "Update" : "Tambah"} Produk
          </button>
        </form>
      </div>

      {/* Import Excel */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-md mb-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Import Data Produk dari Excel
        </h2>

        <form onSubmit={handleExcelImport} className="flex flex-col md:flex-row items-center gap-4">
          <label
            htmlFor="excel-upload"
            className="cursor-pointer w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
          >
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {selectedFile ? selectedFile.name : "Pilih File Excel"}
            <input
              type="file"
              id="excel-upload"
              name="excelFile"
              accept=".xlsx"
              className="hidden"
              // onChange={(e) => console.log("File selected:", e.target.files[0]?.name)}
              onChange={handleExcelFileChange}
            />
          </label>

          <button
            type="submit"
            className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
          >
            🚀 Import Sekarang
          </button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="my-4 flex gap-2">
        <input placeholder="Cari produk" className="p-2 rounded bg-gray-700 text-white flex-grow" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="bg-green-600 hover:bg-green-500 p-2 rounded">🔍</button>
      </div>

      {selectedProducts.length > 0 && (
        <div className="mb-4 flex gap-2">
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded shadow"
          >
            🗑️ Hapus Terpilih ({selectedProducts.length})
          </button>
          {/* Tombol Reset Seleksi */}
          <button
            onClick={() => setSelectedItems([])} // Reset seleksi
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded shadow"
          >
            🔄 Reset Seleksi
          </button>
        </div>
      )}

      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 text-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                  className="accent-green-500"
                />
              </th>
              <th className="p-2">No</th>
              <th className="p-2">Nama</th>
              <th className="p-2">Kategori</th>
              <th className="p-2">Harga</th>
              <th className="p-2">Stok</th>
              <th className="p-2">Deskripsi</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((product, index) => (
              <tr key={product._id} className="border-b border-gray-700">
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => handleCheckboxChange(product._id)}
                    className="accent-green-500"
                  />
                </td>
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 text-center">{product.name}</td>
                <td className="p-2 text-center">{product.category}</td>
                <td className="p-2 text-center">{product.price}</td>
                <td className="p-2 text-center">{product.stock}</td>
                <td className="p-2 text-center">{product.description.length > 20 ? product.description.substring(0, 20) + "..." : product.description}</td>
                <td className="p-2 text-center">
                  <button onClick={() => handleEdit(product)} className="bg-green-600 hover:bg-green-500 p-1 rounded mr-2">✏️</button>
                  <button onClick={() => handleDelete(product._id)} className="bg-red-600 hover:bg-red-500 p-1 rounded">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
