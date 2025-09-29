// src/pages/WishlistPage.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const removeItem = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        💖 Your Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-gray-400 space-y-4">
          <p>Your wishlist is empty.</p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item) => (
            <motion.div
              key={item.id}
              layout
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden relative group"
            >
              {/* Product image */}
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Heart remove button */}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-pink-100 transition"
              >
                <Heart className="text-pink-500" size={20} />
              </button>

              <div className="p-4 space-y-2">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-pink-600 font-bold text-xl">${item.price}</p>
                <p className="text-gray-500 text-sm">{item.brand}</p>

                
                <button
                  onClick={() => navigate(`/products/${item.id}`)}
                  className="mt-2 w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                >
                  View Details
                </button>
                
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
