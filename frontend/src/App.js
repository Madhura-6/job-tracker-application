import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import Header from "./components/Header";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Check auth state
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setIsLoggedIn(!!updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Load dark mode from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("darkMode"));
    setDarkMode(saved || false);
  }, []);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <RoutesWrapper
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </Router>
  );
}

// Renders Header + Routes
function RoutesWrapper({ isLoggedIn, setIsLoggedIn, darkMode, setDarkMode }) {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/signup"];
  const pathname = location.pathname.toLowerCase().split("?")[0];
  const hideHeader = hideHeaderPaths.includes(pathname);

  return (
    <>
      {!hideHeader && (
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/add-job"
          element={
            isLoggedIn ? (
              <Layout>
                <AddJob />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/analytics"
          element={
            isLoggedIn ? (
              <Layout>
                <Analytics />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Layout>
                <Profile />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/settings"
          element={
            isLoggedIn ? (
              <Layout>
                <Settings />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
