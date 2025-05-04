// const API_URL = 'http://localhost:3000/api/admin';
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin`; 

// 🔹 Mendapatkan semua admin (SuperAdmin saja)
export const getAllAdmins = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error('Gagal mengambil data admin');
        return await response.json();
    } catch (error) {
        console.error('Get all admins error:', error);
        throw error;
    }
};

// 🔹 Mendapatkan admin berdasarkan ID
export const getAdminById = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error('Admin tidak ditemukan');
        return await response.json();
    } catch (error) {
        console.error('Get admin by ID error:', error);
        throw error;
    }
};

// 🔹 Menambahkan admin baru (SuperAdmin saja)
export const createAdmin = async (adminData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminData),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("🔥 Backend error response:", data);
            throw new Error(data.message || "Gagal menambahkan admin");
        }

        return data;
    } catch (error) {
        console.error("🔥 Create admin error:", error);
        throw error;
    }
};

// 🔹 Memperbarui admin (SuperAdmin saja)
export const updateAdmin = async (id, adminData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminData),
        });
        if (!response.ok) throw new Error('Gagal memperbarui admin');
        return await response.json();
    } catch (error) {
        console.error('Update admin error:', error);
        throw error;
    }
};

// 🔹 Menghapus admin (SuperAdmin saja)
export const deleteAdmin = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Gagal menghapus admin');
        return await response.json();
    } catch (error) {
        console.error('Delete admin error:', error);
        throw error;
    }
};

// 🔹 Login Admin
export const loginAdmin = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Gagal login');
        return data;
    } catch (error) {
        console.error('Login admin error:', error);
        throw error;
    }
};