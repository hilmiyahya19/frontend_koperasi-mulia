// const API_URL = 'http://localhost:3000/api/sale';
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/sale`; 

// 🔹 Ambil semua penjualan
export const getAllSales = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal mengambil data penjualan: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching sales:', error);
        return [];
    }
};

// 🔹 Ambil detail penjualan berdasarkan ID
export const getSaleById = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal mengambil detail penjualan: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching sale by id:', error);
        return null;
    }
};

// 🔹 Tambah penjualan baru
export const createSale = async (saleData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(saleData),
        });

        if (!response.ok) {
            throw new Error(`Gagal menambah penjualan: ${response.status}`);
        }

        const data = await response.json();
        // console.log("Response dari server:", data);
        return data;
    } catch (error) {
        console.error('Error creating sale:', error);
        return null;
    }
};

// 🔹 Update penjualan berdasarkan ID
export const updateSale = async (id, saleData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(saleData),
        });

        if (!response.ok) {
            throw new Error(`Gagal memperbarui penjualan: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating sale:', error);
        return null;
    }
};

// 🔹 Hapus penjualan berdasarkan ID
export const deleteSale = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal menghapus penjualan: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error('Error deleting sale:', error);
        return false;
    }
};
