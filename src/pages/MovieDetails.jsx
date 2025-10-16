import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${id}&plot=full`
        );
        const data = await res.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  useEffect(() => {
    // check favorites in localStorage
    try {
      const favs = JSON.parse(localStorage.getItem("mf_favorites") || "[]");
      setIsFavorite(favs.some((m) => m.imdbID === id));
    } catch {
      setIsFavorite(false);
    }
  }, [id]);

  const toggleFavorite = () => {
    try {
      const favs = JSON.parse(localStorage.getItem("mf_favorites") || "[]");
      if (isFavorite) {
        const updated = favs.filter((m) => m.imdbID !== id);
        localStorage.setItem("mf_favorites", JSON.stringify(updated));
        setIsFavorite(false);
      } else {
        // minimal movie snapshot for favorite list
        const snapshot = {
          imdbID: movie.imdbID,
          Title: movie.Title,
          Year: movie.Year,
          Poster: movie.Poster,
        };
        favs.unshift(snapshot);
        localStorage.setItem("mf_favorites", JSON.stringify(favs));
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Favorites error", err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading details...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
  if (!movie) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 flex items-start justify-center">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
              alt={movie.Title}
              className="w-full max-w-xs object-contain rounded"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{movie.Title} <span className="text-gray-600">({movie.Year})</span></h1>
            <p className="text-sm text-gray-600 mb-4"><strong>Genre:</strong> {movie.Genre}</p>
            <p className="text-sm text-gray-600 mb-4"><strong>Director:</strong> {movie.Director}</p>
            <p className="text-sm text-gray-600 mb-4"><strong>Actors:</strong> {movie.Actors}</p>
            <p className="text-sm text-gray-600 mb-4"><strong>Plot:</strong> {movie.Plot}</p>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={toggleFavorite}
                className={`px-4 py-2 rounded ${isFavorite ? "bg-yellow-400 text-black" : "bg-blue-600 text-white"} hover:opacity-90`}
              >
                {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
              </button>

              <a
                href={`https://www.imdb.com/title/${movie.imdbID}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                View on IMDB →
              </a>
            </div>

            {/* Ratings */}
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Ratings</h3>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {movie.Ratings.map((r) => (
                    <li key={r.Source}>{r.Source}: {r.Value}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* optional: preserve the origin search query */}
        {location.state?.fromQuery && (
          <p className="mt-4 text-sm text-gray-600">Search: "{location.state.fromQuery}"</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
