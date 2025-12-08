import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import api from "../services/apiClient";
import { useState } from "react";



const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  if (!token) {
    navigate("/login");
  }

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      setLoading(true);

      // Prepare order items format for backend
      const orderItems = items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const orderData = {
        total_amount: totalAmount,
        items: orderItems,
      };

      await api.post("/orders", orderData);

      dispatch(clearCart()); // clear cart after success
      navigate("/orders"); // redirect to orders page
    } catch (error) {
      console.log(error);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">Cart is Empty</h2>
        <button
          onClick={() => navigate("/products")}
          className="text-blue-600 underline"
        >
          Continue Shopping →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between border-b py-2"
          >
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span>₹{item.product.price * item.quantity}</span>
          </div>
        ))}

        <div className="flex justify-between text-xl font-bold mt-4">
          <span>Total:</span>
          <span>₹{totalAmount}</span>
        </div>

        <button
          disabled={loading}
          onClick={placeOrder}
          className="mt-6 w-full bg-black text-white py-3 rounded-lg text-lg"
        >
          {loading ? "Placing Order..." : "Place Order →"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
