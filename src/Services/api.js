import axios from 'axios';

const api = axios.create({
baseURL: process.env.REACT_APP_API_URL || 'https://localhost:5001/api',
timeout: 10000
});

export default {
getCategories: () => api.get('/categories'),
getProducts: (params) => api.get('/products', { params }),
getProductBySlug: (slug) => api.get(`/products/${slug}`),
getTopByCategory: (categoryId, limit=10) => api.get(`/products/category/${categoryId}/top`, { params: { limit } })
};