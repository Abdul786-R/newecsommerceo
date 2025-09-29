import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";

export default function ProductCard({ product }) {
  const { id, name, images, price, oldPrice, rating, brand } = product;
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef(null);

  // Animated border color
  const colors = ["#0ea5e9","#6366f1","#8b5cf6","#10b981","#f43f5e"];
  const [borderColor, setBorderColor] = useState(colors[0]);
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setBorderColor(colors[Math.floor(Math.random()*colors.length)]);
    }, 1500);
    return () => clearInterval(colorInterval);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImage((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [images.length]);

  const pauseSlide = () => clearInterval(intervalRef.current);
  const resumeSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentImage((i) => (i + 1) % images.length);
    }, 3000);
  };

  return (
    <motion.div
      className="bg-white rounded-3xl overflow-hidden cursor-pointer relative"
      style={{ border: `2px solid ${borderColor}` }}
      whileHover={{ scale: 1.05, boxShadow: "0 12px 25px rgba(0,0,0,0.15)" }}
      onMouseEnter={pauseSlide}
      onMouseLeave={resumeSlide}
    >
      <Link to={`/products/${id}`}>
        <div className="relative w-full h-56 md:h-48 bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[currentImage]}
              src={images[currentImage]}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8 }}
              loading="lazy"
            />
          </AnimatePresence>

          {oldPrice && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
              SALE
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-sm md:text-base font-semibold text-slate-800 line-clamp-2">{name}</h3>
          <p className="text-xs text-gray-500">{brand}</p>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-sky-600">${price.toFixed(2)}</p>
              {oldPrice && <p className="text-xs text-gray-400 line-through">${oldPrice.toFixed(2)}</p>}
            </div>
            <div className="text-sm text-yellow-400 font-medium">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < Math.round(rating) ? "★" : "☆"}</span>
              ))}
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button className="flex-1 px-3 py-2 rounded-lg bg-sky-600 text-white text-sm hover:bg-sky-700 transition">
              View
            </button>
            <button className="px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50 transition">
              + Cart
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}


