const API_URL = 'http://localhost:3000/api/promotions';

// 🔹 Ambil semua promosi
export const getAllPromotions = async () => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal mengambil data promosi: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching promotions:', error);
        return [];
    }
};

// 🔹 Ambil detail promosi berdasarkan ID
export const getPromotionById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal mengambil detail promosi: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching promotion by id:', error);
        return null;
    }
};

// 🔹 Tambah promosi baru
export const createPromotion = async (promotionData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'application/json',
            },
            // body: JSON.stringify(promotionData),
            body: promotionData,
        });

        if (!response.ok) {
            throw new Error(`Gagal menambah promosi: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating promotion:', error);
        return null;
    }
};

// 🔹 Update promosi berdasarkan ID
export const updatePromotion = async (id, promotionData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'application/json',
            },
            // body: JSON.stringify(promotionData),
            body: promotionData,
        });

        if (!response.ok) {
            throw new Error(`Gagal memperbarui promosi: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating promotion:', error);
        return null;
    }
};

// 🔹 Hapus promosi berdasarkan ID
export const deletePromotion = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal menghapus promosi: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error('Error deleting promotion:', error);
        return false;
    }
};
