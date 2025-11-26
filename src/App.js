import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import CategoryPage from './Pages/CategoryPage';
import ProductPage from './Pages/ProductPage';

function App() {
return (
<div className="d-flex flex-column min-vh-100">
<Header />
<main className="flex-grow-1 container my-4">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/category/:slug" element={<CategoryPage />} />
<Route path="/product/:slug" element={<ProductPage />} />
</Routes>
</main>
<Footer />
</div>
);
}

export default App;