import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import api, {API_ORIGIN} from '../Services/api';
import { useNavigate } from 'react-router-dom';

export default function ProductPage(){
const { slug } = useParams();
const [product,setProduct] = useState(null);
const navigate = useNavigate();

function Checkout() {
        navigate('/checkout');
    }

useEffect(()=>{
api.getProductBySlug(slug).then(r=>setProduct(r.data)).catch(e=>console.error(e));
},[slug]);

if(!product) return <div>Loading...</div>;

return (
<div className="row">
<div className="col-md-6">
<img src={`${API_ORIGIN}${product.imageUrl}`} alt={product.title} className="img-fluid" />
</div>
<div className="col-md-6">
<h3>{product.title}</h3>
<p className="text-muted">{product.salesCount} sold · {product.rating}⭐</p>
<h4 className="text-success">{product.currency} {product.price}</h4>
<p>{product.description}</p>
<button className="btn btn-primary" onClick={Checkout}>Buy Now</button>
</div>
</div>
);
}