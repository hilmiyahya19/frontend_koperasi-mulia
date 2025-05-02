import { useState, useEffect, useRef } from "react";
import { getAllActivities, createActivity, updateActivity, deleteActivity } from "../../../api/landing-page/activityApi";
import Swal from "sweetalert2";

export default function ManageActivities() {
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ 
    title: "", 
    date: "", 
    location: "", 
    description: "",
    image: null, // ← Tambahkan ini 
  });
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const data = await getAllActivities();
    setActivities(data);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!form.title || !form.date || !form.location || !form.description) {
      return Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Semua field harus diisi!",
      });
    }

    // Jika sedang tambah (bukan edit) dan sudah ada 3 data, tolak
    if (!editingId && activities.length >= 3) {
      return Swal.fire({
        icon: "warning",
        title: "Batas Maksimal!",
        text: "Tidak bisa tambah data baru. Maksimal 3 data diperbolehkan. Hapus atau edit salah satu data.",
      });
    }

    try {
      const submitData = new FormData();
      submitData.append("title", form.title);
      submitData.append("date", form.date);
      submitData.append("location", form.location);
      submitData.append("description", form.description);
      if (form.image) {
        submitData.append("image", form.image); // kirim file asli
      }

      if (editingId) {
        await updateActivity(editingId, submitData);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Produk berhasil diperbarui.",
        });
      } else {
        await createActivity(submitData);
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
        title: "", 
        date: "", 
        location: "", 
        description: "",
        image: null,
      });
      setEditingId(null);
      fetchActivities();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: error.response?.data?.message || "Gagal memproses data.",
      });
    }
  };

  const handleEdit = (activity) => {
    setForm({
      title: activity.title,
      date: new Date(activity.date).toISOString().split("T")[0], // format ISO -> yyyy-MM-dd
      location: activity.location,
      description: activity.description,
      image: activity.image || "",
    });
    setEditingId(activity._id);
  };  

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Apakah yakin?",
      text: "Data kegiatan ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await deleteActivity(id);
        await fetchActivities();
        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Kegiatan berhasil dihapus.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan!",
          text: error.response?.data?.message || "Gagal menghapus kegiatan.",
        });
      }
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-4 text-center md:text-left">
        Halaman Manajemen Kegiatan
      </h1>

      {/* Form Input */}
      <div className="bg-gray-800 p-4 my-4 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input 
            name="title" 
            placeholder="Judul Kegiatan" 
            className="p-2 rounded bg-gray-700 text-white w-full" 
            value={form.title} 
            onChange={handleInputChange} 
            required 
          />    
          <input 
            name="location" 
            placeholder="Lokasi Kegiatan" 
            className="p-2 rounded bg-gray-700 text-white w-full" 
            value={form.location} 
            onChange={handleInputChange} 
            required 
          />
          <textarea 
            name="description" 
            placeholder="Deskripsi" 
            className="p-2 rounded bg-gray-700 text-white w-full" 
            value={form.description} 
            onChange={handleInputChange}>
          </textarea>
          <input 
            name="date" 
            placeholder="Tanggal Kegiatan" 
            type="date" 
            className="p-2 rounded bg-gray-700 text-white w-full" 
            value={form.date} 
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
            {editingId ? "Update" : "Tambah"} Kegiatan
          </button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="my-4 flex gap-2">
        <input placeholder="Cari kegiatan" className="p-2 rounded bg-gray-700 text-white flex-grow" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="bg-green-600 hover:bg-green-500 p-2 rounded">🔍</button>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 text-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2">No</th>
              <th className="p-2">Judul</th>
              <th className="p-2">Lokasi</th>
              <th className="p-2">Deskripsi</th>
              <th className="p-2">Tanggal</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {activities.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).map((activity, index) => (
              <tr key={activity._id} className="border-b border-gray-700">
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 text-center">{activity.title}</td>
                <td className="p-2 text-center">{activity.location}</td>
                <td className="p-2 text-center">{activity.description.length > 20 ? activity.description.substring(0, 20) + "..." : activity.description}</td>
                <td className="p-2 text-center">{new Date(activity.date).toLocaleDateString("id-ID")}</td>
                <td className="p-2 text-center">
                  <button onClick={() => handleEdit(activity)} className="bg-green-600 hover:bg-green-500 p-1 rounded mr-2">✏️</button>
                  <button onClick={() => handleDelete(activity._id)} className="bg-red-600 hover:bg-red-500 p-1 rounded">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
