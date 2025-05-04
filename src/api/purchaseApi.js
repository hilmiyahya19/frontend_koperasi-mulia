// const API_URL = 'http://localhost:3000/api/purchase';
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/purchase`; 

// 🔹 Ambil semua pembelian
export const getAllPurchases = async () => {
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
            throw new Error(`Gagal mengambil data pembelian: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching purchases:', error);
        return [];
    }
};

// 🔹 Ambil detail pembelian berdasarkan ID
export const getPurchaseById = async (id) => {
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
            throw new Error(`Gagal mengambil detail pembelian: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching purchase by id:', error);
        return null;
    }
};

// 🔹 Tambah pembelian baru
export const createPurchase = async (purchaseData) => {
    try {
        console.log("Data yang dikirim:", purchaseData); // Debugging

        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchaseData),
        });

        // Cek response status sebelum membaca body
        if (!response.ok) {
            const errorText = await response.text(); // Ambil teks jika terjadi error
            console.error("Response dari server (error):", errorText);
            throw new Error(`Gagal menambah pembelian: ${response.status}`);
        }

        // Jika sukses, langsung kembalikan JSON tanpa membaca teks terlebih dahulu
        const responseData = await response.json();
        console.log("Response dari server:", responseData); // Debugging
        return responseData;

    } catch (error) {
        console.error('Error creating purchase:', error);
        return null;
    }
};

// 🔹 Update pembelian berdasarkan ID
export const updatePurchase = async (id, purchaseData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchaseData),
        });

        if (!response.ok) {
            throw new Error(`Gagal memperbarui pembelian: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating purchase:', error);
        return null;
    }
};

// 🔹 Hapus pembelian berdasarkan ID
export const deletePurchase = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal menghapus pembelian: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error('Error deleting purchase:', error);
        return false;
    }
};
