import React from 'react';
import { Link } from 'react-router-dom';
import {API_ORIGIN} from '../Services/api';
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

export default function ProductCard({product}){
    const { addToCart } = useContext(CartContext);

return (
<div className="card product-card h-100">
<img src={`${API_ORIGIN}${product.imageUrl}` || '/placeholder.png'} className="card-img-top" alt={product.title} />
<div className="card-body d-flex flex-column">
<h6 className="card-title">{product.title}</h6>
<p className="mt-auto mb-1 fw-bold">{product.currency} {product.price}</p>
<p className="text-muted small mb-2">{product.salesCount} sold · {product.rating}⭐</p>
<div className="d-flex gap-2 mt-auto">
  <Link
    to={`/product/${product.slug}`}
    className="btn btn-sm btn-outline-primary w-50"
  >
    View
  </Link>

  <button
    className="btn btn-sm btn-primary w-50"
     disabled={!product?.id}
    onClick={() => addToCart(product)}
  >
    Add to Cart
  </button>
</div>
</div>
</div>
);
}