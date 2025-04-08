import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaShieldAlt, FaClock, FaGem, FaTruck } from 'react-icons/fa'

export default function Home() {
  const brands = [
    {
      name: 'Emporio Armani',
      description: 'Italian luxury fashion house',
      image: '/images/brands/emporio-armani-logo.svg',
    },
    {
      name: 'Hugo Boss',
      description: 'German luxury fashion house',
      image: '/images/brands/hugo-boss-logo.svg',
    },
    {
      name: 'Michael Kors',
      description: 'American luxury fashion house',
      image: '/images/brands/michael-kors-logo.svg',
    },
    {
      name: 'Seiko',
      description: 'Japanese watch manufacturer',
      image: '/images/brands/seiko-logo.svg',
    },
  ]

  const features = [
    {
      icon: FaShieldAlt,
      title: 'Authenticity Guaranteed',
      description: '100% authentic timepieces with official warranty and documentation'
    },
    {
      icon: FaClock,
      title: 'Fast Delivery',
      description: 'Express shipping worldwide with real-time tracking'
    },
    {
      icon: FaGem,
      title: 'Premium Selection',
      description: 'Curated collection of luxury watches from renowned brands'
    },
    {
      icon: FaTruck,
      title: 'Wholesale Pricing',
      description: 'Competitive pricing for bulk orders with flexible terms'
    }
  ]

  const collections = [
    {
      name: 'Seiko Prospex',
      description: 'Professional-grade diving watches with exceptional water resistance and precision timing.',
      image: 'https://www.seikowatches.com/uk-en/-/media/Images/GlobalEn/Seiko/Home/products/prospex/core_design/series_sea.jpg?mh=500&mw=900&hash=552B9C5739AD2C4824DA3C06D1E21100',
      category: 'Diving'
    },
    {
      name: 'Burberry',
      description: 'Elegant timepieces that blend British heritage with contemporary design.',
      image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=800',
      category: 'Fashion'
    },
    {
      name: 'Gucci',
      description: 'Luxury watches featuring iconic design elements and premium craftsmanship.',
      image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=800',
      category: 'Luxury'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] bg-black">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2000"
          alt="Luxury Watch Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 max-w-4xl">
            Premium Watch <br />
            Distribution
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl">
            Your trusted wholesale partner for authentic luxury timepieces
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link 
              href="/contact" 
              className="btn-primary bg-white text-black hover:bg-gray-100 w-fit px-8 py-4 text-lg"
            >
              Become a Partner
            </Link>
            <Link 
              href="/brands" 
              className="btn-secondary bg-transparent text-white border-2 border-white hover:bg-white hover:text-black w-fit px-8 py-4 text-lg"
            >
              View Our Brands
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Premium Watch Brands</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Exclusive distributor of the world's most prestigious watch brands
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brands.map((brand) => (
              <div 
                key={brand.name} 
                className="group bg-white rounded-lg shadow-lg p-8 transition-transform hover:-translate-y-1"
              >
                <div className="aspect-[3/2] relative mb-6">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{brand.name}</h3>
                <p className="text-gray-600">{brand.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/brands" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black bg-transparent border-2 border-black hover:bg-black hover:text-white transition-colors"
            >
              View All Brands
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Why Choose Us</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience excellence in wholesale watch distribution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white p-8 rounded-lg shadow-lg">
                <feature.icon className="w-12 h-12 text-black mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Collections */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Latest Collections</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our newest arrivals and trending timepieces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <div key={collection.name} className="group relative overflow-hidden rounded-lg">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{collection.name}</h3>
                  <p className="text-gray-200">{collection.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-12">
            Join our network of authorized retailers and gain access to our premium collection of luxury timepieces
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black bg-white hover:bg-gray-100 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  )
} 