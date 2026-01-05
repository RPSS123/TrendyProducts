import React, { useState, useEffect, useContext } from 'react';
import {CartContext} from '../Context/CartContext'
import { Nav, NavDropdown, Alert } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';

export default function Header() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user-info')));
    const [showAlert, setShowAlert] = useState(false);
    const location = useLocation();
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { cart, toggleCart } = useContext(CartContext);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user-info')));
    }, [location]);


    function Logout() {
        localStorage.removeItem('user-info');   // clear nahi, ye karo
        setUser(null);
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    }

    function add() {
        navigate('/addproduct');
    }

    async function handleSearch(e) {
        e.preventDefault();
        const term = search.trim();
        if (!term) return;

        try {
            const res = await api.searchProducts(term);

            const results = res.data || [];
            if (results.length === 0) {
                alert("No product found for: " + term);
                return;
            }

            const product = results[0];          // pehla match
            // yahan 'slug' ko apne actual field se match karao (id ho toh id use karo)
            navigate(`/product/${product.slug}`);
        } catch (err) {
            console.error("Search error:", err);
            alert("Error while searching product");
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">TrendyProducts</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/trending">Trending</Link></li>
                        {!user && 
                        (<li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>)}
                        {!user &&
                        (<li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>)}
                        {user?.role === "admin" &&
                        (<li className="nav-item"><Link className="nav-link" to="/admin/orders">Orders</Link></li>)}
                    </ul>
                    <form className="d-flex ms-auto me-3" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search products"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn btn-outline-light" type="submit">
                            Search
                        </button>
                    </form>
                    <span
                        className="nav-link position-relative text-white me-3 p-0"
                        style={{ fontSize: "1.4rem", cursor: "pointer" }}
                        onClick={toggleCart}
                    >
                        🛒
                        {cart.length > 0 && (
                            <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                                {cart.length}
                            </span>
                        )}
                    </span>
                    {showAlert && (
                        <Alert variant="success" dismissible onClose={() => setShowAlert(false)}>
                            You have successfully logged out!
                        </Alert>
                    )}
                    {user && (
                        <Nav>
                            <NavDropdown title={<span className="text-white">{user?.name}</span>} align="end">
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Item>Favourite</NavDropdown.Item>
                                {user?.role ==="admin" && 
                                (<NavDropdown.Item onClick={add}>Add Product</NavDropdown.Item> )}
                                <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )}
                </div>
            </div>
        </nav>
    );
}