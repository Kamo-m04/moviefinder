import React from 'react'
import MovieCard from './MovieCard'

export default function MovieList({ movies = [], onToggleFav, favs = [] }) {
  if (!movies || movies.length === 0) {
    return <div className="text-center py-12 text-gray-500">No movies found.</div>
  }

  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map(m => (
        <MovieCard
          key={m.imdbID}
          movie={m}
          onToggleFav={onToggleFav}
          isFav={favs.some(f => f.imdbID === m.imdbID)}
        />
      ))}
    </div>
  )
}
