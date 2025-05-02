import { useState, useEffect } from "react";
import { getAllSales, createSale, updateSale, deleteSale } from "../../api/saleApi";
import { getMemberSummary } from "../../api/memberApi";
import { getAllProducts } from "../../api/productApi";
import Swal from "sweetalert2";

export default function ManageSales() {
  const [sales, setSales] = useState([]);
  const [members, setMembers] = useState({});
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ customer: "", productId: "", quantity: 1, price:"", totalAmount: 0, saleDate: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, []);

  const fetchSales = async () => {
    const data = await getAllSales();
  
    // 🔹 Ambil ringkasan member hanya sekali, bukan satu per satu
    const memberSummary = await getMemberSummary();
    const memberData = memberSummary.reduce((acc, member) => {
      acc[member._id] = member; // Simpan berdasarkan ID untuk akses cepat
      return acc;
    }, {});
  
    setMembers(memberData);
    setSales(data);
  };  

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };
      // Perhitungan totalAmount menggunakan price dari input, bukan dari database
      if (name === "price" || name === "quantity") {
        updatedForm.totalAmount = (parseFloat(updatedForm.price) || 0) * (parseInt(updatedForm.quantity) || 1);
      }
      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validasi input customer, productId, quantity, price, saleDate
    if (
      !form.customer || 
      !form.productId || 
      isNaN(form.price) || form.price <= 0 ||
      isNaN(form.quantity) || form.quantity <= 0 ||
      !form.saleDate) {
        return Swal.fire({
          icon: "warning",
          title: "Oops!",
          text: "Semua field harus diisi!",
        });
      }
  
    const saleData = {
      customer: form.customer,
      products: [
        {
          productId: form.productId,
          quantity: form.quantity,
          price: form.price 
        }
      ],
      totalAmount: form.totalAmount,
      saleDate: form.saleDate
    };
    
    try {
      if (editingId) {
        await updateSale(editingId, saleData);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data penjualan berhasil diperbarui.",
        });
      } else {
        await createSale(saleData);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data penjualan berhasil ditambahkan.",
        });
      }
  
      setForm({ customer: "", productId: "", quantity: 1, price: "", totalAmount: 0, saleDate: "" });
      setEditingId(null);
      fetchSales();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: error.response?.data?.message || "Gagal memproses data.",
      });
    }
  };

  const handleEdit = (sale) => {
    setForm({
      customer: sale.customer,
      productId: sale.products[0].productId._id,
      quantity: sale.products[0].quantity,
      price: sale.products[0].price,
      totalAmount: sale.totalAmount,
      saleDate: new Date(sale.saleDate).toISOString().split("T")[0],
    });
    setEditingId(sale._id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Apakah yakin?",
      text: "Data penjualan ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });
  
    if (result.isConfirmed) {
      try {
        await deleteSale(id);
        await fetchSales();
        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Data penjualan berhasil dihapus.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan!",
          text: error.response?.data?.message || "Gagal menghapus data penjualan.",
        });
      }
    }
    };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-4 text-center md:text-left">Halaman Manajemen Penjualan</h1>

      <div className="bg-gray-800 p-4 my-4 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <select name="customer" className="p-2 rounded bg-gray-700 text-white w-full" value={form.customer} onChange={handleInputChange} required>
            <option value="">Pilih Pelanggan</option>
            <option value="umum">Umum</option>
            {Object.entries(members)
              .filter(([, member]) => member.status === "approved") // tanda koma (,) jangan dihapus
              .map(([id, member]) => (
                <option key={id} value={id}>{member.fullName}</option>
            ))}
          </select>
          <select name="productId" className="p-2 rounded bg-gray-700 text-white w-full" value={form.productId} onChange={handleInputChange} required>
            <option value="">Pilih Produk</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>{product.name} - Rp {product.price.toLocaleString()}</option>
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
            name="price" 
            className="p-2 rounded bg-gray-700 text-white w-full" 
            placeholder="Masukkan harga barang per 1 pcs"
            value={form.price} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="date" 
            name="saleDate" 
            className="p-2 rounded bg-gray-700 text-white w-full" 
            value={form.saleDate} 
            onChange={handleInputChange} 
            required 
          />
          <p 
            className="text-gray-300">Total Harga: Rp {form.totalAmount.toLocaleString()}
          </p>
          <button 
            type="submit" className="bg-green-600 hover:bg-green-500 p-2 rounded">{editingId ? "Update" : "Tambah"} Penjualan
          </button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="my-4 flex gap-2">
        <input placeholder="Cari data penjualan berdasarkan nama anggota" className="p-2 rounded bg-gray-700 text-white flex-grow" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="bg-green-600 hover:bg-green-500 p-2 rounded">🔍</button>
      </div>

      {/* Tabel dengan overflow */}
      <div className="overflow-x-auto">
      <table className="w-full bg-gray-800 text-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2">No</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Produk</th>
            <th className="p-2">Harga Satuan</th>
            <th className="p-2">Jumlah</th>
            <th className="p-2">Total Harga</th>
            <th className="p-2">Tanggal</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sales
          .filter((sale) => {
            const customerName = sale.customer === "umum" ? "Umum" : members[sale.customer]?.fullName || "";
            return customerName.toLowerCase().includes(search.toLowerCase());
          })
          .map((sale, index) => (
            <tr key={sale._id} className="border-t border-gray-600">
              <td className="p-2 text-center">{index + 1}</td>
              <td className="p-2 text-center">{sale.customer === "umum" ? "Umum" : members[sale.customer]?.fullName || "Loading..."}</td>
              <td className="p-2 text-center">{sale.products[0].productId.name}</td>
              <td className="p-2 text-center">Rp {sale.products[0].price.toLocaleString()}</td>
              <td className="p-2 text-center">{sale.products[0].quantity}</td>
              <td className="p-2 text-center">Rp {sale.totalAmount.toLocaleString()}</td>
              <td className="p-2 text-center">{new Date(sale.saleDate).toLocaleDateString("id-ID")}</td>
              <td className="p-2 text-center flex gap-2 justify-center">
                <button onClick={() => handleEdit(sale)} className="bg-green-600 hover:bg-green-500 p-1 rounded">✏️</button>
                <button onClick={() => handleDelete(sale._id)} className="bg-red-600 hover:bg-red-500 p-1 rounded">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}