import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Reduce Food Waste, Feed the Community
        </h1>
        <p className="text-xl text-gray-600">
          Connect food donors with those in need to create a more sustainable and caring community.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <Heart className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Make a Difference</h3>
          <p className="text-gray-600">Help reduce food waste while supporting those in need in your community.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Connection</h3>
          <p className="text-gray-600">Simple platform connecting food donors with receivers in your area.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <Clock className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Quick Process</h3>
          <p className="text-gray-600">List or claim food quickly and efficiently with our simple system.</p>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/register"
          className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}