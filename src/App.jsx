import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import CategoryPage from './Pages/CategoryPage';
import ProductPage from './Pages/ProductPage';
import Login from './Components/Login';
import Register from './Components/Register';
import Header from './Components/Header';
import AddProducts from './Pages/AddProduct';

function App() {
return (
<div className="d-flex flex-column min-vh-100">
<Header />
<main className="flex-grow-1 container my-4">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/category/:slug" element={<CategoryPage />} />
<Route path="/product/:slug" element={<ProductPage />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/addproduct" element={<AddProducts />} />
</Routes>
</main>
<Footer />
</div>
);
}

export default App;