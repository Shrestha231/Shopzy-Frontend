// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../features/products/productSlice";
// import ProductCard from "../components/ProductCard";

// const Products = () => {
//   const dispatch = useDispatch();
//   const { items, loading } = useSelector(state => state.products);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {items.map(product => (
//         <ProductCard key={product.id} product={product}/>
//       ))}
//     </div>
//   );
// };

// export default Products;




import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.products);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("search")?.toLowerCase() || "";

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading)
    return <p className="text-center mt-10">Loading...</p>;

  // Filter products based on search input
  const filteredProducts = items.filter((product) =>
    product.name.toLowerCase().includes(search)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p className="text-center col-span-3 text-gray-500 text-lg">
          No products found for "{search}"
        </p>
      )}
    </div>
  );
};

export default Products;
