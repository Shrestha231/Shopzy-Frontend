import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await dispatch(loginUser(formData));
//     if (result.meta.requestStatus === "fulfilled") navigate("/");
//   };

const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await dispatch(loginUser(formData));

  if (result.meta.requestStatus === "fulfilled") {
    const loggedUser = result.payload.user;

    if (loggedUser.role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
