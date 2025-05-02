import { useState, useEffect } from "react";
import { getAllMembers, createMember, updateMember, deleteMember } from "../../api/memberApi";
import Swal from "sweetalert2";

export default function ManageMembers() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ fullName: "", email: "", username: "", phone: "", status: "pending", password: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const data = await getAllMembers();
    setMembers(data);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input tidak boleh kosong
    if (!form.fullName || !form.email || !form.username || !form.phone || (editingId === null && !form.password)) {
      return Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Semua field harus diisi!",
      });
    }

    // Cek apakah fullName atau username sudah digunakan
    const isDuplicate = members.some(member => 
      (member.fullName === form.fullName || member.username === form.username) &&
      member._id !== editingId // Pastikan tidak mengecek diri sendiri saat edit
    );

    if (isDuplicate) {
      return Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Full Name atau Username sudah digunakan!",
      });
    }

    try {
      const submitData = { ...form };
      if (!submitData.password) delete submitData.password; // Jangan kirim password kosong

      if (editingId) {
        await updateMember(editingId, submitData);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Anggota berhasil diperbarui.",
        });
      } else {
        await createMember(submitData);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Anggota berhasil ditambahkan.",
        });
      }

      setForm({ fullName: "", email: "", username: "", phone: "", status: "pending", password: "" });
      setEditingId(null);
      fetchMembers();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: error.response?.data?.message || "Gagal memproses data.",
      });
    }
  };

  const handleEdit = (member) => {
    setForm({ ...member, password: "" }); // Kosongkan password agar tidak terlihat
    setEditingId(member._id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Apakah yakin?",
      text: "Data anggota ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await deleteMember(id);
        await fetchMembers();
        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Anggota berhasil dihapus.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan!",
          text: error.response?.data?.message || "Gagal menghapus anggota.",
        });
      }
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-4 text-center md:text-left">Halaman Manajemen Anggota</h1>
      
      {/* Form Input */}
      <div className="bg-gray-800 p-4 my-4 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input name="fullName" placeholder="Nama Lengkap" className="p-2 rounded bg-gray-700 text-white w-full" value={form.fullName} onChange={handleInputChange} required />
          <input name="email" placeholder="Email" className="p-2 rounded bg-gray-700 text-white w-full" value={form.email} onChange={handleInputChange} required />
          <input name="username" placeholder="Username" className="p-2 rounded bg-gray-700 text-white w-full" value={form.username} onChange={handleInputChange} required />
          <input name="phone" placeholder="Nomor Telepon" className="p-2 rounded bg-gray-700 text-white w-full" value={form.phone} onChange={handleInputChange} required />
          <input name="password" type="password" placeholder="Password (Kosongkan jika tidak diubah)" className="p-2 rounded bg-gray-700 text-white w-full" value={form.password} onChange={handleInputChange} />
          <select name="status" className="p-2 rounded bg-gray-700 text-white w-full" value={form.status} onChange={handleInputChange}>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>
          <button type="submit" className="bg-green-600 hover:bg-green-500 p-2 rounded">
            {editingId ? "Update" : "Tambah"} Anggota
          </button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="my-4 flex gap-2">
        <input placeholder="Cari anggota" className="p-2 rounded bg-gray-700 text-white flex-grow" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="bg-green-600 hover:bg-green-500 p-2 rounded">🔍</button>
      </div>

      {/* Tabel dengan overflow */}
      <div className="overflow-x-auto">
      <table className="w-full bg-gray-800 text-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2">No</th>
            <th className="p-2">Nama</th>
            <th className="p-2">Email</th>
            <th className="p-2">Username</th>
            <th className="p-2">Telepon</th>
            <th className="p-2">Status</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {members.filter(m => m.fullName.toLowerCase().includes(search.toLowerCase())).map((member, index) => (
            <tr key={member._id} className="border-b border-gray-700">
              <td className="p-2 text-center">{index + 1}</td>
              <td className="p-2 text-center">{member.fullName}</td>
              <td className="p-2 text-center">{member.email}</td>
              <td className="p-2 text-center">{member.username}</td>
              <td className="p-2 text-center">{member.phone}</td>
              <td className="p-2 text-center">
                <span className={`px-2 py-1 rounded text-white ${member.status === "approved" ? "bg-green-500" : "bg-yellow-500"}`}>
                  {member.status}
                </span>
              </td>
              <td className="p-2 text-center">
                <button className="bg-green-600 p-1 rounded mr-2" onClick={() => handleEdit(member)}>✏️</button>
                <button className="bg-red-600 p-1 rounded" onClick={() => handleDelete(member._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
