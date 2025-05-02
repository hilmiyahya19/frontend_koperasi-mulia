const API_URL = 'http://localhost:3000/api/articles';

// 🔹 Ambil semua artikel
export const getAllArticles = async () => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal mengambil data artikel: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
};

// 🔹 Ambil detail artikel berdasarkan ID
export const getArticleById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal mengambil detail artikel: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching article by id:', error);
        return null;
    }
};

// 🔹 Tambah artikel baru
export const createArticle = async (articleData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'application/json',
            },
            // body: JSON.stringify(articleData),
            body: articleData,
        });

        if (!response.ok) {
            throw new Error(`Gagal menambah artikel: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating article:', error);
        return null;
    }
};

// 🔹 Update artikel berdasarkan ID
export const updateArticle = async (id, articleData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'application/json',
            },
            // body: JSON.stringify(articleData),
            body: articleData,
        });

        if (!response.ok) {
            throw new Error(`Gagal memperbarui artikel: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating article:', error);
        return null;
    }
};

// 🔹 Hapus artikel berdasarkan ID
export const deleteArticle = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal menghapus artikel: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error('Error deleting article:', error);
        return false;
    }
};
