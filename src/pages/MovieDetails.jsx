import { useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">🎥 Movie Details</h1>
      <p className="text-lg text-gray-700">Movie ID: {id}</p>
    </div>
  );
}

export default MovieDetails;
