// src/pages/AboutPage.jsx
import { motion } from "framer-motion";
import TEAM1 from "../assets/team1.jpg";
import TEAM2 from "../assets/team2.jpg";
import TEAM3 from "../assets/team3.jpg";

export default function AboutPage() {
  return (
    <div className="text-white bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20 text-center">
        
<motion.h1
  className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent"
  animate={{ color: ["#3b82f6", "#6366f1", "#10b981", "#f59e0b", "#f43f5e"] }}
  transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
  style={{ backgroundImage: "linear-gradient(90deg, #3b82f6, #6366f1, #10b981, #f59e0b, #f43f5e)" }}
>
  About US
</motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl max-w-2xl mx-auto"
        >
          We are committed to delivering top-notch products with exceptional
          service. Our mission is to bring quality and innovation to every
          customer.
        </motion.p>
      </section>

      {/* Company Story Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.img
          src="https://picsum.photos/600/400?random=1"
          alt="Company Story"
          className="rounded-xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pink-500">
            Our Journey
          </h2>
          <p className="text-gray-300 mb-4">
            Founded in 2010, we started as a small team passionate about quality
            and service. Today, we’ve grown into a trusted brand recognized
            globally.
          </p>
          <p className="text-gray-300">
            Our goal has always been to innovate, exceed expectations, and
            build long-lasting relationships with our clients.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-gray-800 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p>
              To provide high-quality products that enrich lives, enhance
              experiences, and exceed customer expectations every time.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-pink-600 to-red-500 p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p>
              To be a globally recognized brand synonymous with innovation,
              trust, and excellence in every product and service we offer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-pink-500">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[TEAM1, TEAM2, TEAM3].map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg"
            >
              <img src={img} alt={`Team member ${idx + 1}`} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-1">Team Member {idx + 1}</h3>
                <p className="text-gray-400">Position</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
