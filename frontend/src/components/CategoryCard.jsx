import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer transition"
    >
      <Link to={`/products?category=${category.name}`}>
        <motion.img
          src={category.image}
          alt={category.name}
          className="h-40 w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="p-4 text-center">
          <h3 className="font-semibold text-lg text-gray-800">{category.name}</h3>
        </div>
      </Link>
    </motion.div>
  );
}
