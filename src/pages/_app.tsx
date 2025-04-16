"use client";

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter, Playfair_Display } from "next/font/google"
import Link from 'next/link'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className={`${inter.variable} ${playfair.variable} min-h-screen flex flex-col`}>
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
        <nav className="bg-white border-b">
          <div className="container-custom">
            <div className="flex items-center justify-between h-20">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-3xl font-playfair font-bold">Swiss Watch</span>
                <span className="text-lg text-gray-600 uppercase tracking-wider">Network</span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/brands" className="text-gray-900 hover:text-black font-medium transition-colors">
                  Our Brands
                </Link>
                <Link href="/about" className="text-gray-900 hover:text-black font-medium transition-colors">
                  About Us
                </Link>
                <Link href="/contact" className="text-gray-900 hover:text-black font-medium transition-colors">
                  Contact
                </Link>
                <Link 
                  href="/contact" 
                  className="bg-black text-white px-6 py-2.5 rounded hover:bg-gray-900 transition-colors"
                >
                  Become a Partner
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Component {...pageProps} />
        </main>

        {/* Footer */}
        <footer className="bg-black text-white py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <h3 className="text-2xl font-playfair font-bold mb-4">Swiss Watch Network</h3>
                <p className="text-gray-400">
                  Your premier partner for authentic luxury timepieces. Global distributor of 100% genuine watches, connecting retailers with prestigious collections worldwide. Every timepiece comes with complete authenticity documentation.
                </p>
              </div>
              
              <div>
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Quick Links</h3>
                  <div className="flex flex-col space-y-2">
                    <Link href="/brands" className="text-gray-400 hover:text-white transition-colors">
                      Our Brands
                    </Link>
                    <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                      About Us
                    </Link>
                    <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4">Contact</h4>
                <ul className="space-y-3 text-gray-400">
                  <li>SH Group FZE LLC</li>
                  <li>SPC Free Zone, Business Center</li>
                  <li>Sharjah, United Arab Emirates</li>
                  <li>
                    <a href="mailto:wholesale@swisswatchnetwork.com" className="hover:text-white transition-colors">
                      wholesale@swisswatchnetwork.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SessionProvider>
  )
} 