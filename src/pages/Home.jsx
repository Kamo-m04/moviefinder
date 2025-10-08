import React, { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import MovieList from '../components/MovieList'
import { searchMovies } from '../api/omdb'

export default function Home({ favs, setFavs }) {
  const [query, setQuery] = useState('batman')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    fetchMovies(query, page)
    // eslint-disable-next-line
  }, [])

  async function fetchMovies(q, pg = 1) {
    if (!q) {
      setMovies([])
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await searchMovies(q, pg)
      if (data.Response === 'False') {
        setMovies([])
        setTotalResults(0)
        setError(data.Error || 'No results')
      } else {
        setMovies(data.Search || [])
        setTotalResults(parseInt(data.totalResults || 0, 10))
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(q) {
    setQuery(q)
    setPage(1)
    fetchMovies(q, 1)
  }

  function toggleFav(movie) {
    const exists = favs.some(f => f.imdbID === movie.imdbID)
    if (exists) {
      setFavs(prev => prev.filter(x => x.imdbID !== movie.imdbID))
    } else {
      setFavs(prev => [movie, ...prev])
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Find Your Next Favorite Movie</h1>
        <p className="text-gray-600 mb-4">Search by title, genre, or actor.</p>
        <SearchBar onSearch={handleSearch} initial={query}/>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <MovieList movies={movies} onToggleFav={toggleFav} favs={favs}/>

      {/* simple pagination controls if there are more results */}
      {totalResults > movies.length && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => { const np = Math.max(1, page - 1); setPage(np); fetchMovies(query, np)}}
            className="px-3 py-2 bg-gray-200 rounded"
            disabled={page <= 1}
          >
            Prev
          </button>
          <div>Page {page}</div>
          <button
            onClick={() => { const np = page + 1; setPage(np); fetchMovies(query, np)}}
            className="px-3 py-2 bg-gray-200 rounded"
            disabled={page * 10 >= totalResults}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
