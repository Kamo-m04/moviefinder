import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieById } from '../api/omdb'

export default function MovieDetails({ onToggleFav, favs = [] }) {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    getMovieById(id)
      .then(data => {
        if (!mounted) return
        if (data.Response === 'False') {
          setError(data.Error || 'Movie not found')
        } else {
          setMovie(data)
        }
      })
      .catch(err => {
        setError('Network error')
      })
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [id])

  const isFav = movie && favs.some(f => f.imdbID === movie.imdbID)

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-500">{error}</div>

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow rounded-lg overflow-hidden md:flex">
        <img src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'} alt={movie.Title}
             className="w-full md:w-1/3 h-auto object-cover"/>
        <div className="p-6 md:flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{movie.Title} <span className="text-gray-500 text-lg">({movie.Year})</span></h1>
              <div className="text-sm text-gray-600 mt-1">{movie.Genre} • {movie.Runtime}</div>
            </div>

            <div className="text-right">
              <button onClick={() => onToggleFav({
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Poster: movie.Poster
              })}
                className={`px-3 py-2 rounded ${isFav ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'}`}
              >
                {isFav ? 'Remove Fav' : 'Add Fav'}
              </button>
            </div>
          </div>

          <p className="mt-4 text-gray-700">{movie.Plot}</p>

          <div className="mt-4">
            <h3 className="font-semibold">Cast</h3>
            <p className="text-sm text-gray-600">{movie.Actors}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Ratings</h3>
            <ul className="text-sm text-gray-600">
              {movie.Ratings && movie.Ratings.length ? movie.Ratings.map(r => (
                <li key={r.Source}>{r.Source}: {r.Value}</li>
              )) : <li>No ratings available</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
