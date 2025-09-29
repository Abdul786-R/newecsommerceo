import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RelatedProducts({ products }) {
  const navigate = useNavigate();

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    alert("✅ Added to cart!");
  };

  return (
    <div className="mt-12">
      
<motion.h2
  className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent"
  animate={{ color: ["#3b82f6", "#6366f1", "#10b981", "#f59e0b", "#f43f5e"] }}
  transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
  style={{ backgroundImage: "linear-gradient(90deg, #3b82f6, #6366f1, #10b981, #f59e0b, #f43f5e)" }}
>
  Related Products
</motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-gray-900 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition p-4 flex flex-col justify-between"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-40 object-cover rounded-xl mb-4 cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            />
            <div className="flex-1 flex flex-col justify-between">
              <h3
                className="text-white font-semibold mb-2 cursor-pointer hover:text-sky-400"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                {product.name}
              </h3>
              <p className="text-sky-400 font-bold mb-2">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-lg hover:from-sky-600 hover:to-indigo-600 transition mt-auto"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
