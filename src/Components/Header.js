import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
return (
<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
<div className="container">
<Link className="navbar-brand" to="/">TrendyProducts</Link>
<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
<span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navMenu">
<ul className="navbar-nav ms-auto">
<li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
<li className="nav-item"><Link className="nav-link" to="/">Trending</Link></li>
<li className="nav-item"><a className="nav-link" href="#india">India Showcase</a></li>
</ul>
</div>
</div>
</nav>
);
}