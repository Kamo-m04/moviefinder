import { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || "No results");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">🎬 MovieFinder</h1>
        <p className="text-gray-700 mb-6">Search for your favorite movies below.</p>

        {/* Search */}
        <div className="flex gap-3 mb-6">
          <input
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter movie name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") fetchMovies(); }}
            aria-label="Search movies"
          />
          <button
            onClick={fetchMovies}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Results */}
        <div>
          {loading && <p className="text-center py-8">Loading...</p>}
          {error && !loading && (
            <p className="text-center text-red-500 py-8">{error}</p>
          )}
          {!loading && !error && movies.length === 0 && (
            <p className="text-center text-gray-600 py-8">No results yet — try searching for "Batman".</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <Link
                key={movie.imdbID}
                to={`/movie/${movie.imdbID}`}
                state={{ fromQuery: query }} /* optional: preserve search */
                className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <div className="w-full h-80 bg-gray-100 flex items-center justify-center">
                  <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                    alt={movie.Title}
                    className="max-h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{movie.Title}</h3>
                  <p className="text-gray-600">{movie.Year}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

