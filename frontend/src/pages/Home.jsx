import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/Hero'
import TrustSection from '../components/TestSections'
import Categories from '../components/Categories'
import FeaturedProduct from "../components/FeaturedProduct"
import BestsellerProducts from '../components/BestSeller'
import NewArrivalsProducts from '../components/NewArrivals'
import TestimonialsSection from '../components/Testimonials'
import NewsletterSection from '../components/NewsLetter'
import DiscountSection from '../components/DiscountSection'
import ProductInfo from '../components/ProductInfo'

const Home = () => {
  return (
    <div>
   <HeroSection/>
   <TrustSection />
   <Categories />
   <FeaturedProduct />
   <DiscountSection />
   <BestsellerProducts />
   <TestimonialsSection />
   <NewArrivalsProducts />
   <ProductInfo />
   <NewsletterSection />
   
    </div>
  )
}

export default Home
