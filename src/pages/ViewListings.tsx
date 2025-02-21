import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface FoodListing {
  id: string;
  title: string;
  description: string;
  quantity: string;
  expiration_date: string;
  pickup_location: string;
  status: string;
  created_by: string;
  claimed_by: string | null;
}

export default function ViewListings() {
  const [listings, setListings] = useState<FoodListing[]>([]);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('food_listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setListings(data || []);
    } catch (err) {
      setError('Failed to fetch listings');
    }
  };

  const handleClaim = async (listingId: string) => {
    if (!user) return;

    try {
      const { error: updateError } = await supabase
        .from('food_listings')
        .update({
          status: 'claimed',
          claimed_by: user.id,
        })
        .eq('id', listingId);

      if (updateError) throw updateError;
      fetchListings();
    } catch (err) {
      setError('Failed to claim listing');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Available Food Listings</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="grid gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{listing.title}</h3>
                <p className="text-gray-600 mt-2">{listing.description}</p>
              </div>
              {user && listing.status === 'available' && listing.created_by !== user.id && (
                <button
                  onClick={() => handleClaim(listing.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Claim
                </button>
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Quantity:</span> {listing.quantity}
              </div>
              <div>
                <span className="font-semibold">Status:</span>{' '}
                <span className={listing.status === 'available' ? 'text-green-600' : 'text-gray-600'}>
                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                </span>
              </div>
              <div>
                <span className="font-semibold">Expires:</span>{' '}
                {format(new Date(listing.expiration_date), 'PPP')}
              </div>
              <div>
                <span className="font-semibold">Location:</span> {listing.pickup_location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}