import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/apiClient";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams(); // get the product id from URL
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-xl">Loading product...</p>;

  if (!product)
    return <p className="text-center mt-10 text-red-500 text-lg">Product not found</p>;

  // Add to cart handler
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
      })
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* LEFT IMAGE SECTION */}
      <div>
        <img
          src={product.image_url}
          alt={product.name}
          className="rounded-xl shadow-md w-full object-cover h-[400px]"
        />
      </div>

      {/* RIGHT DETAILS SECTION */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-slate-600 mb-3">{product.category}</p>

        <p className="text-2xl font-semibold text-black">₹{product.price}</p>

        <p className="mt-4 text-gray-700 leading-relaxed">{product.description}</p>

        <div className="mt-6">
          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-black text-white rounded-lg text-lg w-full md:w-auto"
          >
            Add to Cart
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-600">
          Stock Available: {product.stock}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
