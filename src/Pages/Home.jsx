import React, { useEffect, useState } from 'react';
import ProductGrid from '../Components/ProductGrid';
import TrendingCarousel from '../Components/TrendingCarousel';
import { chunkArray } from '../Utils/helpers';
import api from '../Services/api';

export default function Home(){
const [products,setProducts] = useState([]);
const [topTrending,setTopTrending] = useState([]);

useEffect(()=>{
// fetch products (global) - simple sample
api.getProducts({ page:1, pageSize:24 }).then((r) => { console.log("products", r.data); 
    setProducts(r.data);
})
    .catch(e=>console.error(e));
// for carousel, use top products (we'll reuse product list and chunk it)
api.getProducts({ page:1, pageSize:12, sort:'popularity' }).then(r => setTopTrending(chunkArray(r.data,4))).catch(()=>{});
},[]);

return (
<div>
<h3 className="mb-3">Trending Now</h3>
<TrendingCarousel items={topTrending} />

<div className="d-flex justify-content-between align-items-center mb-2">
<h4>Best Selling</h4>
<a href="#india" className="small">View India Showcase</a>
</div>

<ProductGrid products={products} />

<section id="india" className="mt-5">
<h4>India Showcase</h4>
<p className="small text-muted">Curated picks for Indian market</p>
{/* For demo we reuse same products */}
<ProductGrid products={products.slice(0,8)} />
</section>
</div>
);
}