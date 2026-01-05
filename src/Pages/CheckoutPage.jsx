import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CartContext } from "../Context/CartContext";
import api from "../Services/api";

/* ------------------ ZOD SCHEMA ------------------ */
const checkoutSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be valid"),
  addressLine: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(5, "Pincode is required"),
});

/* ------------------ COMPONENT ------------------ */
export default function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  /* ------------------ FORM SETUP ------------------ */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  /* ------------------ TOTAL (UI ONLY) ------------------ */
  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * 1, 0);
  }, [cart]);

  /* ------------------ SUBMIT HANDLER ------------------ */
  const onSubmit = async (data) => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const payload = {
      customer: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        addressLine: data.addressLine,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
      },
      items: cart.map((item) => ({
        productId: item.id,
        quantity: 1,
      })),
    };

    try {
      setLoading(true);
      const res = await api.post("/checkout", payload);
      const orderId = res.data.orderId;

      clearCart(); // clear only AFTER success
      navigate(`/order-success/${orderId}`);
    } catch (err) {
      console.error(err);
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="container my-5">
      <h3 className="mb-4">Checkout</h3>

      <div className="row">
        {/* ---------------- ORDER SUMMARY ---------------- */}
        <div className="col-md-5 mb-4">
          <div className="card">
            <div className="card-body">
              <h5>Order Summary</h5>
              <hr />

              {cart.map((item) => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>{item.title}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}

              <hr />
              <div className="fw-bold d-flex justify-content-between">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- CHECKOUT FORM ---------------- */}
        <div className="col-md-7">
          <form onSubmit={handleSubmit(onSubmit)} className="card p-4">
            <h5 className="mb-3">Customer Details</h5>

            <input
              className="form-control mb-2"
              placeholder="Full Name"
              {...register("fullName")}
            />
            {errors.fullName && <small className="text-danger">{errors.fullName.message}</small>}

            <input
              className="form-control mb-2"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && <small className="text-danger">{errors.email.message}</small>}

            <input
              className="form-control mb-2"
              placeholder="Phone"
              {...register("phone")}
            />
            {errors.phone && <small className="text-danger">{errors.phone.message}</small>}

            <input
              className="form-control mb-2"
              placeholder="Address"
              {...register("addressLine")}
            />
            {errors.addressLine && <small className="text-danger">{errors.addressLine.message}</small>}

            <div className="row">
              <div className="col-md-6">
                <input
                  className="form-control mb-2"
                  placeholder="City"
                  {...register("city")}
                />
                {errors.city && <small className="text-danger">{errors.city.message}</small>}
              </div>

              <div className="col-md-6">
                <input
                  className="form-control mb-2"
                  placeholder="State"
                  {...register("state")}
                />
                {errors.state && <small className="text-danger">{errors.state.message}</small>}
              </div>
            </div>

            <input
              className="form-control mb-3"
              placeholder="Pincode"
              {...register("pincode")}
            />
            {errors.pincode && <small className="text-danger">{errors.pincode.message}</small>}

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
