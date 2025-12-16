import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import api from '../Services/api';
import ProductGrid from '../Components/ProductGrid';

export default function CategoryPage(){
const { slug } = useParams();
const [products,setProducts] = useState([]);

useEffect(()=>{
api.getProducts({ category: slug, page:1, pageSize:48 }).then(r=>setProducts(r.data)).catch(e=>console.error(e));
},[slug]);

return (
<div>
<h3>Category: {slug}</h3>
<ProductGrid products={products} />
</div>
);
}