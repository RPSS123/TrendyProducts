import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Services/api";

export default function OrderDetail() {
  const { orderId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.getOrderDetails(orderId)
  }, [orderId]);

  if (!data) return null;

  const { order, items } = data;

  return (
    <div className="container">
      <h3>Order #{order.orderId}</h3>

      <h5>Customer</h5>
      <p>
        {order.fullName}<br/>
        {order.email}<br/>
        {order.phone}<br/>
        {order.addressLine}, {order.city}
      </p>

      <h5>Products</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>SubTotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i, idx) => (
            <tr key={idx}>
              <td>{i.title}</td>
              <td>₹{i.priceAtPurchase}</td>
              <td>{i.quantity}</td>
              <td>₹{i.subTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h5>Total: ₹{order.totalAmount}</h5>
    </div>
  );
}
