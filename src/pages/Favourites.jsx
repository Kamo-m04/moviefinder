import React from 'react'
import MovieList from '../components/MovieList'

export default function Favorites({ favs, setFavs }) {
  function toggleFav(movie) {
    setFavs(prev => prev.filter(x => x.imdbID !== movie.imdbID))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">My Favorites</h1>
      <MovieList movies={favs} onToggleFav={toggleFav} favs={favs}/>
    </div>
  )
}
