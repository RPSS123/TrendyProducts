import { useEffect, useState } from "react";
import TrendingCarousel from "../Components/TrendingCarousel";
import api from "../Services/api";
import { chunkArray } from "../Utils/helpers";

export default function TrendingPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .getProducts({ page: 1, pageSize: 12, sort: "popularity" })
      .then(res => setItems(chunkArray(res.data, 4)))
      .catch(() => {});
  }, []);

  return (
    <div>
      <h3 className="text-center mb-4">Trending Products</h3>
      <TrendingCarousel items={items} />
    </div>
  );
}
