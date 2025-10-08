import React from 'react'
import { Link } from 'react-router-dom'

export default function MovieCard({ movie, onToggleFav, isFav }) {
  // movie may contain Poster, Title, Year, imdbID
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
      <img src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'} alt={movie.Title}
           className="w-full h-56 object-cover"/>
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold">{movie.Title}</h3>
        <p className="text-sm text-gray-500">{movie.Year}</p>

        <div className="mt-auto flex items-center justify-between">
          <Link to={`/movie/${movie.imdbID}`} className="text-sm text-blue-600 hover:underline">View</Link>
          <button
            onClick={() => onToggleFav(movie)}
            className={`px-2 py-1 rounded ${isFav ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'}`}
            aria-pressed={isFav}
          >
            {isFav ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </div>
  )
}
