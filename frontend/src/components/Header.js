import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon, User, LogOut, Settings } from "lucide-react";

export default function Header({ isLoggedIn, setIsLoggedIn, darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("U");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) {
      setUserName(user.name.charAt(0).toUpperCase());
    } else if (user?.email) {
      setUserName(user.email.charAt(0).toUpperCase());
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false); // Update global state
    navigate("/login");
  };

  const linkClasses = (path) =>
    `text-sm sm:text-base px-2 py-1 rounded ${
      location.pathname === path
        ? "text-blue-700 font-semibold"
        : "text-gray-600 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400"
    }`;

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center">
      <h1
        className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-white cursor-pointer"
        onClick={() => navigate("/")}
      >
        JobTracker
      </h1>

      <nav className="space-x-2 sm:space-x-4 flex items-center relative">
        {/* 🌙 Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-600 dark:text-gray-200 hover:text-blue-600"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {!isLoggedIn ? (
          <>
            <Link to="/login" className={linkClasses("/login")}>
              Login
            </Link>
            <Link to="/signup" className={linkClasses("/signup")}>
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className={linkClasses("/dashboard")}>
              Dashboard
            </Link>
            <Link to="/add-job" className={linkClasses("/add-job")}>
              Add Job
            </Link>
            <Link to="/analytics" className={linkClasses("/analytics")}>
              Analytics
            </Link>

            {/* 👤 Profile Dropdown */}
            <div className="relative inline-block">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold"
              >
                {userName}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowDropdown(false)}
                  >
                    <User size={16} className="inline mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Settings size={16} className="inline mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut size={16} className="inline mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
