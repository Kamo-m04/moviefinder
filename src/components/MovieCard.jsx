import React from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      className="bg-white shadow-md rounded-md cursor-pointer hover:shadow-xl transition"
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-72 object-cover rounded-t"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{INCEPTION}</h2>
        <p className="text-gray-600">{2010}</p>
      </div>
    </div>
  );
}

export default MovieCard;
