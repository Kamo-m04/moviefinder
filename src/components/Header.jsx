import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-sky-600 hover:text-sky-500 transition">
          🎬 MovieFinder
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className="hover:text-sky-600 transition">Home</Link>
          <Link to="/favorites" className="hover:text-sky-600 transition">Favorites</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;

