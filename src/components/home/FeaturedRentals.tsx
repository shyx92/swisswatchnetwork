"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const featuredRentals = [
  {
    id: 1,
    name: "Lamborghini Huracán",
    category: "Luxury Cars",
    categorySlug: "luxury-cars",
    location: "Miami, FL",
    price: "$1,500",
    priceUnit: "day",
    imageUrl: "/images/cars/lamborghini-huracan.jpg",
  },
  {
    id: 2,
    name: "Princess X95 Superyacht",
    category: "Private Boats",
    categorySlug: "private-boats",
    location: "Monaco",
    price: "$15,000",
    priceUnit: "day",
    imageUrl: "/images/boats/princess-yacht.jpg",
  },
  {
    id: 3,
    name: "Bell 429 Helicopter",
    category: "Helicopter Charters",
    categorySlug: "helicopter-charters",
    location: "New York, NY",
    price: "$4,800",
    priceUnit: "hour",
    imageUrl: "/images/helicopters/bell-429.jpg",
  },
  {
    id: 4,
    name: "Gulfstream G650",
    category: "Private Jets",
    categorySlug: "private-jets",
    location: "Los Angeles, CA",
    price: "$12,500",
    priceUnit: "hour",
    imageUrl: "/images/jets/gulfstream-g650.jpg",
  },
];

export default function FeaturedRentals() {
  return (
    <section className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-amber-400">Featured Rentals</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl text-shadow-sm">
            Discover Our Premium Collection
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Experience the pinnacle of luxury with our handpicked selection of premium vehicles and vessels. Each offering is meticulously maintained and represents the height of luxury and performance.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        >
          {featuredRentals.map((rental) => (
            <article key={rental.id} className="group flex flex-col items-start">
              <div className="relative w-full">
                <div className="aspect-[16/9] w-full rounded-2xl bg-gray-900 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                  <Image
                    src={rental.imageUrl}
                    alt={rental.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-800" />
              </div>
              <div className="max-w-xl mt-4">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime="2023-03-16" className="text-gray-400">
                    Available now
                  </time>
                  <Link
                    href={`/${rental.categorySlug}`}
                    className="relative z-10 rounded-full bg-gray-800 px-3 py-1.5 font-medium text-amber-400 hover:bg-gray-700"
                  >
                    {rental.category}
                  </Link>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-white group-hover:text-amber-400">
                    <Link href={`/${rental.categorySlug}/${rental.id}`}>
                      <span className="absolute inset-0" />
                      {rental.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">{rental.location}</p>
                </div>
                <div className="mt-4 flex items-center gap-x-2">
                  <span className="text-lg font-bold text-amber-400">{rental.price}</span>
                  <span className="text-sm text-gray-400">per {rental.priceUnit}</span>
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Link
            href="/luxury-cars"
            className="rounded-md bg-gradient-to-r from-amber-500 to-amber-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:from-amber-600 hover:to-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Browse All Rentals
          </Link>
        </div>
      </div>
    </section>
  );
} 