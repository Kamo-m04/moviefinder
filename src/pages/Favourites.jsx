import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem("mf_favourites") || "[]");
      setFavs(list);
    } catch {
      setFavs([]);
    }
  }, []);

  const removeFav = (id) => {
    const updated = favs.filter((m) => m.imdbID !== id);
    setFavs(updated);
    localStorage.setItem("mf_favourites", JSON.stringify(updated));
  };

  if (!favs.length) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
        <p className="text-gray-600 mb-6">Add movies to your favorites from the movie details page.</p>
        <Link to="/" className="inline-block bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700">Browse movies</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favs.map(m => (
          <div key={m.imdbID} className="bg-white rounded-lg shadow p-3">
            <div className="w-full h-64 flex items-center justify-center bg-gray-100 mb-3">
              <img src={m.Poster !== "N/A" ? m.Poster : "/placeholder.png"} alt={m.Title} className="max-h-full object-contain" />
            </div>
            <h3 className="font-semibold">{m.Title}</h3>
            <p className="text-sm text-gray-600 mb-3">{m.Year}</p>
            <div className="flex gap-2">
              <Link to={`/movie/${m.imdbID}`} className="text-sky-600 hover:underline">View</Link>
              <button onClick={() => removeFav(m.imdbID)} className="ml-auto text-sm text-red-600 hover:underline">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
