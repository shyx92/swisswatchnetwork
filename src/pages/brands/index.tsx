import React from 'react'
import Image from 'next/image'
import { IconContext } from 'react-icons'
import { FaCheck, FaAward, FaClock, FaTruck } from 'react-icons/fa'

interface Brand {
  name: string;
  description: string;
  image: string;
  features: string[];
  collections: string[];
  priceRange: string;
  deliveryTime: string;
  minOrder: string;
}

export default function BrandsPage() {
  const brands: Brand[] = [
    {
      name: 'Emporio Armani',
      description: 'Luxury fashion watches with Italian elegance, combining contemporary design with timeless sophistication.',
      image: '/images/brands/emporio-armani-logo.svg',
      features: ['Premium Materials', 'Swiss Movement', 'Water Resistant'],
      collections: ['Chronograph', 'Fashion', 'Dress'],
      priceRange: '£149 - £499',
      deliveryTime: '3-5 business days',
      minOrder: '25 pieces'
    },
    {
      name: 'Hugo Boss',
      description: 'German-engineered timepieces that embody modern sophistication and professional style.',
      image: '/images/brands/hugo-boss-logo.svg',
      features: ['German Engineering', 'Premium Leather', 'Sapphire Crystal'],
      collections: ['Classic', 'Business', 'Sport'],
      priceRange: '£129 - £599',
      deliveryTime: '3-5 business days',
      minOrder: '20 pieces'
    },
    {
      name: 'Michael Kors',
      description: 'Fashion-forward timepieces with luxurious details and contemporary American style.',
      image: '/images/brands/michael-kors-logo.svg',
      features: ['Fashion Forward', 'Premium Finish', 'Smart Features'],
      collections: ['Fashion', 'Smart', 'Luxury'],
      priceRange: '£139 - £449',
      deliveryTime: '3-5 business days',
      minOrder: '25 pieces'
    },
    {
      name: 'Seiko',
      description: 'Japanese excellence in watchmaking, combining innovative technology with precision engineering.',
      image: '/images/brands/seiko-logo.svg',
      features: ['Japanese Movement', 'Automatic Options', 'Diving Certified'],
      collections: ['Automatic', 'Dive', 'Professional'],
      priceRange: '£159 - £899',
      deliveryTime: '4-6 business days',
      minOrder: '15 pieces'
    },
    {
      name: 'Burberry',
      description: 'British heritage meets contemporary luxury in these sophisticated timepieces.',
      image: '/images/brands/burberry-logo.svg',
      features: ['British Design', 'Premium Materials', 'Heritage Style'],
      collections: ['Fashion', 'Classic', 'Check'],
      priceRange: '£199 - £699',
      deliveryTime: '3-5 business days',
      minOrder: '20 pieces'
    },
    {
      name: 'Maserati',
      description: 'Italian automotive luxury translated into exceptional timepieces with racing heritage.',
      image: '/images/brands/maserati-logo.svg',
      features: ['Automotive Design', 'Italian Craftsmanship', 'Racing Spirit'],
      collections: ['Sport', 'Luxury', 'Racing'],
      priceRange: '£179 - £599',
      deliveryTime: '4-6 business days',
      minOrder: '20 pieces'
    },
    {
      name: 'Diesel',
      description: 'Bold, innovative designs for the fashion-forward customer seeking unique style.',
      image: '/images/brands/diesel-logo.svg',
      features: ['Bold Design', 'Urban Style', 'Unique Features'],
      collections: ['Fashion', 'Statement', 'Urban'],
      priceRange: '£119 - £399',
      deliveryTime: '3-5 business days',
      minOrder: '25 pieces'
    },
    {
      name: 'Gucci',
      description: 'Italian luxury and fashion excellence, representing the pinnacle of style and craftsmanship.',
      image: '/images/brands/gucci-logo.svg',
      features: ['Italian Luxury', 'Designer Style', 'Premium Quality'],
      collections: ['Fashion', 'Luxury', 'Icon'],
      priceRange: '£229 - £999',
      deliveryTime: '4-6 business days',
      minOrder: '15 pieces'
    },
  ]

  return (
    <IconContext.Provider value={{ className: "w-4 h-4 text-blue-500 mr-2" }}>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-24 bg-black">
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
              Our Premium Brands
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our curated collection of luxury watch brands, offering premium wholesale opportunities with guaranteed authenticity.
            </p>
          </div>
        </section>

        {/* Brands Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {brands.map((brand) => (
                <div key={brand.name} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className="relative h-16 w-48">
                        <Image
                          src={brand.image}
                          alt={brand.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">Starting from</span>
                        <p className="text-xl font-semibold text-black">{brand.priceRange.split(' - ')[0]}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{brand.description}</p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                        <ul className="space-y-1">
                          {brand.features.map((feature) => (
                            <li key={feature} className="flex items-center text-sm text-gray-600">
                              <FaCheck />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Collections</h4>
                        <ul className="space-y-1">
                          {brand.collections.map((collection) => (
                            <li key={collection} className="text-sm text-gray-600">{collection}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-100">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center">
                          <FaAward />
                          <span className="text-gray-600">Min: {brand.minOrder}</span>
                        </div>
                        <div className="flex items-center">
                          <FaClock />
                          <span className="text-gray-600">5-10 business days</span>
                        </div>
                        <div className="flex items-center">
                          <FaTruck />
                          <span className="text-gray-600">Worldwide Shipping</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-100 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Become a Partner
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Partner with us to access our premium collection of 100% authentic luxury timepieces at competitive wholesale prices. Every watch comes with complete authenticity documentation.
            </p>
            <a
              href="/contact"
              className="inline-block bg-black text-white px-8 py-3 rounded hover:bg-gray-900 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </IconContext.Provider>
  )
} 