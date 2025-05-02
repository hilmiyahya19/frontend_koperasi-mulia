import { useState, useEffect, useRef } from "react";
import { getAllArticles, createArticle, updateArticle, deleteArticle } from "../../../api/landing-page/articleApi";
import Swal from "sweetalert2";

export default function ManageArticles() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ 
    title: "", 
    author: "", 
    content: "", 
    date: "",
    image: null, // ← Tambahkan ini
  });
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const data = await getAllArticles();
    setArticles(data);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.author || !form.content || !form.date) {
      return Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Semua field harus diisi!",
      });
    }

    // Jika sedang tambah (bukan edit) dan sudah ada 3 data, tolak
    if (!editingId && articles.length >= 3) {
      return Swal.fire({
        icon: "warning",
        title: "Batas Maksimal!",
        text: "Tidak bisa tambah data baru. Maksimal 3 data diperbolehkan. Hapus atau edit salah satu data.",
      });
    }

    try {
      const submitData = new FormData();
      submitData.append("title", form.title);
      submitData.append("author", form.author);
      submitData.append("content", form.content);
      submitData.append("date", form.date);
      if (form.image) {
        submitData.append("image", form.image); // kirim file asli
      }

      if (editingId) {
        await updateArticle(editingId, submitData);
        Swal.fire({ icon: "success", title: "Berhasil!", text: "Artikel berhasil diperbarui." });
      } else {
        await createArticle(submitData);
        Swal.fire({ icon: "success", title: "Berhasil!", text: "Artikel berhasil ditambahkan." });
      }

      // Reset input file secara manual
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setForm({ 
        title: "", 
        author: "", 
        content: "", 
        date: "",
        image: null,
      });
      setEditingId(null);
      fetchArticles();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: error.response?.data?.message || "Gagal memproses data.",
      });
    }
  };

  const handleEdit = (article) => {
    setForm({
      title: article.title,
      author: article.author,
      content: article.content,
      date: new Date(article.date).toISOString().split("T")[0],
      image: article.image || "",
    });
    setEditingId(article._id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Apakah yakin?",
      text: "Data artikel ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await deleteArticle(id);
        await fetchArticles();
        Swal.fire({ icon: "success", title: "Terhapus!", text: "Artikel berhasil dihapus." });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan!",
          text: error.response?.data?.message || "Gagal menghapus artikel.",
        });
      }
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-4 text-center md:text-left">
        Halaman Manajemen Artikel
      </h1>

      {/* Form Input */}
      <div className="bg-gray-800 p-4 my-4 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input 
            name="title" 
            placeholder="Judul Artikel" 
            className="p-2 rounded bg-gray-700 text-white w-full" 
            value={form.title} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            name="author" 
            placeholder="Penulis" 
            className="p-2 rounded bg-gray-700 text-white w-full" 
            value={form.author} 
            onChange={handleInputChange} 
            required 
          />
          <textarea 
            name="content" 
            placeholder="Isi Artikel" 
            className="p-2 rounded bg-gray-700 text-white w-full" 
            value={form.content} 
            onChange={handleInputChange} 
            required>  
          </textarea>
          <input 
            name="date" 
            type="date" 
            placeholder="Tanggal Publikasi" 
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
            {editingId ? "Update" : "Tambah"} Artikel
          </button>
        </form>
      </div>

      {/* Search */}
      <div className="my-4 flex gap-2">
        <input placeholder="Cari artikel" className="p-2 rounded bg-gray-700 text-white flex-grow" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="bg-green-600 hover:bg-green-500 p-2 rounded">🔍</button>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 text-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2">No</th>
              <th className="p-2">Judul</th>
              <th className="p-2">Penulis</th>
              <th className="p-2">Konten</th>
              <th className="p-2">Tanggal</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {articles
              .filter(a => a.title.toLowerCase().includes(search.toLowerCase()))
              .map((article, index) => (
                <tr key={article._id} className="border-b border-gray-700">
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2 text-center">{article.title}</td>
                  <td className="p-2 text-center">{article.author}</td>
                  <td className="p-2 text-center">{article.content.length > 20 ? article.content.substring(0, 20) + "..." : article.content}</td>
                  <td className="p-2 text-center">{new Date(article.date).toLocaleDateString("id-ID")}</td>
                  <td className="p-2 text-center">
                    <button onClick={() => handleEdit(article)} className="bg-green-600 hover:bg-green-500 p-1 rounded mr-2">✏️</button>
                    <button onClick={() => handleDelete(article._id)} className="bg-red-600 hover:bg-red-500 p-1 rounded">🗑️</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
