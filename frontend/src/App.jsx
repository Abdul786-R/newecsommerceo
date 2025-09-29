import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/Hero'
import TrustSection from './components/TestSections'
import Categories from './components/Categories'
import Home from './pages/Home'
import { Route, Router, Routes } from 'react-router-dom'
import ProductsPage from './pages/Products'
import SingleProductPage from './pages/SingleProuct'
import CartPage from './pages/CartPage'
import Footer from './components/Footer'
import CheckoutPage from './pages/CheckoutPage'
import WishlistPage from './pages/WishList'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar />
      <Routes>
      <Route path='/' element={ <Home />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/products' element={ <ProductsPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/products/:id' element={ <SingleProductPage />} />
      <Route path='/wishlist' element={<WishlistPage />} />
      <Route path='/checkout' element={<CheckoutPage />} />
   </Routes>
   <Footer />
    </>
       
    
  
  )
}

export default App
