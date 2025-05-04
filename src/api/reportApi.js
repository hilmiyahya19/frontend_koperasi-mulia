// const API_URL = "http://localhost:3000/api/report";
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/report`; 

// Fungsi untuk mengambil statistik anggota
export const getMemberStats = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/members`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Gagal mengambil data anggota");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching member stats:", error);
        return null;
    }
};

// Fungsi untuk mengambil statistik penjualan
export const getSalesStats = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/sales`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Gagal mengambil data penjualan");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching sales stats:", error);
        return null;
    }
};

// Fungsi untuk mengambil produk terlaris
export const getTopProducts = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/top-products`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Gagal mengambil data produk terlaris");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching top products:", error);
        return null;
    }
};

// Fungsi untuk mengambil statistik keuangan
export const getFinanceStats = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/finances`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Gagal mengambil data keuangan");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching finance stats:", error);
        return null;
    }
};
