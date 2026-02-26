import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
// import Home from "./pages/Home";
// import Products from "./pages/Products";
// import ProductDetails from "./pages/ProductDetails";
// import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Home from "./pages/Home";



import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ProductsAdmin from "./admin/ProductsAdmin";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import OrdersAdmin from "./admin/OrdersAdmin";
import Footer from "./components/layout/Footer";
// import Contact from "./components/Contact";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />
         <Route path="/products/:id" element={<ProductDetails />} />
         <Route path="/checkout" element={<Checkout />} />
         <Route path="/orders" element={<Orders />} />


        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         {/* <Route path="contact" element={<Contact />} /> */}



        <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="products" element={<ProductsAdmin />} />
    <Route path="products/add" element={<AddProduct />} />
    <Route path="products/edit/:id" element={<EditProduct />} />
    <Route path="orders" element={<OrdersAdmin />} />
   
</Route>
      </Routes>


      <Footer />
    </div>
  );
}

export default App;
