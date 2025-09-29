// src/pages/ContactPage.jsx
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="text-white bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20 text-center">
        
        <motion.h1
  className="text-4xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent"
  animate={{ color: ["#3b82f6", "#6366f1", "#10b981", "#f59e0b", "#f43f5e"] }}
  transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
  style={{ backgroundImage: "linear-gradient(90deg, #3b82f6, #6366f1, #10b981, #f59e0b, #f43f5e)" }}
>
📬 Get in Touch
</motion.h1>
    
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl max-w-2xl mx-auto"
        >
          Have a question or feedback? Fill out the form below or reach us via email or phone.
        </motion.p>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800 p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-pink-500">Send Us a Message</h2>
          <form className="space-y-4">
            {[
              { name: "name", placeholder: "Your Name", type: "text" },
              { name: "email", placeholder: "Your Email", type: "email" },
              { name: "subject", placeholder: "Subject", type: "text" },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:border-pink-500 outline-none text-white"
              />
            ))}
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:border-pink-500 outline-none text-white"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full mt-4 px-6 py-3 bg-pink-500 rounded-lg font-bold text-white shadow-lg hover:bg-pink-600 transition"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold mb-6 text-pink-500">Contact Info</h2>
          <div className="flex items-center gap-4">
            <Mail className="text-pink-500" size={24} />
            <p>support@company.com</p>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-pink-500" size={24} />
            <p>+1 234 567 890</p>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="text-pink-500" size={24} />
            <p>1234 Street Name, City, Country</p>
          </div>

          {/* Google Map */}
          <div className="mt-6 h-64 w-full rounded-2xl overflow-hidden shadow-lg border-2 border-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086303056004!2d-122.41941518468168!3d37.7749297797599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085814d8b0bfff7%3A0x42f5e8b7f9a1b95b!2sSan+Francisco%2C+CA%2C+USA!5e0!3m2!1sen!2sin!4v1696078182740!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              title="Company Location"
            ></iframe>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
