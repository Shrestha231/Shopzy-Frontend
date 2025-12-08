import { useState } from "react";
import api from "../services/apiClient";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    stock: "",
    category: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const saveProduct = async () => {
    await api.post("/products", product);
    navigate("/admin/products");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      <div className="space-y-3">
        {Object.keys(product).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        ))}

        <button
          onClick={saveProduct}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Save Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
