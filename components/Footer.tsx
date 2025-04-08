'use client';

import Link from 'next/link';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2" aria-label="Ellington Insurance Home">
              <div className="w-10 h-10 relative">
                <div className="absolute inset-0 bg-primary rounded-full opacity-80"></div>
                <div className="absolute inset-2 bg-secondary rounded-full"></div>
              </div>
              <span className="text-xl font-bold">Ellington</span>
            </Link>
            <p className="mt-4 text-gray-300 text-sm">
              Independent insurance intermediary providing comprehensive insurance solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/plans" className="text-gray-300 hover:text-white transition-colors">Insurance Plans</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal Information</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Business</Link></li>
              <li><Link href="/complaints" className="text-gray-300 hover:text-white transition-colors">Complaints Procedure</Link></li>
              <li><Link href="/cookie-policy" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-primary" />
                <span className="ml-2">support@ellingtoninsurance.co.uk</span>
              </li>
            </ul>

            <div className="mt-6">
              <Link href="https://www.linkedin.com/company/ellingtoninsurance" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-300 hover:text-primary transition-colors"
                    aria-label="Visit Ellington Insurance on LinkedIn">
                <span>LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <p className="text-sm text-gray-400 text-center">
            Ellington Insurance is an independent insurance intermediary. All insurance products will be provided, administered, and underwritten by an insurance provider authorised and regulated by the FCA. Policies are subject to the insurer's terms, conditions, and eligibility criteria.
          </p>
          <p className="text-sm text-gray-400 text-center mt-4">
            © {new Date().getFullYear()} Ellington Insurance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 