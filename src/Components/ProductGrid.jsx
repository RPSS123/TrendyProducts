import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({products}){
return (
<div className="row g-3">
{products.map(p => (
<div className="col-6 col-md-4 col-lg-3" key={p.id || p.Id}>
<ProductCard product={p} />
</div>
))}
</div>
);
}