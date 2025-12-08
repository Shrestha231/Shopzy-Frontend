import { useSelector, useDispatch } from "react-redux";
import { increaseItem, decreaseItem, removeFromCart } from "../features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <Link to="/products" className="text-blue-600 underline">
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT CART ITEMS */}
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center bg-white p-4 rounded-xl shadow-md"
            >
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                <p className="text-sm text-slate-600">₹{item.product.price}</p>

                {/* Quantity Controls */}
                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={() => dispatch(decreaseItem(item.product.id))}
                    className="px-3 py-1 bg-gray-200 rounded-md"
                  >
                    -
                  </button>

                  <span className="text-lg font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => dispatch(increaseItem(item.product.id))}
                    className="px-3 py-1 bg-gray-200 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeFromCart(item.product.id))}
                className="text-red-500 font-semibold ml-4"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT ORDER SUMMARY */}
        <div className="bg-white p-6 shadow-md rounded-xl">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Total Items:</span>
            <span>{items.length}</span>
          </div>

          <div className="flex justify-between text-lg font-semibold">
            <span>Total Price:</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-6 w-full bg-black text-white py-3 rounded-lg text-lg"
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
