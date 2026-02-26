import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { HiMenu, HiX, HiSearch } from "react-icons/hi";

import logo from "../../assets/logo1.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const isAdmin = user?.role === "ADMIN";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/products?search=${search}`);
    setSearch("");
    setOpen(false); 
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* LOGO */}
        {/* <Link to="/" className="text-xl font-bold">Shopsy</Link> */}

        <Link to="/" className="flex items-center gap-2">
  <img 
    src={logo} 
    alt="Shopzy Logo" 
    className="w-28 h-12 object-cover" 
  />
</Link>


        {/* SEARCH BAR (DESKTOP) */}
        {!isAdmin && (
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center w-1/2 bg-gray-100 rounded-full px-4 py-2"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none"
            />
            <button type="submit">
              <HiSearch size={22} className="text-gray-600" />
            </button>
          </form>
        )}

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">

          {/* Products (NOT for admin) */}
          {!isAdmin && <Link to="/products">Products</Link>}
           {/* {!isAdmin && <Link to="/contact">Contact</Link>} */}

          {/* Admin Panel only for admin */}
          {isAdmin && (
            <Link to="/admin" className="text-blue-600 font-semibold">
              Admin Panel
            </Link>
          )}

          {/* Cart (NOT for admin) */}
          {!isAdmin && (
            <Link to="/cart" className="relative">
              Cart
              {items.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-black text-white text-xs px-2 py-1 rounded-full">
                  {items.length}
                </span>
              )}
            </Link>
          )}

          {/* Orders (NOT for admin) */}
          {!isAdmin && user && <Link to="/orders">Orders</Link>}

          {/* Login / Logout */}
          {!user ? (
            <Link to="/login">Login</Link>
          ) : (
            <div className="flex items-center gap-3">
              <span className="font-semibold">{user.name}</span>
              <button onClick={handleLogout} className="text-red-600 font-semibold">
                Logout
              </button>
            </div>
          )}
          
          
        </div>

        {/* MOBILE HAMBURGER ICON */}
        <div className="md:hidden">
          {open ? (
            <HiX size={28} onClick={() => setOpen(false)} className="cursor-pointer" />
          ) : (
            <HiMenu size={28} onClick={() => setOpen(true)} className="cursor-pointer" />
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
     {open && (
  <div className="md:hidden bg-white shadow-lg px-4 py-5 space-y-4">

    {/* MOBILE SEARCH */}
    {!isAdmin && (
      <form
        onSubmit={handleSearch}
        className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none"
        />
        <button type="submit">
          <HiSearch size={22} className="text-gray-600" />
        </button>
      </form>
    )}

    {/* Products */}
    {!isAdmin && (
      <Link
        to="/products"
        onClick={() => setOpen(false)}
        className="block"
      >
        Products
      </Link>
    )}

    {/* Contact
    {!isAdmin && (
      <Link
        to="/contact"
        onClick={() => setOpen(false)}
        className="block"
      >
        Contact
      </Link>
    )} */}

    {/* Cart */}
    {!isAdmin && (
      <Link
        to="/cart"
        onClick={() => setOpen(false)}
        className="block"
      >
        Cart
        {items.length > 0 && (
          <span className="ml-2 bg-black text-white text-xs px-2 py-1 rounded-full">
            {items.length}
          </span>
        )}
      </Link>
    )}

    {/* Orders */}
    {!isAdmin && user && (
      <Link
        to="/orders"
        onClick={() => setOpen(false)}
        className="block"
      >
        Orders
      </Link>
    )}

    {/* Admin */}
    {isAdmin && (
      <Link
        to="/admin"
        onClick={() => setOpen(false)}
        className="block text-blue-600 font-semibold"
      >
        Admin Panel
      </Link>
    )}

    {/* Login / Logout */}
    {!user ? (
      <Link
        to="/login"
        onClick={() => setOpen(false)}
        className="block"
      >
        Login
      </Link>
    ) : (
      <div className="flex flex-col gap-2">
        <span className="font-semibold">{user.name}</span>
        <button
          onClick={handleLogout}
          className="text-red-600 text-left font-semibold"
        >
          Logout
        </button>
      </div>
    )}
  </div>
)}
    </nav>
  );
};

export default Navbar;
