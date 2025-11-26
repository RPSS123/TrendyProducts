import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({product}){
return (
<div className="card product-card h-100">
<img src={product.imageUrl || '/placeholder.png'} className="card-img-top" alt={product.title} />
<div className="card-body d-flex flex-column">
<h6 className="card-title">{product.title}</h6>
<p className="mt-auto mb-1 fw-bold">{product.currency} {product.price}</p>
<p className="text-muted small mb-2">{product.salesCount} sold · {product.rating}⭐</p>
<Link to={`/product/${product.slug}`} className="btn btn-sm btn-outline-primary">View</Link>
</div>
</div>
);
}