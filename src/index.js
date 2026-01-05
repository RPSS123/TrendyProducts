import React from 'react';
import { CartProvider } from "./Context/CartContext";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
<React.StrictMode>
<BrowserRouter>
<CartProvider>
<App />
</CartProvider>
</BrowserRouter>
</React.StrictMode>
);