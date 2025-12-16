import React, { useState, useEffect } from 'react';
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
    const [cartCount, setCartCount] = useState(0);   // NEW

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user-info')));
    }, [location]);

    useEffect(() => {
        async function fetchCart() {
            if (!user) {
                setCartCount(0);
                return;
            }

            try {
                // user-id ka field jaisa aapke user-info me hai waisa use karein
                const userId = user.id || user.userId;
                if (!userId) return;

                const res = await api.getCart(userId);
                const items = res.data || [];
                setCartCount(items.length);   // ya items.totalQuantity agar waise design kiya ho
            } catch (err) {
                console.error('Cart load error', err);
            }
        }

        fetchCart();
    }, [user]);


    function Logout() {
        localStorage.removeItem('user-info');   // clear nahi, ye karo
        setUser(null);
        setCartCount(0);
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
                        <li className="nav-item"><Link className="nav-link" to="/">Trending</Link></li>
                        <li className="nav-item"><a className="nav-link" href="#india">India Showcase</a></li>
                        <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
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
                    <Link
                        to="/cart"
                        className="nav-link position-relative text-white me-3 p-0"
                        style={{ fontSize: "1.4rem" }}   // size bada & vertically center
                    >
                        🛒
                        {cartCount > 0 && (
                            <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    {showAlert && (
                        <Alert variant="success" dismissible onClose={() => setShowAlert(false)}>
                            You have successfully logged out!
                        </Alert>
                    )}
                    {user && (
                        <Nav>
                            <NavDropdown title={<span className="text-white">{user.name}</span>} align="end">
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Item>Favourite</NavDropdown.Item>
                                <NavDropdown.Item onClick={add}>Add Product</NavDropdown.Item>
                                <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )}
                </div>
            </div>
        </nav>
    );
}