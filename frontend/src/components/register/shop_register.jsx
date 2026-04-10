import { useState } from "react";
import { Link } from "react-router-dom";

const ShopRegister = () => {

  const [shop, setShop] = useState({
    shop_name: "",
    job_name: "",
    shop_keeper_name: "",
    mobile: "",
    email: "",
    available: "",
    password: ""
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setShop({
      ...shop,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};

    if (!imageFile) newErrors.image = "Image is required";
    if (!/^\d{10}$/.test(shop.mobile))
      newErrors.mobile = "Mobile must be 10 digits";
    if (!/\S+@\S+\.\S+/.test(shop.email))
      newErrors.email = "Invalid email format";
    if (shop.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (shop.password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validate()) return;

    const formData = new FormData();
    formData.append(
      "shop",
      new Blob([JSON.stringify(shop)], { type: "application/json" })
    );
    formData.append("imageFile", imageFile);

    try {
      const response = await fetch("https://work-wagon-ez8e.onrender.com/shop", {
        method: "POST",
        body: formData
      });

      const data = await response.text();

      if (!response.ok) {
        setErrors({ backend: data });
        return;
      }

      setSuccess("Registration successful 🎉");
      setErrors({});
      setShop({
        shop_name: "",
        job_name: "",
        shop_keeper_name: "",
        mobile: "",
        email: "",
        available: "",
        password: ""
      });
      setConfirmPassword("");
      setImageFile(null);

    } catch (error) {
      setErrors({ backend: "Server error. Try again." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Shop Registration
        </h2>

        {errors.backend && (
          <div className="mb-4 text-red-600 text-center">
            {errors.backend}
          </div>
        )}

        {success && (
          <div className="mb-4 text-green-600 text-center">
            {success}
          </div>
        )}

        <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Shop Name</label>
            <input
              type="text"
              name="shop_name"
              value={shop.shop_name}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Job Name</label>
            <input
              type="text"
              name="job_name"
              value={shop.job_name}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Shop Keeper Name</label>
            <input
              type="text"
              name="shop_keeper_name"
              value={shop.shop_keeper_name}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={shop.mobile}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            />
            {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile}</span>}
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={shop.email}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Available Vacancies</label>
            <input
              type="number"
              name="available"
              value={shop.available}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={shop.password}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {errors.image && <span className="text-red-500 text-sm">{errors.image}</span>}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl transition"
            >
              Register
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/shop_login" className="text-indigo-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ShopRegister;