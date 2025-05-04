// const API_URL = 'http://localhost:3000/api/member';
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/member`; 

// 🔹 Ambil semua anggota
export const getAllMembers = async () => {
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
            throw new Error(`Gagal mengambil data anggota: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
};

// 🔹 Ambil semua anggota (Untuk admin (Dropdown Customer di Sales Form))
export const getMemberSummary = async () => {
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
            throw new Error(`Gagal mengambil data anggota: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
};

// 🔹 Ambil detail anggota berdasarkan id
export const getMemberById = async (id) => {
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
            throw new Error(`Gagal mengambil data anggota berdasarkan id: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching member detail by id:', error);
        return null;
    }
};

// 🔹 Tambah anggota baru
export const createMember = async (memberData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(memberData),
        });

        if (!response.ok) {
            throw new Error(`Gagal menambah anggota: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating member:', error);
        return null;
    }
};

// 🔹 Update anggota
export const updateMember = async (id, memberData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(memberData),
        });

        if (!response.ok) {
            throw new Error(`Gagal memperbarui anggota: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating member:', error);
        return null;
    }
};

// 🔹 Hapus anggota
export const deleteMember = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal menghapus anggota: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error('Error deleting member:', error);
        return false;
    }
};

// Register Anggota
export const registerMember = async (memberData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(memberData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registrasi gagal');
        }

        return data;
    } catch (error) {
        console.error('Error registering member:', error);
        throw error;
    }
};

// Login Anggota
export const loginMember = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Gagal login');
        }

        return data;
    } catch (error) {
        console.error('Error logging in member:', error);
        throw error;
    }
};

