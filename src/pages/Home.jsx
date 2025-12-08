import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import HeroCarousel from "../components/HeroCarousel";

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const trending = items.slice(0, 6); // show first 6 products

  return (
    <div className="min-h-screen">

        <HeroCarousel />

      {/* HERO SECTION */}
      <section className="bg-gray-100 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Your Style, Your Store.
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Discover the latest trends in fashion, footwear, and accessories.
        </p>

        <Link
          to="/products"
          className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-lg text-lg"
        >
          Shop Now →
        </Link>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <CategoryCard
            title="Shoes"
            img="https://images.unsplash.com/photo-1606813902911-9b52b6d99035"
            link="/products?search=shoes"
          />
          <CategoryCard
            title="Clothing"
            img="https://images.unsplash.com/photo-1523381294911-8d3cead13475"
            link="/products?search=shirt"
          />
          <CategoryCard
            title="Accessories"
            img="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
            link="/products?search=watch"
          />
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-6">Trending Products</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
