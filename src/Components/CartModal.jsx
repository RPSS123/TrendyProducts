import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

export default function CartModal() {
    const { cart, removeFromCart, isCartOpen, toggleCart } = useContext(CartContext);

    if (!isCartOpen) return null;

    return (
        <div className="cart-backdrop">
            <div className="cart-modal">
                <h4>Your Cart</h4>

                {cart.length === 0 && <p>Cart is Empty</p>}

                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.title} className="cart-item" />
                        <div className="cart-item-info">
                            <h6 className="mb-1">{item.title}</h6>
                            <small className="text-muted">
                                {item.currency} {item.price}
                            </small>
                        </div>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id)}>❌</button>
                    </div>
                ))}
                <button className="btn btn-outline-secondary mt-3"
                    onClick={toggleCart}>Close</button>
            </div>
        </div>
    )
}