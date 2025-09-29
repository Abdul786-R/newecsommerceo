// import React, { useState } from "react";
// import ProductCard from "../components/PoductCard";
// import { productsData } from "../data/productData";

// export default function ProductsPage() {
//   const categories = ["All", ...new Set(productsData.map((p) => p.category))];
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const filteredProducts =
//     selectedCategory === "All"
//       ? productsData
//       : productsData.filter((p) => p.category === selectedCategory);

//   return (
//     <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
//       <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Products</h1>

//       {/* Category Filter Tabs */}
//       <div className="flex flex-wrap justify-center gap-3 mb-8">
//         {categories.map((cat, i) => (
//           <button
//             key={i}
//             className={`px-4 py-2 rounded-full font-medium transition ${
//               selectedCategory === cat
//                 ? "bg-sky-600 text-white shadow-lg"
//                 : "bg-gray-100 text-gray-700 hover:bg-sky-100"
//             }`}
//             onClick={() => setSelectedCategory(cat)}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredProducts.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import ProductCard from "../components/PoductCard";
import { productsData } from "../data/productData";
import { motion } from "framer-motion";

export default function ProductsPage() {
  const categories = ["All", ...new Set(productsData.map((p) => p.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      
<motion.h2
  className="text-2xl text-center md:text-3xl font-bold mb-6 bg-clip-text text-transparent"
  animate={{ color: ["#3b82f6", "#6366f1", "#10b981", "#f59e0b", "#f43f5e"] }}
  transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
  style={{ backgroundImage: "linear-gradient(90deg, #3b82f6, #6366f1, #10b981, #f59e0b, #f43f5e)" }}
>
  Our Products
</motion.h2>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-full font-medium transition ${
              selectedCategory === cat
                ? "bg-sky-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-sky-100"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
