import { useEffect, useState } from "react";
import api from "../services/apiClient";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateProduct = async () => {
    await api.put(`/products/${id}`, product);
    navigate("/admin/products");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <div className="space-y-3">
        {Object.keys(product).map((key) => (
          <input
            key={key}
            name={key}
            value={product[key]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        ))}

        <button
          onClick={updateProduct}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
