import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Apple } from 'lucide-react';

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Apple className="h-8 w-8" />
            <span className="font-bold text-xl">FoodShare</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/listings" className="hover:text-green-200">Browse Food</Link>
            {user ? (
              <>
                <Link to="/list-food" className="hover:text-green-200">List Food</Link>
                <button onClick={() => signOut()} className="hover:text-green-200">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-green-200">Login</Link>
                <Link to="/register" className="hover:text-green-200">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}