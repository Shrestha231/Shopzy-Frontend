import { useEffect, useState } from "react";
import api from "../services/apiClient";
import { Link } from "react-router-dom";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Link
          to="/admin/products/add"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </div>

      <div className="bg-white shadow rounded p-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex justify-between border-b py-3 items-center"
          >
            <span>{p.name}</span>

            <div className="flex gap-4">
              <Link
                to={`/admin/products/edit/${p.id}`}
                className="text-blue-600"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteProduct(p.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsAdmin;
