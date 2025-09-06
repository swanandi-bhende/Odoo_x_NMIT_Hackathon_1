import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../utils/dataService';
import EmptyState from '../components/common/EmptyState';
import SkeletonLoader from '../components/common/SkeletonLoader';
import VerifiedBadge from '../components/common/VerifiedBadge';
import { Store, Edit, Play, Pause, BarChart2 } from 'lucide-react';
import toast from 'react-hot-toast';

const MyListingsPage = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        const userListings = dataService.getUserListings(user.id);
        setListings(userListings);
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleAction = (listingId, action) => {
    // Mock API call
    toast.success(`Listing ${listingId} has been ${action}.`);
  };

  if (loading) {
    return <SkeletonLoader type="card" count={4} />;
  }

  if (!user) {
    return <EmptyState icon={Store} title="Login to see your listings" message="Please log in to manage your items for sale." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Listings</h1>
        {user.badges?.includes('Verified Seller') && <VerifiedBadge />}
      </div>

      {listings.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
              <img
                src={listing.image_url || 'https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400.png'}
                alt={listing.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{listing.title}</h3>
                <div className="flex justify-between items-center mt-2 mb-4">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">${listing.price.toFixed(2)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    listing.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {listing.status}
                  </span>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-2">
                    <button onClick={() => handleAction(listing.id, 'edited')} className="text-sm flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"><Edit size={14} /> Edit</button>
                    {listing.status === 'active' ?
                      <button onClick={() => handleAction(listing.id, 'paused')} className="text-sm flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400"><Pause size={14} /> Pause</button> :
                      <button onClick={() => handleAction(listing.id, 'republished')} className="text-sm flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"><Play size={14} /> Republish</button>
                    }
                    <button className="text-sm flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"><BarChart2 size={14} /> Stats</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={Store}
          title="You have no listings yet"
          message="Start selling your pre-loved items and contribute to a sustainable future."
          ctaText="Create New Listing"
          ctaLink="/my-listings/new"
        />
      )}
    </div>
  );
};

export default MyListingsPage;