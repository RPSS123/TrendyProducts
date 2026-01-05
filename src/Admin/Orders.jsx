import { useEffect, useState } from "react";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.getOrders().then(res => setOrders(res.data));
  }, []);

  return (
    <div className="container">
      <h3>Orders</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o.orderId} onClick={() => navigate(`/admin/orders/${o.orderId}`)} style={{cursor:"pointer"}}>
              <td>{o.orderId}</td>
              <td>{o.fullName}</td>
              <td>₹{o.totalAmount}</td>
              <td>{o.status}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
