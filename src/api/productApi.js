const API_URL = 'http://localhost:3000/api/product';

// 🔹 Ambil semua produk
export const getAllProducts = async () => {
    try {
        // const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                // Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal mengambil data produk: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

// 🔹 Ambil detail produk berdasarkan ID
export const getProductById = async (id) => {
    try {
        // const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
                // Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal mengambil detail produk: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching product by id:', error);
        return null;
    }
};

// 🔹 Tambah produk baru
export const createProduct = async (productData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'application/json',
            },
            // body: JSON.stringify(productData),
            body: productData,
        });

        console.log("Data dikirim:", productData);

        if (!response.ok) {
            throw new Error(`Gagal menambah produk: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating product:', error);
        return null;
    }
};

// 🔹 Update produk berdasarkan ID
export const updateProduct = async (id, productData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'application/json',
            },
            // body: JSON.stringify(productData),
            body: productData,
        });

        if (!response.ok) {
            throw new Error(`Gagal memperbarui produk: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating product:', error);
        return null;
    }
};

// 🔹 Hapus produk berdasarkan ID
export const deleteProduct = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal menghapus produk: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        return false;
    }
};

// 🔹 Import produk dari file Excel
export const importProductsFromExcel = async (productData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/upload-excel`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: productData,
        });

        if (!response.ok) {
            throw new Error(`Gagal mengimpor produk: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error importing product from Excel:', error);
        return null;
    }
};
