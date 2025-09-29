// src/components/TestimonialsSection.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John D.",
    text: "Great quality and super fast delivery!",
    rating: 5,
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sarah W.",
    text: "Amazing discounts, I always shop here!",
    rating: 4,
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael B.",
    text: "Customer support was really helpful and friendly.",
    rating: 5,
    img: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Emily R.",
    text: "Loved the festive sale deals! Got the best prices here.",
    rating: 5,
    img: "https://randomuser.me/api/portraits/women/72.jpg",
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  // Auto change testimonial every 5s
  useEffect(() => {
    const interval = setInterval(
      () => setIndex(prev => (prev + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[index];

  return (
    <section className="bg-gray-900 py-16 text-white">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          💬 What Our Customers Say
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-gray-800 rounded-2xl shadow-xl"
          >
            {/* Profile Image */}
            <motion.img
              src={current.img}
              alt={current.name}
              className="w-20 h-20 mx-auto rounded-full border-4 border-yellow-400 shadow-md mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Testimonial Text */}
            <p className="italic text-lg text-gray-300 mb-6">
              "{current.text}"
            </p>

            {/* Rating Stars */}
            <div className="flex justify-center mb-3">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="text-yellow-400" size={22} />
              ))}
            </div>

            <h4 className="font-semibold text-xl">{current.name}</h4>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === i ? "bg-yellow-400 scale-125" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
