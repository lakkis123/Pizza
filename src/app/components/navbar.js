"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link
              href="/orders"
              className="text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Orders 
            </Link>
            <Link
              href="/pizza-order"
              className="text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Pizza Order
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}