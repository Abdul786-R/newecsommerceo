import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { productsData } from "../data/productData";
import RelatedProducts from "../components/RelatedProducts";
import "./singleProduct.css"; // Import CSS

export default function SingleProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(
    productsData.find((p) => p.id === parseInt(id))
  );
  const [currentImage, setCurrentImage] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem(`reviews_${id}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [filterRating, setFilterRating] = useState(0);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const [pauseTransition, setPauseTransition] = useState(false);
  const pauseTimeout = useRef(null);

  useEffect(() => {
    const newProduct = productsData.find((p) => p.id === parseInt(id));
    setProduct(newProduct);
    setCurrentImage(0);
    const saved = localStorage.getItem(`reviews_${id}`);
    setReviews(saved ? JSON.parse(saved) : []);
    setFilterRating(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pauseTransition && product) {
        setCurrentImage((prev) => (prev + 1) % product.images.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [product, pauseTransition]);

  const handleThumbnailClick = (idx) => {
    setCurrentImage(idx);
    setPauseTransition(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setPauseTransition(false), 5000);
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("❤️ Added to wishlist!");
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    alert("✅ Added to cart!");
  };

  const filteredReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const submitReview = () => {
    if (!newReview.name || !newReview.rating || !newReview.comment) {
      alert("Please complete all fields");
      return;
    }
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
    setNewReview({ name: "", rating: 0, comment: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 text-white">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div>
          <motion.div
            className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-3xl shadow-lg"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={product.images[currentImage]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  zoom ? "scale-125 cursor-zoom-in" : "scale-100"
                } rounded-3xl`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
            </AnimatePresence>
          </motion.div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.images.map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  idx === currentImage
                    ? "border-sky-500"
                    : "border-transparent"
                }`}
                onClick={() => handleThumbnailClick(idx)}
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4">
          <motion.h1
            className="text-3xl md:text-4xl font-bold"
            animate={{
              color: ["#0ea5e9", "#6366f1", "#8b5cf6", "#10b981"],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {product.name}
          </motion.h1>

          <p className="text-blue-600">{product.description}</p>

          <div className="flex items-center gap-4">
            <p className="text-xl md:text-2xl font-bold text-sky-400">
              ${product.price}
            </p>
            {product.oldPrice && (
              <p className="text-gray-400 line-through">${product.oldPrice}</p>
            )}
          </div>

          {/* Advantages */}
          <motion.div className="mt-4 p-4 border-2 rounded-xl bg-gray-800 border-sky-500">
            <h2 className="font-semibold mb-2 text-white">Advantages:</h2>
            <ul className="list-disc list-inside text-gray-200">
              {product.advantages?.map((adv, i) => (
                <li key={i}>{adv}</li>
              ))}
            </ul>
          </motion.div>

          {/* Product Info */}
          <motion.div className="mt-4 p-4 border-2 rounded-xl bg-gray-800 border-sky-500">
            <h2 className="font-semibold mb-2 text-white">
              Product Information:
            </h2>
            <ul className="list-disc list-inside text-gray-200">
              <li>Brand: {product.brand}</li>
              <li>Category: {product.category}</li>
              <li>Rating: {product.rating} / 5</li>
              <li>Available: In Stock</li>
            </ul>
          </motion.div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2 flex-wrap">
            <motion.button
              onClick={addToCart}
              className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={18} /> Add to Cart
            </motion.button>
            <motion.button
              onClick={addToWishlist}
              className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={18} /> Wishlist
            </motion.button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b pb-2 text-white">
          Customer Reviews
        </h2>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setFilterRating(0)}
            className={`px-4 py-2 rounded-full border font-medium transition ${
              filterRating === 0
                ? "bg-sky-700 text-white border-sky-500"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            All
          </button>
          {[5, 4, 3, 2, 1].map((s) => (
            <button
              key={s}
              onClick={() => setFilterRating(s)}
              className={`px-4 py-2 rounded-full border font-medium transition ${
                filterRating === s
                  ? "bg-sky-700 text-white border-sky-500"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {s} <Star size={14} className="inline text-yellow-400" />
            </button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="flex flex-col gap-4">
          {filteredReviews.length ? (
            filteredReviews.map((r, i) => (
              <div
                key={i}
                className="p-4 md:p-6 border rounded-2xl shadow-md hover:shadow-lg transition bg-gray-900 text-white"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">{r.name}</p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={18}
                        fill={idx < r.rating ? "gold" : "none"}
                        stroke="#FBBF24"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300">{r.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">
              No reviews yet. Be the first to review!
            </p>
          )}
        </div>

        {/* Add Review Form */}
        <div className="mt-8 p-6 rounded-2xl shadow-md bg-gradient-to-r from-gray-800 to-gray-900">
          <h3 className="font-semibold text-lg mb-4 text-white">
            Add Your Review
          </h3>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
              className="flex-1 border-2 border-sky-500 rounded-lg px-4 py-3 focus:ring-2 focus:ring-white focus:outline-none bg-transparent text-white placeholder:text-gray-300"
            />
            <select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: parseInt(e.target.value) })
              }
              className="w-32 border-2 border-sky-500 rounded-lg px-4 py-3 focus:ring-2 focus:ring-white focus:outline-none bg-transparent text-white"
            >
              <option value="0">Rating</option>
              {[1, 2, 3, 4, 5].map((s) => (
                <option key={s} value={s}>
                  {s} Star
                </option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="Your Review"
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            className="w-full border-2 border-sky-500 rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-white focus:outline-none resize-none bg-transparent text-white placeholder:text-gray-300"
            rows={4}
          />
          <button
            onClick={submitReview}
            className="px-6 py-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            Submit Review
          </button>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
