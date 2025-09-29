// src/components/ProductInfo.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { productsData } from "../data/productData"; // your products data

export default function ProductInfo() {
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState(productsData[0].id);
  const [mainImage, setMainImage] = useState(productsData[0].images[0]);
  const product = productsData.find(p => p.id === selectedProductId);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1; // increase quantity if already in cart
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart"); // navigate to cart page
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
    
<motion.h2
  className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent"
  animate={{ color: ["#3b82f6", "#6366f1", "#10b981", "#f59e0b", "#f43f5e"] }}
  transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
  style={{ backgroundImage: "linear-gradient(90deg, #3b82f6, #6366f1, #10b981, #f59e0b, #f43f5e)" }}
>
  Product Info
</motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl shadow-lg mb-4"
          />
          <div className="flex gap-4 overflow-x-auto">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumb ${idx}`}
                onClick={() => setMainImage(img)}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-sky-500 transition"
              />
            ))}
          </div>
        </motion.div>

        {/* Right: Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <div className="flex items-center gap-2">
            {Array.from({ length: product.rating }).map((_, i) => (
              <Star key={i} className="text-yellow-400" size={20} />
            ))}
          </div>
          <p className="text-xl font-bold text-sky-500">${product.price}</p>
          {product.oldPrice && (
            <p className="line-through text-gray-400">${product.oldPrice}</p>
          )}
          <p className="text-blue-600">{product.brand}</p>
          <p className="text-blue-600">{product.category}</p>

          {/* Product Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 p-4 bg-gray-800 rounded-lg text-gray-200"
          >
            <h4 className="font-semibold mb-2">Description:</h4>
            <p>{product.description}</p>
          </motion.div>

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition mt-4"
          >
            Add to Cart
          </button>

          {/* Product Selection */}
          <div className="mt-6">
            <label className="block mb-2 font-semibold">Choose Product:</label>
            <select
              value={selectedProductId}
              onChange={e => {
                setSelectedProductId(parseInt(e.target.value));
                const selected = productsData.find(p => p.id === parseInt(e.target.value));
                setMainImage(selected.images[0]); // Reset main image when product changes
              }}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-sky-500 outline-none"
            >
              {productsData.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
