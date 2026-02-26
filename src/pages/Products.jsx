import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import { useLocation, useNavigate } from "react-router-dom";

const SORT_OPTIONS = [
  { value: "default", label: "Features" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A–Z" },
  { value: "name_desc", label: "Name: Z–A" },
];

const SkeletonCard = () => (
  <div className="bg-white rounded shadow-sm overflow-hidden animate-pulse">
    <div className="w-full aspect-[3/4] bg-gray-200" />
    <div className="p-3 space-y-2">
      <div className="h-4 bg-gray-200 w-3/4 rounded" />
      <div className="h-3 bg-gray-200 w-1/2 rounded" />
    </div>
  </div>
);

const GridIcon = ({ size = 3 }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    {size === 3 ? (
      <>
        <rect x="0" y="0" width="4" height="4" />
        <rect x="6" y="0" width="4" height="4" />
        <rect x="12" y="0" width="4" height="4" />
        <rect x="0" y="6" width="4" height="4" />
        <rect x="6" y="6" width="4" height="4" />
        <rect x="12" y="6" width="4" height="4" />
        <rect x="0" y="12" width="4" height="4" />
        <rect x="6" y="12" width="4" height="4" />
        <rect x="12" y="12" width="4" height="4" />
      </>
    ) : (
      <>
        <rect x="0" y="0" width="7" height="7" />
        <rect x="9" y="0" width="7" height="7" />
        <rect x="0" y="9" width="7" height="7" />
        <rect x="9" y="9" width="7" height="7" />
      </>
    )}
  </svg>
);

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  // const search = query.get("search")?.toLowerCase() || "";
  const search = query.get("search")?.toLowerCase() || "";
const category = query.get("category")?.toLowerCase() || "";

  const [sortBy, setSortBy] = useState("default");
  const [gridCols, setGridCols] = useState(3);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const displayedProducts = useMemo(() => {
    let result = items;

if (search) {
  result = result.filter((p) =>
    p.name.toLowerCase().includes(search)
  );
}

if (category) {
  result = result.filter((p) =>
    p.category?.toLowerCase() === category
  );
}
    switch (sortBy) {
      case "price_asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        result = [...result].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case "name_desc":
        result = [...result].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;
      default:
        break;
    }

    return result;
  }, [items, search, sortBy]);

  const clearSearch = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-serif">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-10 border-b">
        <div className="flex flex-wrap justify-between items-end gap-4">
          <h1 className="text-3xl md:text-4xl italic font-light tracking-wide">
            {search ? `Results for "${search}"` : "Collection"}
          </h1>

          {!loading && (
            <span className="text-xs uppercase tracking-widest text-gray-500 font-sans">
              {displayedProducts.length}{" "}
              {displayedProducts.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-6">
          {/* Sort */}
          <select
            className="border px-4 py-2 text-sm font-sans rounded focus:outline-none focus:ring-1 focus:ring-black"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {/* Search Badge */}
          {search && (
            <span className="flex items-center gap-2 px-3 py-1 bg-gray-200 text-sm font-sans rounded">
              {search}
              <button
                onClick={clearSearch}
                className="text-gray-500 hover:text-black"
              >
                ×
              </button>
            </span>
          )}

          {/* Grid Toggle */}
          <div className="flex gap-1 ml-auto">
            <button
              onClick={() => setGridCols(3)}
              className={`p-2 border rounded ${
                gridCols === 3
                  ? "bg-black text-white"
                  : "bg-white text-gray-500"
              }`}
            >
              <GridIcon size={3} />
            </button>
            <button
              onClick={() => setGridCols(2)}
              className={`p-2 border rounded ${
                gridCols === 2
                  ? "bg-black text-white"
                  : "bg-white text-gray-500"
              }`}
            >
              <GridIcon size={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main
        className={`max-w-7xl mx-auto px-6 py-10 grid gap-6 ${
          gridCols === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        ) : displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <div
              key={product.id}
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 space-y-4">
            <div className="text-5xl text-gray-300">◯</div>
            <p className="text-xl italic">No items found</p>
            <p className="text-sm uppercase tracking-widest text-gray-400 font-sans">
              {search
                ? `We couldn't find anything matching "${search}"`
                : "Check back soon — new arrivals coming soon"}
            </p>

            {search && (
              <button
                onClick={clearSearch}
                className="mt-4 px-6 py-2 bg-black text-white text-xs uppercase tracking-widest rounded"
              >
                View All Products
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;