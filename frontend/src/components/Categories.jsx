import { categories } from "../data/CategoryData";
import CategoryCard from "./CategoryCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const animateColors = ["text-sky-400", "text-indigo-400", "text-purple-400", "text-emerald-400"];

export default function Categories() {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setColorIndex((prev) => (prev + 1) % animateColors.length),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
     
<motion.h2
  className="text-2xl text-center md:text-3xl font-bold mb-6 bg-clip-text text-transparent"
  animate={{ color: ["#3b82f6", "#6366f1", "#10b981", "#f59e0b", "#f43f5e"] }}
  transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
  style={{ backgroundImage: "linear-gradient(90deg, #3b82f6, #6366f1, #10b981, #f59e0b, #f43f5e)" }}
>
  Shop By Categories
</motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}
