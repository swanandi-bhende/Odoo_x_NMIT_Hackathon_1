import React from 'react';
import { motion } from 'framer-motion';
import { Bell, MessageCircle, TrendingUp, Award } from 'lucide-react';

const RightRail = () => {
  const notifications = [
    {
      id: 1,
      type: 'order',
      message: 'Your order has been shipped',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      type: 'achievement',
      message: 'Congratulations! You\'ve earned the Eco Champion badge',
      time: '1 day ago',
      unread: true
    },
    {
      id: 3,
      type: 'message',
      message: 'New message from seller',
      time: '2 days ago',
      unread: false
    }
  ];

  const activities = [
    {
      id: 1,
      user: 'Sarah M.',
      action: 'purchased a vintage jacket',
      co2Saved: 2.3,
      time: '5 minutes ago'
    },
    {
      id: 2,
      user: 'Mike D.',
      action: 'listed a sustainable backpack',
      co2Saved: 1.8,
      time: '12 minutes ago'
    },
    {
      id: 3,
      user: 'Emma L.',
      action: 'achieved Eco Warrior status',
      co2Saved: 5.0,
      time: '1 hour ago'
    }
  ];

  return (
    <div className="hidden xl:block w-80 p-6 space-y-6">
      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-card p-6 shadow-sm border"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          <div className="flex items-center space-x-1">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </div>
        </div>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`p-3 rounded-card border-l-4 ${
                notification.unread 
                  ? 'bg-blue-50 border-l-blue-500' 
                  : 'bg-gray-50 border-l-gray-300'
              }`}
            >
              <p className="text-sm text-gray-900 mb-1">{notification.message}</p>
              <p className="text-xs text-gray-500">{notification.time}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Community Activity */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-card p-6 shadow-sm border"
      >
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-eco-green" />
          <h3 className="font-semibold text-gray-900">Community Activity</h3>
        </div>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-start space-x-3"
            >
              <div className="w-8 h-8 bg-eco-green rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">
                  {activity.user.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 mb-1">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-eco-green font-medium">
                    -{activity.co2Saved}kg CO₂
                  </span>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mini Chat Support */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-eco-green to-emerald-600 rounded-card p-6 text-white"
      >
        <div className="flex items-center space-x-2 mb-4">
          <MessageCircle className="w-5 h-5" />
          <h3 className="font-semibold">Quick Support</h3>
        </div>
        <p className="text-green-100 text-sm mb-4">
          Need help? Our eco-support team is here to assist you!
        </p>
        <button className="bg-white text-eco-green px-4 py-2 rounded-card text-sm font-medium hover:bg-gray-50 transition-colors w-full">
          Start Chat
        </button>
      </motion.div>

      {/* Achievement Showcase */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-card p-6 shadow-sm border"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Award className="w-5 h-5 text-mustard" />
          <h3 className="font-semibold text-gray-900">Recent Achievements</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-card">
            <div className="w-8 h-8 bg-mustard rounded-full flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Eco Champion</p>
              <p className="text-xs text-gray-600">50kg CO₂ saved</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-card">
            <div className="w-8 h-8 bg-eco-green rounded-full flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">First Sale</p>
              <p className="text-xs text-gray-600">Listed first item</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RightRail;
