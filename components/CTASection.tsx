'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-accent text-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Ready to Experience the Future of Life Insurance?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10"
          >
            Join thousands of forward-thinking individuals who've already made the smart switch to AI-powered coverage.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/plans" className="btn bg-white text-primary hover:bg-white/90 shadow-lg">
              Explore Plans
            </Link>
            <Link href="/contact" className="btn border-2 border-white text-white hover:bg-white/10">
              Get Personalized Quote
            </Link>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8 text-white/80 text-sm"
          >
            No commitment required. See your personalized rates in just minutes.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 