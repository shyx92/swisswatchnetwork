import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaHandshake, FaGlobe, FaCertificate, FaHistory } from 'react-icons/fa'

export default function AboutPage() {
  const milestones = [
    {
      year: '1985',
      title: 'Foundation',
      description: 'Established in London as a family-owned watch distribution business.'
    },
    {
      year: '1995',
      title: 'European Expansion',
      description: 'Expanded operations across major European markets.'
    },
    {
      year: '2005',
      title: 'Global Distribution',
      description: 'Expanded our network of luxury watch distribution worldwide.'
    },
    {
      year: '2015',
      title: 'Digital Transformation',
      description: 'Launched digital platform for B2B operations.'
    },
    {
      year: '2024',
      title: 'Industry Leadership',
      description: 'Leading UK distributor with global partnerships.'
    }
  ]

  const values = [
    {
      icon: FaHandshake,
      title: 'Trust & Reliability',
      description: 'Building lasting relationships with partners through transparency and reliability.'
    },
    {
      icon: FaGlobe,
      title: 'Global Excellence',
      description: 'Maintaining the highest standards in international wholesale distribution.'
    },
    {
      icon: FaCertificate,
      title: 'Authenticity Guaranteed',
      description: 'Every timepiece comes with official documentation and warranty.'
    },
    {
      icon: FaHistory,
      title: 'Heritage',
      description: 'Four decades of expertise in luxury watch distribution.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-black">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Four decades of excellence in luxury watch distribution
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
                Heritage of Excellence
              </h2>
              <div className="space-y-6 text-gray-600">
                <p>
                  Founded in 1985, Swiss Watch Network began as a family-owned business in London's prestigious watch district. Our founder, with over two decades of experience in luxury timepieces, envisioned creating a trusted bridge between prestigious watch manufacturers and discerning retailers.
                </p>
                <p>
                  What started as a modest distribution company has grown into one of the UK's leading wholesale partners for luxury watch brands. Our unwavering commitment to authenticity, reliability, and exceptional service has earned us the trust of retailers across the globe.
                </p>
                <p>
                  Today, we are proud to offer 100% authentic timepieces from the world's most renowned watch brands, serving a network of over 500 retailers across Europe and beyond. Our state-of-the-art logistics center ensures efficient distribution while maintaining the highest standards of quality control and authenticity verification.
                </p>
              </div>
            </div>
            <div className="relative h-[600px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1495121553079-4c61bcce1894?q=80&w=1200"
                alt="Watch craftsman at work"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built on principles of trust, excellence, and long-term partnerships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white p-8 rounded-lg shadow-lg">
                <value.icon className="w-12 h-12 text-black mb-6" />
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Our Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Key milestones in our history of excellence
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.year}
                className={`flex items-start gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="flex-none w-24 md:w-32">
                  <div className="text-2xl md:text-3xl font-bold">{milestone.year}</div>
                </div>
                <div className="flex-grow">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
            Join Our Network
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Become part of our success story. Partner with us to access premium watch brands and exceptional wholesale services.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black bg-white hover:bg-gray-100 transition-colors"
          >
            Become a Partner
          </Link>
        </div>
      </section>
    </div>
  )
} 