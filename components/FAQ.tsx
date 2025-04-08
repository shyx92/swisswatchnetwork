'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'How does AI improve my life insurance experience?',
    answer: 'Our AI technology analyzes your unique profile to create personalized coverage recommendations, adjusts your policy as your life changes, and optimizes pricing based on real-time risk assessment. This ensures you always have the right coverage at the fairest price, without the hassle of manual policy reviews.',
  },
  {
    question: 'Is my personal data secure with your AI system?',
    answer: 'Absolutely. We employ bank-level encryption and strict data protection protocols that meet or exceed industry standards. Your information is only used to optimize your coverage and is never sold to third parties. Additionally, our system is designed with privacy-by-design principles, giving you control over what data is shared.',
  },
  {
    question: 'How often does my coverage adjust automatically?',
    answer: 'Our AI continuously monitors relevant factors and makes micro-adjustments to your coverage as needed. Major life events trigger immediate review, while routine optimizations occur quarterly. You\'ll always be notified of any significant changes, and can review or modify adjustments through your dashboard.',
  },
  {
    question: 'Can I still speak with a human representative?',
    answer: 'Yes, while our digital platform handles most needs automatically, our team of licensed insurance professionals is readily available via chat, phone, or video call. They work alongside our AI to provide personalized guidance for complex situations or whenever you prefer human interaction.',
  },
  {
    question: 'How do I know if the AI is making the right recommendations?',
    answer: 'Transparency is core to our approach. Our AI clearly explains the reasoning behind each recommendation, comparing options and highlighting trade-offs. You always maintain control to accept, modify, or decline suggestions. Additionally, our recommendations are regularly audited by independent insurance experts to ensure quality and compliance.',
  },
  {
    question: 'What happens if my circumstances change suddenly?',
    answer: 'Our system is designed to adapt quickly. For major life events (marriage, children, home purchase), you can initiate an immediate review through the life events section of your account. The AI will rapidly assess your new situation and suggest appropriate coverage adjustments, which you can review before implementation.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about our AI-powered life insurance solutions.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className={`flex justify-between items-center w-full text-left p-5 rounded-lg transition-all ${
                  activeIndex === index 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                aria-expanded={activeIndex === index}
              >
                <span className="font-medium text-lg pr-8">{faq.question}</span>
                <svg 
                  className={`w-6 h-6 transition-transform ${
                    activeIndex === index ? 'transform rotate-180' : ''
                  }`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-5 border border-gray-100 rounded-b-lg shadow-sm"
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help.
          </p>
          <a href="/contact" className="btn-outline">
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 