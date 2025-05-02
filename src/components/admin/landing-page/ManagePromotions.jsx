import { useState, useEffect, useRef } from "react";
import {
  getAllPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../../../api/landing-page/promotionApi";
import Swal from "sweetalert2";

export default function ManagePromotions() {
  const [promotions, setPromotions] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    product: "",
    priceBefore: "",
    discount: "",
    priceAfter: "",
    image: null, // ← Tambahkan ini
  });
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    const data = await getAllPromotions();
    setPromotions(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    // Auto-calculate discount or priceAfter
    const priceBefore = parseFloat(updatedForm.priceBefore) || 0;
    const discount = parseFloat(updatedForm.discount);
    const priceAfter = parseFloat(updatedForm.priceAfter);

    if (name === "discount" && !isNaN(discount) && priceBefore > 0) {
      updatedForm.priceAfter = (priceBefore - (priceBefore * discount) / 100).toFixed(2);
    } else if (name === "priceAfter" && !isNaN(priceAfter) && priceBefore > 0) {
      updatedForm.discount = (((priceBefore - priceAfter) / priceBefore) * 100).toFixed(2);
    }

    setForm(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.product || !form.priceBefore || !form.priceAfter || !form.discount) {
      return Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Semua field harus diisi!",
      });
    }

    // Jika sedang tambah (bukan edit) dan sudah ada 3 data, tolak
    if (!editingId && promotions.length >= 3) {
      return Swal.fire({
        icon: "warning",
        title: "Batas Maksimal!",
        text: "Tidak bisa tambah data baru. Maksimal 3 data diperbolehkan. Hapus atau edit salah satu data.",
      });
    }

    try {
      const submitData = new FormData();
      submitData.append("product", form.product);
      submitData.append("priceBefore", parseFloat(form.priceBefore));
      submitData.append("priceAfter", parseFloat(form.priceAfter));
      submitData.append("discount", parseFloat(form.discount));
      if (form.image) {
        submitData.append("image", form.image); // kirim file asli
      }

      if (editingId) {
        await updatePromotion(editingId, submitData);
        Swal.fire({ icon: "success", title: "Berhasil!", text: "Promo berhasil diperbarui." });
      } else {
        await createPromotion(submitData);
        Swal.fire({ icon: "success", title: "Berhasil!", text: "Promo berhasil ditambahkan." });
      }

      // Reset input file secara manual
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setForm({ 
        product: "", 
        priceBefore: "", 
        discount: "", 
        priceAfter: "",
        image: null,
      });
      setEditingId(null);
      fetchPromotions();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: error.response?.data?.message || "Gagal memproses data.",
      });
    }
  };

  const handleEdit = (promo) => {
    setForm({
      product: promo.product,
      priceBefore: promo.priceBefore,
      discount: promo.discount,
      priceAfter: promo.priceAfter,
      image: promo.image || "",
    });
    setEditingId(promo._id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Apakah yakin?",
      text: "Promo ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await deletePromotion(id);
        await fetchPromotions();
        Swal.fire({ icon: "success", title: "Terhapus!", text: "Promo berhasil dihapus." });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan!",
          text: error.response?.data?.message || "Gagal menghapus promo.",
        });
      }
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-4 text-center md:text-left">
        Halaman Manajemen Promosi
      </h1>

      {/* Form Input */}
      <div className="bg-gray-800 p-4 my-4 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="product"
            placeholder="Nama Produk"
            className="p-2 rounded bg-gray-700 text-white w-full"
            value={form.product}
            onChange={handleInputChange}
            required
          />
          <input
            name="priceBefore"
            placeholder="Harga Sebelum (Rp)"
            type="number"
            className="p-2 rounded bg-gray-700 text-white w-full"
            value={form.priceBefore}
            onChange={handleInputChange}
            required
          />
          <input
            name="discount"
            placeholder="Diskon (%)"
            type="number"
            className="p-2 rounded bg-gray-700 text-white w-full"
            value={form.discount}
            onChange={handleInputChange}
            required
          />
          <input
            name="priceAfter"
            placeholder="Harga Setelah Diskon (Rp)"
            type="number"
            className="p-2 rounded bg-gray-700 text-white w-full"
            value={form.priceAfter}
            onChange={handleInputChange}
            required
          />
          <input
            ref={fileInputRef}
            name="image"
            type="file"
            accept="image/*"
            className="p-2 rounded bg-gray-700 text-white w-full"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />
          <button type="submit" className="bg-green-600 hover:bg-green-500 p-2 rounded">
            {editingId ? "Update" : "Tambah"} Promo
          </button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="my-4 flex gap-2">
        <input
          placeholder="Cari promo"
          className="p-2 rounded bg-gray-700 text-white flex-grow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-green-600 hover:bg-green-500 p-2 rounded">🔍</button>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 text-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2">No</th>
              <th className="p-2">Nama Produk</th>
              <th className="p-2">Harga Sebelum</th>
              <th className="p-2">Diskon (%)</th>
              <th className="p-2">Harga Setelah</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {promotions
              .filter((p) => p.product.toLowerCase().includes(search.toLowerCase()))
              .map((promo, index) => (
                <tr key={promo._id} className="border-b border-gray-700">
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2 text-center">{promo.product}</td>
                  <td className="p-2 text-center">Rp{promo.priceBefore.toLocaleString("id-ID")}</td>
                  <td className="p-2 text-center">{promo.discount}%</td>
                  <td className="p-2 text-center">Rp{promo.priceAfter.toLocaleString("id-ID")}</td>
                  <td className="p-2 text-center">
                    <button onClick={() => handleEdit(promo)} className="bg-green-600 hover:bg-green-500 p-1 rounded mr-2">✏️</button>
                    <button onClick={() => handleDelete(promo._id)} className="bg-red-600 hover:bg-red-500 p-1 rounded">🗑️</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
