import { useEffect, useState } from "react";
import api from "../services/apiClient";

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}`, { status });
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white shadow rounded p-6">

            {/* ORDER HEADER */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <div>
                <h2 className="text-xl font-bold">Order #{order.id}</h2>
                <p className="text-sm text-gray-600">
                  Placed on {new Date(order.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  By: <span className="font-medium">{order.user_name}</span> ({order.user_name?.user_email})
                </p>
              </div>

              <div className="text-right">
                <p className="text-xl font-semibold">₹{order.total_amount}</p>

                <select
                  className="mt-2 border p-2 rounded"
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PAID">PAID</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
            </div>

            {/* ORDER ITEMS */}
            <div className="mt-4 space-y-3">
              <h3 className="text-lg font-semibold mb-2">Items:</h3>

              {order.items?.map((item) => (
                <div
                  key={item.product_id}
                  className="flex justify-between bg-gray-50 p-3 rounded-md"
                >
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{item.quantity * item.price}
                  </p>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersAdmin;
