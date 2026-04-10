import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ShopLogin = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://work-wagon-ez8e.onrender.com/shop/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(form)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("shop", JSON.stringify(data));
        navigate("/");
      } else {
        setError("Invalid email or password");
      }

    } catch (err) {
      setError("Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Shop Login
        </h2>

        <p className="text-sm text-center text-gray-500 mb-8">
          Welcome back! Please login to continue
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div className="flex flex-col relative">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 text-sm cursor-pointer text-indigo-500"
            >
              {showPassword ? "Hide" : "Show"}
            </span>

          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 text-white font-semibold py-3 rounded-xl transition duration-300
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"}
            `}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/shop_register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register here
          </Link>
        </p>

      </div>

    </div>
  );
};

export default ShopLogin;