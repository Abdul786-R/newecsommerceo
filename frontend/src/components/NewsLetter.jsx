// src/components/NewsletterSection.jsx
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-16 text-white text-center relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-400 rounded-full mix-blend-multiply opacity-20 animate-pulse"></div>

<motion.h2
  className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent"
  animate={{ color: ["#3b82f6", "#6366f1", "#10b981", "#f59e0b", "#f43f5e"] }}
  transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
  style={{ backgroundImage: "linear-gradient(90deg, #3b82f6, #6366f1, #10b981, #f59e0b, #f43f5e)" }}
>
  📧 Stay Updated!
</motion.h2>
      <p className="mb-8 text-gray-100 text-lg">
        Subscribe to get exclusive deals & the latest product updates.
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-5 py-3 w-72 rounded-lg text-black bg-white border-2 border-transparent focus:border-gradient-to-r focus:border-indigo-500 focus:outline-none transition-all shadow-md"
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-black rounded-lg shadow-lg hover:bg-gray-900 transition-colors"
        >
          <Mail size={18} /> Subscribe
        </motion.button>
      </div>

      <p className="mt-6 text-gray-200 text-sm">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </section>
  );
}
