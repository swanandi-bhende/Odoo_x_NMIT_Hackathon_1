import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../utils/dataService';
import EmptyState from '../components/common/EmptyState';
import SkeletonLoader from '../components/common/SkeletonLoader';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const WishlistPage = () => {
  const { user, refreshUser } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = useCallback(() => {
    if (user) {
      const userWishlist = dataService.getWishlist(user.id);
      setWishlist(userWishlist);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => { // Simulate network delay
      fetchWishlist();
    }, 500);
  }, [fetchWishlist]);

  const handleRemove = (itemId) => {
    dataService.removeFromWishlist(user.id, itemId);
    toast.success('Item removed from wishlist!');
    fetchWishlist(); // Re-fetch to update list
    refreshUser(user.id); // Refresh user context to update counts
  };

  const handleAddToCart = (item) => {
    dataService.createOrder(user.id, item);
    toast.success(`${item.title} added to cart!`);
  };

  if (loading) {
    return <SkeletonLoader type="card" count={4} />;
  }

  if (!user) {
    return <EmptyState icon={Heart} title="Login to see your wishlist" message="Please log in to view your saved items." />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group">
              <div className="relative">
                <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-2 right-2 bg-white/70 dark:bg-gray-900/70 p-2 rounded-full text-red-500 hover:bg-white dark:hover:bg-gray-900 hover:scale-110 transition-transform"
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{item.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">${item.price}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 flex items-center gap-1.5 text-sm"
                  >
                    <ShoppingCart size={14} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          message="Add items you love to your wishlist to save them for later."
          ctaText="Explore Items"
          ctaLink="/"
        />
      )}
    </div>
  );
};

export default WishlistPage;