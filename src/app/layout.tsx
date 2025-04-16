import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Swiss Watch Network - Wholesale Luxury Watches',
  description: 'Wholesale distributor of luxury watches including Armani, Diesel, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} min-h-screen bg-white`}>
        {/* Top black bar */}
        <div className="bg-black text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <a href="mailto:wholesale@swisswatchnetwork.com" className="hover:text-gray-200">
                wholesale@swisswatchnetwork.com
              </a>
            </div>
            <span>Global Luxury Watch Distribution</span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <a href="/" className="text-2xl font-bold text-gray-900">
                Swiss Watch Network
              </a>
              <div className="hidden md:flex space-x-8">
                <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
                <a href="/brands" className="text-gray-600 hover:text-gray-900">Brands</a>
                <a href="/catalog" className="text-gray-600 hover:text-gray-900">Catalog</a>
                <a href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
                <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
                <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Swiss Watch Network</h3>
                <p className="text-gray-400">
                  Your trusted partner in luxury watch distribution.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                  <li><a href="/brands" className="text-gray-400 hover:text-white">Brands</a></li>
                  <li><a href="/catalog" className="text-gray-400 hover:text-white">Catalog</a></li>
                  <li><a href="/pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-gray-400">Email: wholesale@swisswatchnetwork.com</li>
                  <li className="text-gray-400">Phone: +1 (555) 123-4567</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Swiss Watch Network. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
} 