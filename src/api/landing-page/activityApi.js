const API_URL = 'http://localhost:3000/api/activities';

// 🔹 Ambil semua aktivitas
export const getAllActivities = async () => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal mengambil data aktivitas: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching activities:', error);
        return [];
    }
};

// 🔹 Ambil detail aktivitas berdasarkan ID
export const getActivityById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal mengambil detail aktivitas: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching activity by id:', error);
        return null;
    }
};

// 🔹 Tambah aktivitas baru
export const createActivity = async (activityData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'application/json',
            },
            // body: JSON.stringify(activityData),
            body: activityData,
        });

        if (!response.ok) {
            throw new Error(`Gagal menambah aktivitas: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating activity:', error);
        return null;
    }
};

// 🔹 Update aktivitas berdasarkan ID
export const updateActivity = async (id, activityData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'application/json',
            },
            // body: JSON.stringify(activityData),
            body: activityData,
        });

        if (!response.ok) {
            throw new Error(`Gagal memperbarui aktivitas: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating activity:', error);
        return null;
    }
};

// 🔹 Hapus aktivitas berdasarkan ID
export const deleteActivity = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal menghapus aktivitas: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error('Error deleting activity:', error);
        return false;
    }
};
