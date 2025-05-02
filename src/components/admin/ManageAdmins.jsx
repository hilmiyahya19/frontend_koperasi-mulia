import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllAdmins, createAdmin, updateAdmin, deleteAdmin } from "../../api/adminApi";

const ManageAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [search, setSearch] = useState("");
    const [form, setForm] = useState({ username: "", password: "" });
    const [editingId, setEditingId] = useState(null);
    
    useEffect(() => {
        fetchAdmins();
    }, []);
    
    const fetchAdmins = async () => {
        try {
            const data = await getAllAdmins();
            setAdmins(data);
        } catch (error) {
            console.error("Error fetching admins:", error);
        }
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!form.username) {
                Swal.fire("Peringatan!", "Username harus diisi!", "warning");
                return;
            }
    
            const existingAdmin = admins.find(admin => admin.username === form.username && admin._id !== editingId);
            if (existingAdmin) {
                Swal.fire("Gagal!", "Username sudah digunakan, pilih username lain!", "error");
                return;
            }
    
            const adminData = { 
                username: form.username, 
                role: "admin" // Role tetap diatur
            };
    
            if (form.password) adminData.password = form.password; // Kirim password hanya jika diisi
            
            if (editingId) {
                await updateAdmin(editingId, adminData);
                Swal.fire("Berhasil!", "Admin berhasil diperbarui.", "success");
            } else {
                await createAdmin(adminData);
                Swal.fire("Berhasil!", "Admin berhasil ditambahkan.", "success");
            }
    
            setForm({ username: "", password: "" });
            setEditingId(null);
            fetchAdmins();
        } catch (error) {
            console.error("Error saving admin:", error);
        }
    };
    

    const handleEdit = (admin) => {
        setForm({ username: admin.username, password: "" });
        setEditingId(admin._id);
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data admin akan dihapus secara permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteAdmin(id);
                Swal.fire("Dihapus!", "Admin berhasil dihapus.", "success");
                fetchAdmins();
            }
        });
    };

    return (
        <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-4 text-center md:text-left">Halaman Manajemen Admin</h1>
            
            <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="p-2 w-full bg-gray-700 text-white rounded"
                    value={form.username}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password (kosongkan jika tidak diubah)"
                    className="p-2 w-full bg-gray-700 text-white rounded mt-2"
                    value={form.password}
                    onChange={handleInputChange}
                />
                <button className="w-full bg-green-600 hover:bg-green-500 p-2 rounded mt-2">
                    {editingId ? "Update Admin" : "Tambah Admin"}
                </button>
            </form>

            <input
                type="text"
                placeholder="Cari admin"
                className="p-2 w-full bg-gray-700 text-white rounded mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            
            <table className="w-full bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg">
                <thead>
                    <tr className="bg-gray-700">
                        <th className="p-2">No</th>
                        <th className="p-2">Username</th>
                        <th className="p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {admins
                        .filter((admin) => admin.username.includes(search))
                        .map((admin, index) => (
                            <tr key={admin._id} className="border-b border-gray-700">
                                <td className="p-2 text-center">{index + 1}</td>
                                <td className="p-2 text-center">{admin.username}</td>
                                <td className="p-2 text-center">
                                    <button className="bg-green-600 p-1 rounded mr-2" onClick={() => handleEdit(admin)}>✏️</button>
                                    <button className="bg-red-600 p-1 rounded" onClick={() => handleDelete(admin._id)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageAdmins;
