// src/components/SearchBar.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { productsData } from "../data/productData";
import "../index.css"; // Contains .animated-border styles

export default function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Filter products dynamically as user types
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const filtered = productsData.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        placeholder="Search products..."
        className="w-full px-4 py-2 bg-white rounded border-4 animated-border focus:outline-none text-sm md:text-base transition"
      />
      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-600 hover:text-indigo-600 transition">
        <Search size={25} />
      </button>

      {/* Dropdown Results */}
      {showDropdown && results.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto border border-gray-200">
          {results.map((product) => (
            <li
              key={product.id}
              onClick={() => {
                navigate(`/products/${product.id}`);
                setQuery("");
                setShowDropdown(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-sky-100 transition"
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {showDropdown && query && results.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg px-4 py-2 text-gray-500 border border-gray-200">
          No products found.
        </div>
      )}
    </div>
  );
}
