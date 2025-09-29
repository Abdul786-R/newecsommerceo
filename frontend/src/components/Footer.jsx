// src/components/Footer.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <motion.h2
            className="text-2xl font-bold mb-4 text-white"
            animate={{ color: ["#38bdf8", "#a78bfa", "#34d399", "#f472b6"] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            PipeWorld
          </motion.h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Your trusted partner for Pipes, Valves, Flanges, and Fittings.  
            Delivering quality industrial products with reliability and care.
          </p>
          <div className="flex space-x-4">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                whileHover={{ scale: 1.2 }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-sky-500 transition"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "About Us", path: "/about" },
              { name: "Contact", path: "/contact" },
              { name: "Cart", path: "/cart" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className="hover:text-sky-400 transition duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
          <ul className="space-y-2">
            {[
              { name: "Pipes", path: "/products?category=Pipes" },
              { name: "Tubing", path: "/products?category=Tubing" },
              { name: "Tube Fittings", path: "/products?category=Tube%20Fittings" },
              { name: "Instrumentation Valves", path: "/products?category=Instrumentation%20Valves" },
              { name: "Buttweld Pipe Fittings", path: "/products?category=Buttweld%20Pipe%20Fittings" },
              { name: "Flanges", path: "/products?category=Flanges" },
            ].map((cat, i) => (
              <li key={i}>
                <Link
                  to={cat.path}
                  className="hover:text-sky-400 transition duration-300"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-sky-400" />  
              123 Industrial Estate, Mumbai, India
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-sky-400" />  
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-sky-400" />  
              support@pipeworld.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} PipeWorld. All Rights Reserved.
      </div>
    </footer>
  );
}
