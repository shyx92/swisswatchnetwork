'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-br from-dark to-dark/90 text-white overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="container relative z-10 pt-20 pb-24 md:pt-32 md:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-primary">Ellington</span> Insurance for the Digital Age
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-lg">
              Personalized coverage with adaptive pricing that evolves with your life. Experience the future of life insurance today.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/plans" className="btn-primary">
                View Plans
              </Link>
              <Link href="/contact" className="btn-outline text-white border-white hover:bg-white hover:text-dark">
                Get a Quote
              </Link>
            </div>
            <div className="mt-10 flex items-center text-sm text-gray-300">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-dark bg-gray-${i * 100}`}></div>
                ))}
              </div>
              <span>Trusted by <span className="text-white font-medium">10,000+</span> customers</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-20 z-10"></div>
              <Image 
                src="/images/hero-family.jpg" 
                alt="Family enjoying AI-powered insurance protection"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-primary/20 rounded-lg"></div>
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-secondary/20 rounded-lg"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner; 