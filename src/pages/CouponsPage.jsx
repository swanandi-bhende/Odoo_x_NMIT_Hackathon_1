import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../utils/dataService';
import { Tag, Gift, Scissors, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import EmptyState from '../components/common/EmptyState';
import SkeletonLoader from '../components/common/SkeletonLoader';

const CouponsPage = () => {
  const { user } = useAuth();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setTimeout(() => { // Simulate network delay
        const userCoupons = dataService.getUserCoupons(user.id);
        setCoupons(userCoupons);
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleApply = (code) => {
    const result = dataService.applyCoupon(code);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.error);
    }
  };

  if (loading) {
    return <SkeletonLoader type="list" count={3} />;
  }

  if (!user) {
    return <EmptyState icon={Tag} title="Login to see your coupons" message="Please log in to view your available coupons and offers." />;
  }

  if (coupons.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Coupons & Offers</h1>
        <EmptyState
          icon={Gift}
          title="No coupons and offers for you yet"
          message="Keep an eye on this page! You can earn coins and unlock offers by selling items or inviting friends."
          ctaText="Start Selling"
          ctaLink="/my-listings"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Coupons & Offers</h1>
      <div className="space-y-4">
        {coupons.map(coupon => (
          <div key={coupon.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row">
            <div className="p-6 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-100 dark:bg-green-500/20 p-2 rounded-full">
                  <Tag className="text-green-600 dark:text-green-300" size={20} />
                </div>
                <h3 className="text-xl font-bold text-green-600 dark:text-green-300">
                  {coupon.type === 'percent' ? `${coupon.value}% OFF` : `$${coupon.value} OFF`}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Use this coupon to get a discount on your next purchase.</p>
              <p className="text-sm text-gray-500 mt-1">Expires on: {new Date(coupon.expiry).toLocaleDateString()}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 flex flex-col sm:flex-row items-center justify-center gap-4 border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-700">
              <div className="font-mono text-lg tracking-widest border-2 border-dashed border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md">
                {coupon.code}
              </div>
              <button
                onClick={() => handleApply(coupon.code)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Scissors size={16} />
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponsPage;