import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_OMDB_API_KEY
          }&i=${id}&plot=full`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="py-10">
        <Spinner size={56} />
      </div>
    );
  }

  if (!movie) {
    return <p className="text-center mt-10">Movie not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-block mb-6 text-sky-600 hover:underline hover:text-sky-700"
      >
        ← Back to Search
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-6 md:flex md:gap-8">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
          className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{movie.Title}</h2>
          <p className="text-gray-600 mb-1">
            {movie.Year} • {movie.Runtime} • {movie.Genre}
          </p>
          <p className="mb-4 text-gray-700">{movie.Plot}</p>

          <p className="text-sm text-gray-500 mb-1">
            <strong>Director:</strong> {movie.Director}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            <strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}
          </p>

          <button
            onClick={() => {
              const favs = JSON.parse(localStorage.getItem("mf_favorites") || "[]");
              if (!favs.some((f) => f.imdbID === movie.imdbID)) {
                favs.push(movie);
                localStorage.setItem("mf_favorites", JSON.stringify(favs));
                alert("Added to favorites!");
              } else {
                alert("Already in favorites!");
              }
            }}
            className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
