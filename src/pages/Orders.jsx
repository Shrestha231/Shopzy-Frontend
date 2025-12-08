import { useEffect, useState } from "react";
import api from "../services/apiClient";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/my-orders");
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-xl">Loading your orders...</p>;

  if (orders.length === 0)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">No Orders Found</h2>
        <button
          onClick={() => navigate("/products")}
          className="text-blue-600 underline"
        >
          Browse Products →
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;


// Separated Order Card Component for Clean UI
const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded(!expanded);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg">Order #{order.id}</p>
          <p className="text-slate-600 text-sm">
            Placed on {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="text-right">
          <p className="font-bold text-xl">₹{order.total_amount}</p>
          <p
            className={`font-semibold ${
              order.status === "DELIVERED"
                ? "text-green-600"
                : order.status === "SHIPPED"
                ? "text-blue-600"
                : order.status === "CANCELLED"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {order.status}
          </p>
        </div>
      </div>

      <button
        onClick={toggle}
        className="mt-4 text-blue-600 underline"
      >
        {expanded ? "Hide Items" : "View Items"}
      </button>

      {expanded && <OrderItems orderId={order.id} />}
    </div>
  );
};


// Component to show items of a specific order
const OrderItems = ({ orderId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const { data } = await api.get(`/orders/${orderId}`);
        setItems(data.items);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrderItems();
  }, [orderId]);

  return (
    <div className="mt-4 space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image_url}
              alt={item.product_name}
              className="w-14 h-14 rounded-lg object-cover"
            />

            <div>
              <p className="font-semibold">{item.product_name}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
          </div>

          <p className="font-semibold">₹{item.price}</p>
        </div>
      ))}
    </div>
  );
};

