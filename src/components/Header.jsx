import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-blue-600">MovieFinder</Link>

        <nav className="space-x-4 hidden md:flex items-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link to="/favorites" className="text-gray-600 hover:text-gray-900">Favorites</Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Link to="/favorites" className="hidden md:inline-block px-4 py-2 border rounded text-sm">My Favorites</Link>
        </div>
      </div>
    </header>
  )
}
