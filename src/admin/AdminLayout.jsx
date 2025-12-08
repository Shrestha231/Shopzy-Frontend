import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-black text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-4">
          <a className="block" href="/admin">Dashboard</a>
          <a className="block" href="/admin/products">Products</a>
          <a className="block" href="/admin/orders">Orders</a>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
