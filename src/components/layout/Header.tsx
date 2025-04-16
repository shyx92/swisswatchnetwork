"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('menu-open');
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-sm">
      {/* Top announcement bar */}
      <div className="bg-black text-white py-2 px-4 text-center text-sm">
        <p className="flex items-center justify-center space-x-2">
          <a href="mailto:wholesale@swisswatchnetwork.com" className="hover:underline inline-flex items-center">
            wholesale@swisswatchnetwork.com
          </a>
          <span className="hidden sm:inline">-</span>
          <span>Luxury Watches at Wholesale Prices</span>
        </p>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            type="button"
            className="block lg:hidden p-2 -ml-2"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-bold whitespace-nowrap">
            Swiss Watch Network
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
            <Link href="/brands" className={`nav-link ${isActive('/brands') ? 'active' : ''}`}>
              Our Brands
            </Link>
            <Link href="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
              About Us
            </Link>
            <Link href="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
              Contact
            </Link>
            <Link href="/contact" className="btn btn-primary whitespace-nowrap">
              Become a Partner
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" 
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
      
      {/* Mobile menu */}
      <div className={`fixed top-0 left-0 bottom-0 w-[280px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-semibold">Menu</span>
            <button
              onClick={toggleMenu}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Close menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            <Link 
              href="/" 
              className={`block w-full p-3 rounded-lg transition-colors ${isActive('/') ? 'bg-gray-100 text-black' : 'hover:bg-gray-50'}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              href="/brands" 
              className={`block w-full p-3 rounded-lg transition-colors ${isActive('/brands') ? 'bg-gray-100 text-black' : 'hover:bg-gray-50'}`}
              onClick={toggleMenu}
            >
              Our Brands
            </Link>
            <Link 
              href="/about" 
              className={`block w-full p-3 rounded-lg transition-colors ${isActive('/about') ? 'bg-gray-100 text-black' : 'hover:bg-gray-50'}`}
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className={`block w-full p-3 rounded-lg transition-colors ${isActive('/contact') ? 'bg-gray-100 text-black' : 'hover:bg-gray-50'}`}
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </nav>
          <div className="p-4 border-t">
            <Link 
              href="/contact" 
              className="btn btn-primary w-full justify-center"
              onClick={toggleMenu}
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 