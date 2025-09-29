import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import HERO1 from "../assets/hero1.jpg";
import HERO2 from "../assets/hero2.jpg";
import HERO3 from "../assets/hero3.jpg";
import { Link } from "react-router-dom";

const heroData = [
  { image: HERO1, heading: "Premium Metal & Tubes", quote: "Quality that shapes your industrial needs." },
  { image: HERO2, heading: "Strong & Durable Tubing", quote: "Reliable materials for lasting structures." },
  { image: HERO3, heading: "Innovative Metal Solutions", quote: "Engineering excellence in every piece." },
];

const animateColors = ["text-sky-400", "text-indigo-400", "text-purple-400", "text-emerald-400"];
const buttonColors = ["bg-sky-500 hover:bg-sky-600", "bg-indigo-500 hover:bg-indigo-600", "bg-purple-500 hover:bg-purple-600", "bg-emerald-500 hover:bg-emerald-600"];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  // Change images & quotes every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Animate heading & button color every 2 seconds
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % animateColors.length);
    }, 2000);
    return () => clearInterval(colorInterval);
  }, []);

  const rightTopIndex = (currentIndex + 1) % heroData.length;
  const rightBottomIndex = (currentIndex + 2) % heroData.length;

  const fadeSlide = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 2 } };

  const Card = ({ data, colorIdx }) => (
    <div className="relative rounded-xl overflow-hidden shadow-lg h-full">
      <motion.img
        src={data.image}
        alt={data.heading}
        className="w-full h-full object-cover rounded-xl"
        {...fadeSlide}
      />
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-4 md:p-6 rounded-xl"
        {...fadeSlide}
      >
        <h2 className={`font-bold ${colorIdx} transition-colors duration-500 text-xl md:text-2xl`}>
          {data.heading}
        </h2>
        <p className="text-white text-sm md:text-base mt-1">{data.quote}</p>
       <Link to={"/products"}>
         <button className={`mt-2 px-3 py-1 ${buttonColors[colorIndex]} text-white font-medium rounded-lg transition-colors duration-500`}>
          Shop Now
        </button>
       </Link>
      </motion.div>
    </div>
  );

  return (
    <section className="w-full h-auto md:h-[90vh] px-4 md:px-8 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 h-full">

        {/* Left Large Card */}
        <div className="w-full md:w-1/2 h-64 md:h-full">
          <Card data={heroData[currentIndex]} colorIdx={animateColors[colorIndex]} />
        </div>

        {/* Right Stacked Cards */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 h-full">
          <div className="h-40 md:h-1/2">
            <Card data={heroData[rightTopIndex]} colorIdx={animateColors[colorIndex]} />
          </div>
          <div className="h-40 md:h-1/2">
            <Card data={heroData[rightBottomIndex]} colorIdx={animateColors[colorIndex]} />
          </div>
        </div>

      </div>
    </section>
  );
}
