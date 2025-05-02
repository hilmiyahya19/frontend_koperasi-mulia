import { useState } from "react";
import Swal from "sweetalert2";

/**
 * @param {Array} items - array item (misalnya produk)
 * @param {Function} deleteFunction - fungsi untuk menghapus (misal deleteProduct)
 * @param {Function} onAfterDelete - fungsi yang dijalankan setelah delete sukses (misal fetchProducts)
 */
export default function useBulkSelection(items = [], deleteFunction, onAfterDelete) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isAllSelected = items.length > 0 && selectedItems.length === items.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item._id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) {
      return Swal.fire("Peringatan", "Tidak ada item yang dipilih!", "warning");
    }

    const result = await Swal.fire({
      title: `Hapus ${selectedItems.length} item?`,
      text: "Data akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus semua!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await Promise.all(selectedItems.map((id) => deleteFunction(id)));
        await onAfterDelete();
        setSelectedItems([]);
        Swal.fire("Berhasil", "Item berhasil dihapus!", "success");
      } catch (error) {
        Swal.fire("Gagal", "Gagal menghapus beberapa item", "error");
      }
    }
  };

  return {
    selectedItems,
    handleCheckboxChange,
    isAllSelected,
    toggleSelectAll,
    handleBulkDelete,
    setSelectedItems,
  };
}
