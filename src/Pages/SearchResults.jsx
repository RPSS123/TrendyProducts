import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../Components/ProductCard";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5286/api",
  timeout: 10000,
});

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!q) return;

    async function fetchProducts() {
      try {
        const res = await api.get("/products/search", {
          params: { q },          // yaha param name API ke hisab se
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Search error:", err);
      }
    }

    fetchProducts();
  }, [q]);

  return (
    <div className="container mt-4">
      <h2>Search results for "{q}"</h2>

      <div className="row mt-3">
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p.id} className="col-md-3 mb-3">
              <ProductCard product={p} />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
