"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const rentalsTypes = [
  { id: "luxury-cars", name: "Luxury Cars", href: "/luxury-cars" },
  { id: "private-boats", name: "Private Boats", href: "/private-boats" },
  { id: "helicopter-charters", name: "Helicopter Charters", href: "/helicopter-charters" },
  { id: "private-jets", name: "Private Jets", href: "/private-jets" },
];

const locations = [
  "New York",
  "Los Angeles",
  "Miami",
  "Las Vegas",
  "London",
  "Paris",
  "Dubai",
  "Monaco",
];

export default function HeroSection() {
  const [location, setLocation] = useState("");
  const [rentalType, setRentalType] = useState("");

  return (
    <div className="relative isolate overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/cars/lamborghini-huracan.jpg"
          alt="Luxury rental"
          fill
          priority
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-80 mix-blend-multiply"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-40 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl text-shadow-lg">
            Experience Ultimate <br />
            Luxury
          </h1>
          <p className="mt-6 text-lg leading-8 text-white text-shadow-sm">
            Discover premium rentals for discerning clients. From exotic cars to private jets, elevate your travel experience with our exclusive collection.
          </p>
          
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/about"
              className="rounded-md bg-amber-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              About Us
            </Link>
            <Link href="/luxury-cars" className="text-sm font-semibold leading-6 text-white">
              View our fleet <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 ring-1 ring-white/10">
              <div className="flex flex-col space-y-6">
                <h2 className="text-xl font-semibold text-white text-shadow-sm">Find Your Perfect Rental</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-white">
                      Location
                    </label>
                    <select
                      id="location"
                      name="location"
                      className="mt-1.5 block w-full rounded-md border-gray-700 bg-gray-900 py-2 pl-3 pr-10 text-white focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="">Select location</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="rental-type" className="block text-sm font-medium text-white">
                      Rental Type
                    </label>
                    <select
                      id="rental-type"
                      name="rental-type"
                      className="mt-1.5 block w-full rounded-md border-gray-700 bg-gray-900 py-2 pl-3 pr-10 text-white focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                      value={rentalType}
                      onChange={(e) => setRentalType(e.target.value)}
                    >
                      <option value="">All rentals</option>
                      {rentalsTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-amber-500 to-amber-700 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-amber-600 hover:to-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                >
                  Search Rentals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-x-8 gap-y-4"
      >
        {rentalsTypes.map((type) => (
          <Link
            key={type.id}
            href={type.href}
            className="group bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 hover:bg-white/20 transition duration-300"
          >
            <span className="text-white text-sm font-medium">{type.name}</span>
            <svg
              className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ))}
      </motion.div>
    </div>
  );
} 