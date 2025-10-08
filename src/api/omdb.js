import axios from 'axios'

const BASE = import.meta.env.VITE_OMDB_BASE || 'https://www.omdbapi.com/'
const KEY = import.meta.env.VITE_OMDB_API_KEY

if (!KEY) console.warn('No OMDB API key set. Set VITE_OMDB_API_KEY in .env')

export async function searchMovies(query, page = 1) {
  if (!query) return { Search: [], totalResults: 0 }
  const url = `${BASE}?apikey=${KEY}&s=${encodeURIComponent(query)}&page=${page}`
  const res = await axios.get(url)
  return res.data
}

export async function getMovieById(imdbID) {
  const url = `${BASE}?apikey=${KEY}&i=${encodeURIComponent(imdbID)}&plot=full`
  const res = await axios.get(url)
  return res.data
}
