import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../utils/dataService';
import EmptyState from '../components/common/EmptyState';
import SkeletonLoader from '../components/common/SkeletonLoader';
import { Package, Filter, Search, Truck, RotateCcw, FileText } from 'lucide-react';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (user) {
      setTimeout(() => { // Simulate network delay
        const userOrders = dataService.getUserOrders(user.id);
        setOrders(userOrders);
        setFilteredOrders(userOrders);
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(o => o.status === statusFilter));
    }
  }, [statusFilter, orders]);

  if (loading) {
    return <SkeletonLoader type="list" count={5} />;
  }

  if (!user) {
    return <EmptyState icon={Package} title="Login to see your orders" message="Please log in to view your order history." />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Orders</h1>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
        <Filter className="text-gray-500" size={20} />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bg-transparent border-gray-300 dark:border-gray-600 rounded-md focus:ring-green-500 focus:border-green-500"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.orderId} className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex items-start gap-4">
                  <img src={order.image_url} alt={order.title} className="w-20 h-20 object-cover rounded-md hidden sm:block" />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{order.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Order #{order.orderId}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.purchasedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">${order.total_amount.toFixed(2)}</p>
                  <span className={`px-2 py-1 mt-1 inline-block rounded-full text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 sm:gap-4 flex-wrap">
                  <button className="text-sm flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"><Truck size={14}/> Track Order</button>
                  <button className="text-sm flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"><RotateCcw size={14}/> Return Item</button>
                  <button className="text-sm flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"><FileText size={14}/> View Invoice</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={Search}
          title="No orders found"
          message="No orders match your current filter, or you haven't placed any orders yet."
          ctaText="Explore Marketplace"
          ctaLink="/"
        />
      )}
    </div>
  );
};

export default OrdersPage;