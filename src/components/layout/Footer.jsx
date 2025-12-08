const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Shopzy</h2>
          <p className="text-gray-300">
            Your trusted online shopping destination.  
            Quality products, fast delivery, and top-notch service.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/orders" className="hover:text-white">My Orders</a></li>
            <li><a href="/cart" className="hover:text-white">Shopping Cart</a></li>
            <li><a href="/login" className="hover:text-white">Login</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="text-gray-300 space-y-2">
            <li>Email: support@shopsy.com</li>
            <li>Phone: +91 9988998877</li>
            <li>Address: Noida, India</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10">
        © {new Date().getFullYear()} Shopzy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
