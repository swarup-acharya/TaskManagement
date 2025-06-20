import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
        <nav className="bg-blue-100 shadow-md p-4 flex items-center justify-between">
  {/* Logo or Brand Name */}
  <div className="text-2xl font-bold text-gray-800">
    TaskManager
  </div>

  {/* Right side buttons */}
  <div className="space-x-4">
     <Link to="/login">
          <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition">
            Login
          </button>
        </Link>
     <Link to="/register">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Signup
          </button>
        </Link>
  </div>
</nav>
    </div>
  )
}

export default Navbar