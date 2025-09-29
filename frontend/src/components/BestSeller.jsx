import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { productsData } from "../data/productData";

export default function BestsellerProducts() {
  // Placeholder: filter products with rating 4 or higher
  const bestsellerProducts = productsData.filter(p => p.rating >= 4);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      
<motion.h2
  className="text-2xl text-center md:text-3xl font-bold mb-6 bg-clip-text text-transparent"
  animate={{ color: ["#3b82f6", "#6366f1", "#10b981", "#f59e0b", "#f43f5e"] }}
  transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
  style={{ backgroundImage: "linear-gradient(90deg, #3b82f6, #6366f1, #10b981, #f59e0b, #f43f5e)" }}
>
  BestSeller Products
</motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestsellerProducts.map(product => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-4 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer"
          >
            <Link to={`/products/${product.id}`}>
              <motion.img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>

            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            <p className="text-sky-400 font-bold text-xl mt-1">${product.price}</p>
            {product.oldPrice && (
              <p className="text-gray-400 line-through">${product.oldPrice}</p>
            )}

            <div className="flex items-center mt-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  size={16}
                  fill={idx < product.rating ? "gold" : "none"}
                  stroke="#FBBF24"
                />
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <Link
                to={`/product/${product.id}`}
                className="bg-blue-600 px-3 py-2 rounded-lg text-white text-sm hover:bg-blue-700 transition"
              >
                View Details
              </Link>
              <button
                className="bg-sky-500 p-2 rounded-lg hover:bg-sky-600 transition"
                onClick={() => {
                  const cart = JSON.parse(localStorage.getItem("cart")) || [];
                  const existingIndex = cart.findIndex(item => item.id === product.id);
                  if (existingIndex >= 0) {
                    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
                  } else {
                    cart.push({ ...product, quantity: 1 });
                  }
                  localStorage.setItem("cart", JSON.stringify(cart));
                  window.dispatchEvent(new Event("storage"));
                  alert("✅ Added to cart!");
                }}
              >
                <ShoppingCart size={18} className="text-white" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
