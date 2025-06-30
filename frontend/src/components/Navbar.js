import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.email?.split("@")[0] || "User";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <div
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold cursor-pointer"
      >
        JobTracker
      </div>

      <div className="relative">
        <button
          className="flex items-center gap-2"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <FaUserCircle className="text-2xl" />
          <span className="hidden sm:inline">{username}</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-40 z-50">
            <button
              onClick={() => {
                setDropdownOpen(false);
                navigate("/profile");
              }}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              Profile
            </button>
            <button
              onClick={() => {
                setDropdownOpen(false);
                navigate("/dashboard");
              }}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              Applied Jobs
            </button>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
