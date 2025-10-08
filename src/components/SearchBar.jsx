import React, { useState } from 'react'

export default function SearchBar({ onSearch, initial = '' }) {
  const [q, setQ] = useState(initial)

  function submit(e) {
    e.preventDefault()
    onSearch(q.trim())
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex items-center gap-2">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search for a movie..."
          className="flex-1 px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </form>
  )
}
