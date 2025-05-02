import { useState, useEffect } from "react";
import { getAllFinances, createFinance, updateFinance, deleteFinance } from "../../api/financeApi";
import Swal from "sweetalert2";

export default function ManageFinances() {
  const [finances, setFinances] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ type: "income", amount: "", description: "", recordDate: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFinances();
  }, []);

  const fetchFinances = async () => {
    const data = await getAllFinances();
    setFinances(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validasi input type, amount, description, recordDate
    if (
      !form.type || 
      !form.amount ||
      !form.description || 
      !form.recordDate) {
        return Swal.fire({
          icon: "warning",
          title: "Oops!",
          text: "Semua field harus diisi!",
        });
      }

    const financeData = {
      type: form.type,
      amount: form.amount,
      description: form.description,
      recordDate: form.recordDate
    };

    try {
      if (editingId) {
        await updateFinance(editingId, financeData);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data keuangan berhasil diperbarui.",
        });
      } else {
        await createFinance(financeData);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data keuangan berhasil ditambahkan.",
        });
      }

      setForm({ type: "income", amount: "", description: "", recordDate: "" });
      setEditingId(null);
      fetchFinances();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: error.response?.data?.message || "Gagal memproses data.",
      });
    }
  };

  const handleEdit = (finance) => {
    setForm({
      type: finance.type,
      amount: finance.amount,
      description: finance.description,
      recordDate: new Date(finance.recordDate).toISOString().split("T")[0],
    });
    setEditingId(finance._id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Apakah yakin?",
      text: "Data keuangan ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });
    
    if (result.isConfirmed) {
      try {
        await deleteFinance(id);
        await fetchFinances();
        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Data keuangan berhasil dihapus.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan!",
          text: error.response?.data?.message || "Gagal menghapus data keuangan.",
        });
      }
    }
    };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-4 text-center md:text-left">
        Halaman Manajemen Keuangan
      </h1>

      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <select name="type" className="p-2 rounded bg-gray-700 text-white w-full" value={form.type} onChange={handleInputChange} required>
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
          <input type="number" name="amount" placeholder="Jumlah" className="p-2 rounded bg-gray-700 text-white w-full" value={form.amount} onChange={handleInputChange} required />
          <input type="text" name="description" placeholder="Deskripsi" className="p-2 rounded bg-gray-700 text-white w-full" value={form.description} onChange={handleInputChange} required />
          <input type="date" name="recordDate" className="p-2 rounded bg-gray-700 text-white w-full" value={form.recordDate} onChange={handleInputChange} required />
          <button type="submit" className="bg-green-600 hover:bg-green-500 p-2 rounded">
            {editingId ? "Update" : "Tambah"} Transaksi
          </button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="my-4 flex gap-2">
        <input placeholder="Cari data keuangan berdasarkan deskripsi" className="p-2 rounded bg-gray-700 text-white flex-grow" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="bg-green-600 hover:bg-green-500 p-2 rounded">🔍</button>
      </div>

      {/* Tabel dengan overflow */}
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 text-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2">No</th>
              <th className="p-2">Tipe</th>
              <th className="p-2">Jumlah</th>
              <th className="p-2">Deskripsi</th>
              <th className="p-2">Tanggal</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {finances.filter((finance) => finance.description.toLowerCase().includes(search.toLowerCase())).map((finance, index) => (
              <tr key={finance._id} className="border-t border-gray-600">
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 text-center">
                    <span className={`px-2 py-1 rounded text-white ${finance.type === "income" ? "bg-green-500" : "bg-red-500"}`}>
                      {finance.type === "income" ? "Pemasukan" : "Pengeluaran"}
                    </span>
                </td>
                <td className="p-2 text-center">Rp {finance.amount.toLocaleString()}</td>
                <td className="p-2 text-center">{finance.description}</td>
                <td className="p-2 text-center">{new Date(finance.recordDate).toLocaleDateString("id-ID")}</td>
                <td className="p-2 text-center flex gap-2 justify-center">
                  <button onClick={() => handleEdit(finance)} className="bg-green-600 hover:bg-green-500 p-1 rounded">✏️</button>
                  <button onClick={() => handleDelete(finance._id)} className="bg-red-600 hover:bg-red-500 p-1 rounded">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}