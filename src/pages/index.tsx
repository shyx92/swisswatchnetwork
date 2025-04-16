import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaShieldAlt, FaClock, FaGem, FaTruck } from 'react-icons/fa'

export default function Home() {
  const brands = [
    {
      name: 'Emporio Armani',
      description: 'Italian luxury fashion house',
      image: 'https://www.theinsidersnet.com/site/public/images/pl_12/70/202408/121515_13082024_314_Fossil%20Banner.png',
    },
    {
      name: 'Hugo Boss',
      description: 'German luxury fashion house',
      image: 'https://www.mugmagazine.com/wp-content/uploads/2023/02/Hugo-Boss-cop.jpg',
    },
    {
      name: 'Michael Kors',
      description: 'American luxury fashion house',
      image: 'https://i.pinimg.com/736x/0d/31/7b/0d317b1a71c7cab0c8330e8995a78377.jpg',
    },
    {
      name: 'Seiko',
      description: 'Japanese watch manufacturer',
      image: 'https://cdn11.bigcommerce.com/s-e31c8/product_images/uploaded_images/zimbe-17.jpg',
    },
  ]

  const features = [
    {
      icon: FaShieldAlt,
      title: 'Authenticity Guaranteed',
      description: '100% authentic timepieces with warranty'
    },
    {
      icon: FaClock,
      title: 'Fast Delivery',
      description: 'Express shipping with tracking'
    },
    {
      icon: FaGem,
      title: 'Premium Selection',
      description: 'Curated luxury watch collection'
    },
    {
      icon: FaTruck,
      title: 'Wholesale Pricing',
      description: 'Competitive bulk order pricing'
    }
  ]

  const collections = [
    {
      name: 'Seiko Prospex',
      description: 'Professional diving watches with exceptional precision.',
      image: 'https://www.seikowatches.com/uk-en/-/media/Images/GlobalEn/Seiko/Home/products/prospex/core_design/series_sea.jpg?mh=500&mw=900&hash=552B9C5739AD2C4824DA3C06D1E21100',
      category: 'Diving'
    },
    {
      name: 'Burberry',
      description: 'Elegant timepieces with British heritage.',
      image: 'https://www.bablas.co.uk/media/catalog/category/burberry.png',
      category: 'Fashion'
    },
    {
      name: 'Gucci',
      description: 'Luxury watches with iconic design elements.',
      image: 'https://images-aka.ernestjones.co.uk/content/gucci/2024/TM/GUCCI_INTERLOCKING_AUTO_BLACK_886x694.jpg',
      category: 'Luxury'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://static1.squarespace.com/static/581b5c19e3df28f244eaf150/581bd295f5e2313796fd6eab/64ae83741deab62da8b9e1d0/1689348853100/Guide+to+buying+a+Tissot.jpg?format=1500w")'
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 max-w-4xl">
            Premium Watch <br />
            Distribution
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-12 max-w-2xl">
            Your trusted wholesale partner for authentic luxury timepieces
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link 
              href="/contact" 
              className="btn-primary bg-transparent text-white border-2 border-white hover:bg-white hover:text-black w-full sm:w-fit px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg text-center"
            >
              Become a Partner
            </Link>
            <Link 
              href="/brands" 
              className="btn-secondary bg-transparent text-white border-2 border-white hover:bg-white hover:text-black w-full sm:w-fit px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg text-center"
            >
              View Our Brands
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Premium Watch Brands</h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Exclusive distributor of the world's most prestigious watch brands
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {brands.map((brand) => (
              <div 
                key={brand.name} 
                className="group bg-white rounded-lg shadow-sm hover:shadow-md p-4 sm:p-6 transition-all"
              >
                <div className="aspect-square relative mb-3 sm:mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={brand.image}
                    alt={`${brand.name} Watch`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    priority
                    quality={85}
                  />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{brand.name}</h3>
                <p className="text-sm sm:text-base text-gray-600">{brand.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Link 
              href="/brands" 
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-black bg-transparent border-2 border-black hover:bg-black hover:text-white transition-colors"
            >
              View All Brands
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Experience excellence in wholesale watch distribution
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 sm:block">
                  <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-black sm:mb-4" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Collections */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Latest Collections</h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Discover our newest arrivals and trending timepieces
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {collections.map((collection) => (
              <div key={collection.name} className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{collection.name}</h3>
                  <p className="text-sm sm:text-base text-gray-200">{collection.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 