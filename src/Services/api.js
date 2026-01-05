import axios from 'axios';

export const API_ORIGIN = process.env.REACT_APP_API_ORIGIN || 'https://localhost:7057';

const api = axios.create({
    baseURL: `${API_ORIGIN}/api`,
    timeout: 10000
});

export default {
    getCategories: () => api.get('/categories'),
    getProducts: (params) => api.get('/products', { params }),
    getProductBySlug: (slug) => api.get(`/products/${slug}`),
    getTopByCategory: (categoryId, limit = 10) => api.get(`/products/category/${categoryId}/top`, { params: { limit } }),
    searchProducts: (query) =>
        api.get("/products/search", {
            // yahan param name ko apne ASP.NET API ke hisaab se change kar sakte ho
            // agar backend me [FromQuery] string searchTerm hai, to { searchTerm: query } kar do
            params: { q: query },
        }),
    addToCart: (userId, productId, quantity) =>
        api.post('/cart', { userId, productId, quantity }),  // POST api/Cart

    getCart: (userId) =>
        api.get('/cart', { params: { userId } }),     // GET api/Cart?userId=...

    getOrders: () => api.get("/admin/orders"),

    getOrderDetails: (orderId) =>
  api.get(`/admin/orders/${orderId}`)
    
};