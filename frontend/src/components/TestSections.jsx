import { motion } from "framer-motion";
import { ShieldCheck, Truck, Star } from "lucide-react";

const trustData = [
  {
    icon: <ShieldCheck size={36} />,
    title: "Quality Assurance",
    description: "All our products undergo strict quality checks to ensure durability and reliability.",
  },
  {
    icon: <Truck size={36} />,
    title: "Fast & Safe Delivery",
    description: "We deliver on time with secure packaging to guarantee product safety.",
  },
  {
    icon: <Star size={36} />,
    title: "Trusted by Clients",
    description: "We have built trust over years of excellence in metal and tube supply.",
  },
];

const gradientColors = [
  "from-sky-400 to-indigo-400",
  "from-indigo-400 to-purple-400",
  "from-purple-400 to-emerald-400",
];

export default function TrustSection() {
  return (
    <section className="w-full bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          whileHover={{ scale: 1.05 }}
        >
          Why Choose Us?
        </motion.h2>
        <p className="text-gray-600 mb-10">
          We combine quality, reliability, and professional service to deliver the best products.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustData.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.3 }}
            >
              <div className="text-sky-500 mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
