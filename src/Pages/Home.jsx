import React, { useEffect, useState } from 'react';
import CategoryGrid from '../Components/CategoryGrid';
import TrendingCarousel from '../Components/TrendingCarousel';
import { chunkArray } from '../Utils/helpers';
import api from '../Services/api';

export default function Home(){
const [products,setProducts] = useState([]);
const [topTrending,setTopTrending] = useState([]);
const [categories, setCategories] = useState([]);

useEffect(() => {
  api.getCategories().then(res => setCategories(res.data));
}, []);


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
     <CategoryGrid categories={categories} />

<section className="container my-5">
      <h3 className="text-center mb-4">Trending Now</h3>
      <TrendingCarousel items={topTrending} />
    </section>
</div>
);
}