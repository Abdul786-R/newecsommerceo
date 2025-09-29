// // src/pages/CheckoutPage.jsx
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Trash2, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function CheckoutPage() {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [shipping, setShipping] = useState({
//     name: "",
//     address: "",
//     city: "",
//     postal: "",
//     phone: "",
//     email: "",
//   });
//   const [paymentMethod, setPaymentMethod] = useState("cod");

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);
//   }, []);

//   const updateQuantity = (id, delta) => {
//     const newCart = cart.map(item =>
//       item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
//     );
//     setCart(newCart);
//     localStorage.setItem("cart", JSON.stringify(newCart));
//     window.dispatchEvent(new Event("storage"));
//   };

//   const removeItem = id => {
//     const newCart = cart.filter(item => item.id !== id);
//     setCart(newCart);
//     localStorage.setItem("cart", JSON.stringify(newCart));
//     window.dispatchEvent(new Event("storage"));
//   };

//   const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
//   const shippingCost = subtotal > 200 ? 0 : 20;
//   const total = subtotal + shippingCost;

//   const placeOrder = () => {
//     if (!shipping.name || !shipping.address || !shipping.phone) {
//       alert("⚠️ Please fill all shipping details.");
//       return;
//     }
//     alert(`✅ Order placed successfully with ${paymentMethod.toUpperCase()}!`);
//     localStorage.removeItem("cart");
//     navigate("/");
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 text-white relative">
//       {/* Cancel / Close Icon */}
//       <button
//         onClick={() => navigate("/cart")}
//         className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
//       >
//         <X size={28} />
//       </button>

//       <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

//       {cart.length === 0 ? (
//         <div className="text-center text-gray-400">
//           <p>Your cart is empty.</p>
//           <button
//             onClick={() => navigate("/products")}
//             className="mt-4 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
//           >
//             Shop Now
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Summary */}
//           <div className="lg:col-span-2 space-y-6">
//             {cart.map(item => (
//               <motion.div
//                 key={item.id}
//                 className="flex flex-col md:flex-row items-center gap-4 p-4 border-2 rounded-2xl bg-gray-800 border-sky-500/40"
//                 layout
//               >
//                 <img
//                   src={item.images[0]}
//                   alt={item.name}
//                   className="w-28 h-28 object-cover rounded-lg"
//                 />
//                 <div className="flex-1">
//                   <p className="font-semibold text-xl">{item.name}</p>
//                   <p className="text-sky-400 font-bold">${item.price}</p>
//                   <div className="flex items-center gap-2 mt-2">
//                     <button
//                       onClick={() => updateQuantity(item.id, -1)}
//                       className="px-2 py-1 bg-gray-700 rounded-md"
//                     >
//                       -
//                     </button>
//                     <span>{item.quantity || 1}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, 1)}
//                       className="px-2 py-1 bg-gray-700 rounded-md"
//                     >
//                       +
//                     </button>
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="ml-4 text-red-500"
//                     >
//                       <Trash2 />
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Order & Shipping Section */}
//           <div className="space-y-6">
//             {/* Shipping Form */}
//             <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
//               <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
//               {["name", "address", "city", "postal", "phone", "email"].map(field => (
//                 <input
//                   key={field}
//                   type={field === "email" ? "email" : "text"}
//                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                   value={shipping[field]}
//                   onChange={e => setShipping({ ...shipping, [field]: e.target.value })}
//                   className="w-full p-3 mb-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-sky-500 outline-none"
//                 />
//               ))}
//             </div>

//             {/* Payment Method */}
//             <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
//               <h2 className="text-xl font-bold mb-4">Payment Method</h2>
//               {["cod", "credit", "upi"].map(method => (
//                 <label key={method} className="flex items-center gap-2 mb-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value={method}
//                     checked={paymentMethod === method}
//                     onChange={() => setPaymentMethod(method)}
//                     className="accent-sky-500"
//                   />
//                   {method.toUpperCase()}
//                 </label>
//               ))}
//             </div>

//             {/* Order Summary */}
//             <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
//               <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//               <p className="flex justify-between text-gray-300">
//                 <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span>
//               </p>
//               <p className="flex justify-between text-gray-300">
//                 <span>Shipping</span> <span>${shippingCost.toFixed(2)}</span>
//               </p>
//               <hr className="my-2 border-gray-600" />
//               <p className="flex justify-between font-bold text-lg text-white">
//                 <span>Total</span> <span>${total.toFixed(2)}</span>
//               </p>
//               <button
//                 onClick={placeOrder}
//                 className="w-full mt-4 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
//               >
//                 Place Order
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// src/pages/CartPage.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart);
    };
    loadCart();
    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, []);

  const updateQuantity = (id, delta) => {
    const newCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
        : item
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
  };

  const removeItem = id => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-400">
          <ShoppingCart className="mx-auto mb-4" size={48} />
          <p>Your cart is empty.</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-lg hover:from-indigo-500 hover:to-sky-500 transition"
          >
            Shop Products
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {cart.map(item => (
            <motion.div
              key={item.id}
              className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl border-2 border-sky-500/40 bg-gray-900"
              layout
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-lg"
              />
              <div className="flex-1 flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-sky-400 font-bold">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-2 py-1 bg-gray-700 rounded-md"
                  >
                    -
                  </button>
                  <span>{item.quantity || 1}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-2 py-1 bg-gray-700 rounded-md"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-red-500"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-bold">Subtotal: ${subtotal.toFixed(2)}</p>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-3 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-lg hover:from-indigo-500 hover:to-sky-500 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
