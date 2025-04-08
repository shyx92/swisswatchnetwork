'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Business Owner',
    content: 'The personalization is incredible. I received a policy that perfectly fits my lifestyle and business needs. The adaptive pricing has saved me thousands compared to my old plan.',
    image: '/images/testimonials/sarah-testimonial.jpg',
  },
  {
    name: 'Michaela Chen',
    role: 'Software Engineer',
    content: 'As someone in tech, I appreciate how their system constantly updates my policy based on my changing life circumstances. The digital experience is seamless, and I rarely need to contact support.',
    image: '/images/testimonials/michaela-testimonial.jpg',
  },
  {
    name: 'Emily Thompson',
    role: 'Small Business Owner',
    image: '/images/testimonials/emily-testimonial.jpg',
    content: 'Ellington Insurance made finding the right coverage straightforward. Their team was professional and helped me understand exactly what I needed.',
  },
  {
    name: 'David Williams',
    role: 'Teacher & Parent',
    content: 'The family protection features gave me peace of mind I didn\'t have with my previous provider. The system adjusts as my children grow, ensuring they\'re always properly covered.',
    image: '/images/testimonials/david-testimonial.jpg',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 bg-dark text-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our <span className="text-primary">Clients</span> Say
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how our AI-powered life insurance solutions are making a difference in our customers' lives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Avatar selection sidebar */}
          <div className="lg:col-span-3">
            <div className="space-y-6 lg:pr-6">
              {testimonials.map((testimonial, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`w-full flex items-center space-x-4 p-4 rounded-lg transition-all ${
                    activeIndex === index
                      ? 'bg-primary/10 border-l-4 border-primary'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main testimonial content */}
          <div className="lg:col-span-9">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-dark-800 p-8 md:p-12 rounded-2xl relative"
            >
              <div className="absolute top-6 left-6 text-6xl text-primary opacity-20">"</div>
              
              <div className="relative z-10">
                <p className="text-xl md:text-2xl leading-relaxed text-gray-200 mb-8">
                  {testimonials[activeIndex].content}
                </p>
                
                <div className="flex items-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">{testimonials[activeIndex].name}</h4>
                    <p className="text-gray-400">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 text-6xl text-primary opacity-20">"</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 