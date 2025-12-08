import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image_url}
          alt={product.name}
          className="h-48 w-full object-cover rounded-lg"
        />
      </Link>

      <Link to={`/products/${product.id}`}>
        <h2 className="mt-2 font-semibold text-lg">{product.name}</h2>
      </Link>

      <p className="text-slate-600 text-sm">{product.category}</p>
      <p className="text-xl font-bold mt-1">₹{product.price}</p>

      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-black text-white py-2 rounded-lg"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
