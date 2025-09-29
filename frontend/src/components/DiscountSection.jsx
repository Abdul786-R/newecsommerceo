// src/components/DiscountSection.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "🎉 Mega Discount Week",
    desc: "Save up to 70% OFF on top brands. Limited stock, don’t miss out!",
    images: [
      "https://picsum.photos/400/400?random=11",
      "https://picsum.photos/400/400?random=12",
      "https://picsum.photos/400/400?random=13",
      "https://picsum.photos/400/400?random=14",
    ],
    gradient: "from-pink-600 via-red-500 to-yellow-500",
  },
  {
    title: "🔥 Festive Super Sale",
    desc: "Exclusive offers on electronics & fashion. Grab yours today!",
    images: [
      "https://picsum.photos/400/400?random=21",
      "https://picsum.photos/400/400?random=22",
      "https://picsum.photos/400/400?random=23",
      "https://picsum.photos/400/400?random=24",
    ],
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
  },
  {
    title: "⚡ Flash Deals 24H",
    desc: "Hurry up! New arrivals with crazy discounts only for today!",
    images: [
      "https://picsum.photos/400/400?random=31",
      "https://picsum.photos/400/400?random=32",
      "https://picsum.photos/400/400?random=33",
      "https://picsum.photos/400/400?random=34",
    ],
    gradient: "from-green-500 via-teal-500 to-cyan-500",
  },
];

export default function DiscountSection() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(
      () => setIndex(prev => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <section
      className={`transition-all duration-700 bg-gradient-to-r ${current.gradient} py-12 text-white`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">{current.title}</h2>
            <p className="mt-4 text-lg">{current.desc}</p>
            <motion.button
                onClick={() => navigate("/products")}
              whileHover={{ scale: 1.05 }}
              className="mt-6 px-6 py-3 bg-black text-white rounded-lg shadow-lg"
            >
              Shop Now
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Right product images */}
        <div className="grid grid-cols-2 gap-4">
          {current.images.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt="Discount product"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl shadow-md"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
