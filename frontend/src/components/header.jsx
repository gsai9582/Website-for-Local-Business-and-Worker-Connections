import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);

  const loginRef = useRef(null);
  const registerRef = useRef(null);
  const userRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {

    const shop = localStorage.getItem("shop");
    const worker = localStorage.getItem("worker");

    if (shop) {
      const parsed = JSON.parse(shop);
      setUser({
        type: "shop",
        name: parsed.shop_name
      });
    }

    if (worker) {
      const parsed = JSON.parse(worker);
      setUser({
        type: "worker",
        name: parsed.worker_name
      });
    }

  }, []);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setShowLogin(false);
      }

      if (registerRef.current && !registerRef.current.contains(event.target)) {
        setShowRegister(false);
      }

      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  const handleLogout = async () => {

    try {

      if (user?.type === "shop") {
        await fetch("https://work-wagon-ez8e.onrender.com/shop/logout", {
          method: "POST",
          credentials: "include"
        });
      }

      if (user?.type === "worker") {
        await fetch("https://work-wagon-ez8e.onrender.com/worker/logout", {
          method: "POST",
          credentials: "include"
        });
      }

      localStorage.removeItem("shop");
      localStorage.removeItem("worker");

      setUser(null);

      navigate("/");

    } catch (error) {
      console.error(error);
    }

  };

  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <header className="h-16 w-full bg-white border-b border-gray-200 flex justify-between items-center px-8 shadow-sm sticky top-0 z-50">

      <Link
        to="/"
        className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition"
      >
        Work Wagon
      </Link>

      <div className="flex items-center gap-8 text-gray-700 font-medium">

        <Link to="/about" className="hover:text-indigo-600 transition">
          About
        </Link>

        {/* GitHub Repo Link */}
        <a
          href="https://github.com/Yadhidya/Work-Wagon"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-indigo-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
            -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2
            -3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
            0 0 .67-.21 2.2.82a7.66 7.66 0 012-.27c.68 0 1.36.09
            2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16
            1.92.08 2.12.51.56.82 1.27.82 2.15
            0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54
            1.48 0 1.07-.01 1.93-.01 2.2
            0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>

          GitHub
        </a>

        {/* Register / Login */}
        {!user && (
          <>
            {/* Register */}
            <div className="relative" ref={registerRef}>
              <button
                onClick={() => {
                  setShowRegister(!showRegister);
                  setShowLogin(false);
                }}
                className="hover:text-indigo-600 transition"
              >
                Register
              </button>

              {showRegister && (
                <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl flex flex-col p-2 border border-gray-200">

                  <Link
                    to="/shop_register"
                    className="hover:bg-indigo-50 px-3 py-2 rounded-lg"
                  >
                    Shopkeeper
                  </Link>

                  <Link
                    to="/worker_register"
                    className="hover:bg-indigo-50 px-3 py-2 rounded-lg"
                  >
                    Worker
                  </Link>

                </div>
              )}
            </div>

            {/* Login */}
            <div className="relative" ref={loginRef}>
              <button
                onClick={() => {
                  setShowLogin(!showLogin);
                  setShowRegister(false);
                }}
                className="hover:text-indigo-600 transition"
              >
                Login
              </button>

              {showLogin && (
                <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl flex flex-col p-2 border border-gray-200">

                  <Link
                    to="/shop_login"
                    className="hover:bg-indigo-50 px-3 py-2 rounded-lg"
                  >
                    Shopkeeper
                  </Link>

                  <Link
                    to="/worker_login"
                    className="hover:bg-indigo-50 px-3 py-2 rounded-lg"
                  >
                    Worker
                  </Link>

                </div>
              )}
            </div>
          </>
        )}

        {/* Logged User */}
        {user && (
          <div className="relative" ref={userRef}>

            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold hover:bg-indigo-600 transition shadow-md"
            >
              {avatarLetter}
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-xl flex flex-col p-2 border border-gray-200">

                <Link
                  to="/profile"
                  className="hover:bg-indigo-50 px-3 py-2 rounded-lg"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left hover:bg-red-50 text-red-500 px-3 py-2 rounded-lg"
                >
                  Logout
                </button>

              </div>
            )}

          </div>
        )}

      </div>
    </header>
  );
};

export default Header;