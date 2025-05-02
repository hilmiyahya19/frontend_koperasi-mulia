const API_URL = 'http://localhost:3000/api/landing';

// Fungsi untuk mengambil data profil koperasi
export const getProfile = async () => {
    try {
        const response = await fetch(`${API_URL}/profile`);
        if (!response.ok) throw new Error("Gagal mengambil profil");
        return await response.json();
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};

// Fungsi untuk mengambil data promo koperasi (3 produk promo)
export const getPromotions = async () => {
    try {
        const response = await fetch(`${API_URL}/promotions`);
        if (!response.ok) throw new Error("Gagal mengambil promo");
        return await response.json();
    } catch (error) {
        console.error("Error fetching promotions:", error);
        throw error;
    }
};

// Fungsi untuk mengambil layanan koperasi
export const getServices = async () => {
    try {
        const response = await fetch(`${API_URL}/services`);
        if (!response.ok) throw new Error("Gagal mengambil layanan");
        return await response.json();
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
};

// Fungsi untuk mengambil artikel koperasi (3 artikel)
export const getArticles = async () => {
    try {
        const response = await fetch(`${API_URL}/articles`);
        if (!response.ok) throw new Error("Gagal mengambil artikel");
        return await response.json();
    } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
    }
};

// Fungsi untuk mengambil kegiatan koperasi (3 kegiatan)
export const getActivities = async () => {
    try {
        const response = await fetch(`${API_URL}/activities`);
        if (!response.ok) throw new Error("Gagal mengambil kegiatan");
        return await response.json();
    } catch (error) {
        console.error("Error fetching activities:", error);
        throw error;
    }
};

// Fungsi untuk mengirim pesan melalui form kontak
export const sendMessage = async (contactData) => {
    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contactData)
        });

        if (!response.ok) throw new Error("Gagal mengirim pesan");
        return await response.json();
    } catch (error) {
        console.error("Error sending contact message:", error);
        throw error;
    }
};
