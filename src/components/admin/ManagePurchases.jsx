import { useState, useEffect } from "react";
import { getAllPurchases, createPurchase, updatePurchase, deletePurchase } from "../../api/purchaseApi";
import { getAllProducts } from "../../api/productApi";
import Swal from "sweetalert2";

export default function ManagePurchases() {
  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ supplier: "", productId: "", quantity: 1, purchasePrice:"", totalPrice: 0, purchaseDate: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPurchases();
    fetchProducts();
  }, []);

  const fetchPurchases = async () => {
    const data = await getAllPurchases();
    setPurchases(data);
  };

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };
      // Perhitungan totalPrice menggunakan purchasePrice dari input, bukan dari database
      if (name === "purchasePrice" || name === "quantity") {
        updatedForm.totalPrice = (parseFloat(updatedForm.purchasePrice) || 0) * (parseInt(updatedForm.quantity) || 1);
      }
      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input supplier, productId, quantity, purchasePrice, purchaseDate
    if (
      !form.supplier || 
      !form.productId || 
      isNaN(form.purchasePrice) || form.purchasePrice <= 0 ||
      isNaN(form.quantity) || form.quantity <= 0 ||
      !form.purchaseDate) {
        return Swal.fire({
          icon: "warning",
          title: "Oops!",
          text: "Semua field harus diisi!",
        });
      }

    const purchaseData = {
      supplier: form.supplier,
      products: [
        {
          productId: form.productId,
          quantity: form.quantity,
          purchasePrice: form.purchasePrice,
          // totalPrice: form.totalPrice // Tambahkan totalPrice di dalam product
        }
      ],
      totalPrice: form.totalPrice,
      purchaseDate: form.purchaseDate
    };

    // ---
    try {
      if (editingId) {
        await updatePurchase(editingId, purchaseData);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data pembelian berhasil diperbarui.",
        });
      } else {
        await createPurchase(purchaseData);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data pembelian berhasil ditambahkan.",
        });
      }
  
      setForm({ supplier: "", productId: "", quantity: 1, purchasePrice: "", totalPrice: 0, purchaseDate: "" });
      setEditingId(null);
      fetchPurchases();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: error.response?.data?.message || "Gagal memproses data.",
      });
    }
  };
    
  const handleEdit = (purchase) => {
    setForm({
      supplier: purchase.supplier,
      productId: purchase.products[0].productId._id,
      quantity: purchase.products[0].quantity,
      purchasePrice: purchase.products[0].purchasePrice,
      totalPrice: purchase.totalPrice,
      purchaseDate: new Date(purchase.purchaseDate).toISOString().split("T")[0],
    });
    setEditingId(purchase._id);
  };

  const handleDelete = async (id) => {
      const result = await Swal.fire({
        title: "Apakah yakin?",
        text: "Data pembelian ini akan dihapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        try {
          await deletePurchase(id);
          await fetchPurchases();
          Swal.fire({
            icon: "success",
            title: "Terhapus!",
            text: "Data pembelian berhasil dihapus.",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Terjadi Kesalahan!",
            text: error.response?.data?.message || "Gagal menghapus data pembelian.",
          });
        }
      }
    };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-4 text-center md:text-left">Halaman Manajemen Pembelian</h1>

      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input type="text" name="supplier" value={form.supplier} onChange={handleInputChange} placeholder="Nama Supplier" className="p-2 rounded bg-gray-700 text-white w-full" required />
          <select name="productId" className="p-2 rounded bg-gray-700 text-white w-full" value={form.productId} onChange={handleInputChange} required>
            <option value="">Pilih Produk</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>{product.name}</option>
            ))}
          </select>
          <input 
            type="number" 
            name="quantity" 
            className="p-2 rounded bg-gray-700 text-white w-full" 
            min="1" 
            placeholder="Masukkan jumlah barang"
            value={form.quantity} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="number" 
            name="purchasePrice" 
            className="p-2 rounded bg-gray-700 text-white w-full" 
            placeholder="Masukkan harga barang per 1 pcs"
            value={form.purchasePrice} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="date" 
            name="purchaseDate" 
            className="p-2 rounded bg-gray-700 text-white w-full" 
            value={form.purchaseDate} 
            onChange={handleInputChange} 
            required 
          />
          <p 
            className="text-gray-300">Total Harga: Rp {form.totalPrice.toLocaleString()}
          </p>
          <button 
            type="submit" className="bg-green-600 hover:bg-green-500 p-2 rounded">{editingId ? "Update" : "Tambah"} Pembeliaan
          </button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="my-4 flex gap-2">
        <input placeholder="Cari data penjualan berdasarkan nama supplier" className="p-2 rounded bg-gray-700 text-white flex-grow" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="bg-green-600 hover:bg-green-500 p-2 rounded">🔍</button>
      </div>

      {/* Tabel dengan overflow */}
      <div className="overflow-x-auto">
      <table className="w-full bg-gray-800 text-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2">No</th>
            <th className="p-2">Supplier</th>
            <th className="p-2">Produk</th>
            <th className="p-2">Harga Satuan</th>
            <th className="p-2">Jumlah</th>
            <th className="p-2">Total Harga</th>
            <th className="p-2">Tanggal</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {purchases
          .filter((purchase) => 
            purchase.supplier.toLowerCase().includes(search.toLowerCase())
          )
          .map((purchase, index) => (
            <tr key={purchase._id} className="border-t border-gray-600">
              <td className="p-2 text-center">{index + 1}</td>
              <td className="p-2 text-center">{purchase.supplier}</td>
              <td className="p-2 text-center">{purchase.products[0].productId.name}</td>
              <td className="p-2 text-center">Rp {purchase.products[0]?.productId?.purchasePrice?.toLocaleString() || 0}</td>
              <td className="p-2 text-center">{purchase.products[0]?.quantity || 0}</td>
              <td className="p-2 text-center">Rp {purchase.totalPrice.toLocaleString()}</td>
              {/* <td className="p-2 text-center">Rp {purchase.products[0]?.totalPrice?.toLocaleString() || 0}</td> */}
              <td className="p-2 text-center">{new Date(purchase.purchaseDate).toLocaleDateString("id-ID")}</td>
              <td className="p-2 text-center flex gap-2 justify-center">
                <button onClick={() => handleEdit(purchase)} className="bg-green-600 hover:bg-green-500 p-1 rounded">✏️</button>
                <button onClick={() => handleDelete(purchase._id)} className="bg-red-600 hover:bg-red-500 p-1 rounded">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}