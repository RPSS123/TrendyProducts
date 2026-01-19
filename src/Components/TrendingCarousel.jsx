import React from 'react';
import { Link } from 'react-router-dom';
import {API_ORIGIN} from '../Services/api';
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

export default function TrendingCarousel({items}){

    const { addToCart } = useContext(CartContext);

if(!items || items.length === 0) return null;
return (
<div id="trendingCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
<div className="carousel-inner">
{items.map((group, idx) => (
<div className={`carousel-item ${idx===0? 'active':''}`} key={idx}>
<div className="d-flex gap-3 justify-content-center">
{group.map((p) => (
<div className="card" style={{width: 220}} key={p.id}>
<img src={`${API_ORIGIN}${p.imageUrl}`} className="card-img-top" alt={p.title} style={{height:120,objectFit:'cover'}} />
<div className="card-body p-2 small">
<div>{p.title}</div>
<div className="fw-bold">{p.currency} {p.price}</div>
<div className="d-flex gap-2 mt-auto">
  <Link
    to={`/product/${p.slug}`}
    className="btn btn-sm btn-outline-primary w-50"
  >
    View
  </Link>

  <button
    className="btn btn-sm btn-primary w-50"
     disabled={!p?.id}
    onClick={() => addToCart(p)}
  >
    Add to Cart
  </button>
</div>
</div>
</div>
))}
</div>
</div>
))}
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#trendingCarousel" data-bs-slide="prev">
<span className="carousel-control-prev-icon" aria-hidden="true"></span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#trendingCarousel" data-bs-slide="next">
<span className="carousel-control-next-icon" aria-hidden="true"></span>
</button>
</div>
);
}