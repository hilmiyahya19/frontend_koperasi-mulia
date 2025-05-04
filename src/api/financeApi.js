// const API_URL = 'http://localhost:3000/api/finance';
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/finance`; 

// 🔹 Ambil semua keuangan
export const getAllFinances = async () => {
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
            throw new Error(`Gagal mengambil data keuangan: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching finances:', error);
        return [];
    }
};

// 🔹 Ambil detail keuangan berdasarkan ID
export const getFinanceById = async (id) => {
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
            throw new Error(`Gagal mengambil detail keuangan: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching Finance by id:', error);
        return null;
    }
};

// 🔹 Tambah keuangan baru
export const createFinance = async (financeData) => {
    try {
        console.log("Data yang dikirim:", financeData); // Debugging

        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(financeData),
        });

        // Cek response status sebelum membaca body
        if (!response.ok) {
            const errorText = await response.text(); // Ambil teks jika terjadi error
            console.error("Response dari server (error):", errorText);
            throw new Error(`Gagal menambah keuangan: ${response.status}`);
        }

        // Jika sukses, langsung kembalikan JSON tanpa membaca teks terlebih dahulu
        const responseData = await response.json();
        console.log("Response dari server:", responseData); // Debugging
        return responseData;

    } catch (error) {
        console.error('Error creating Finance:', error);
        return null;
    }
};

// 🔹 Update keuangan berdasarkan ID
export const updateFinance = async (id, financeData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(financeData),
        });

        if (!response.ok) {
            throw new Error(`Gagal memperbarui keuangan: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating finance:', error);
        return null;
    }
};

// 🔹 Hapus keuangan berdasarkan ID
export const deleteFinance = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal menghapus keuangan: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error('Error deleting finance:', error);
        return false;
    }
};
