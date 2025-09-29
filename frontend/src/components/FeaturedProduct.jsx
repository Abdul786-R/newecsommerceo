// src/components/FeaturedProducts.jsx
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { productsData } from "../data/productData";

export default function FeaturedProducts() {
  // Pick some featured products (you can change the logic)
  const featured = productsData.slice(0, 8);

  return (
    <section className="w-full py-12 px-4 md:px-12 lg:px-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center mb-10">
        
<motion.h2
  className="text-2xl text-center md:text-3xl font-bold mb-6 bg-clip-text text-transparent"
  animate={{ color: ["#3b82f6", "#6366f1", "#10b981", "#f59e0b", "#f43f5e"] }}
  transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
  style={{ backgroundImage: "linear-gradient(90deg, #3b82f6, #6366f1, #10b981, #f59e0b, #f43f5e)" }}
>
  Featured Products
</motion.h2>
        <p className="text-gray-500 mt-2 text-lg">
          Handpicked selections just for you
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featured.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Product Image */}
            <Link to={`/product/${product.id}`}>
              <motion.img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-52 object-cover rounded-t-2xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
            </Link>

            {/* Product Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">{product.brand}</p>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < product.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    fill={i < product.rating ? "#facc15" : "none"}
                  />
                ))}
              </div>

              {/* Price */}
              <div className="mt-2">
                <span className="text-xl font-bold text-blue-600">
                  ${product.price}
                </span>
                {product.oldPrice && (
                  <span className="ml-2 text-sm line-through text-gray-400">
                    ${product.oldPrice}
                  </span>
                )}
              </div>

              {/* Button */}
              <Link
                to={`/products/${product.id}`}
                className="mt-auto inline-block bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
