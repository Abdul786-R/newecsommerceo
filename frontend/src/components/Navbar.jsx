import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Menu } from "lucide-react";
import SearchBar from "./Searchbar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navLinks = [
    { name: "Home", navlink: "/" },
    { name: "Products", navlink: "/products" },
    { name: "About", navlink: "/about" },
    { name: "Contact", navlink: "/contact" },
  ];

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(total);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <motion.header
      className="bg-gray-900 shadow-md sticky top-0 z-40"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        {/* Logo + Menu */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-800"
            onClick={() => setOpen(!open)}
          >
            <Menu className="text-white" />
          </button>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/" className="text-2xl font-extrabold tracking-tight text-white">
              Shop<span className="text-sky-500">ly</span>
            </Link>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          className="hidden md:flex flex-1 justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <SearchBar />
        </motion.div>

        {/* Nav Links + Icons */}
        <nav className="flex items-center gap-3 sm:gap-9">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.05 }}
              className="relative hidden lg:block"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link
                to={link.navlink}
                className="px-2 py-1 font-medium relative hover:text-sky-500 transition-colors text-white"
              >
                {link.name}
                <motion.span
                  className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-sky-500 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}

          <motion.div whileHover={{ rotate: 10 }}>
            <Link
              to="/wishlist"
              className="p-2 rounded-lg hover:bg-sky-700 text-gray-400 hover:text-sky-400 transition"
            >
              <Heart />
            </Link>
          </motion.div>

          <motion.div whileHover={{ rotate: -10 }} className="relative">
            <Link
              to="/cart"
              className="p-2 rounded-lg hover:bg-sky-700 text-gray-400 hover:text-sky-400 transition"
            >
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          </motion.div>
        </nav>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-gray-900 px-4 py-3 border-t border-gray-700 space-y-3">
          <SearchBar className="sm:w-[200px]" />
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.navlink}
              className="block mr-5 hover:text-sky-500 transition-colors text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </motion.header>
  );
}
