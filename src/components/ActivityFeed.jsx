import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Star, 
  MessageCircle, 
  TrendingUp, 
  Award,
  Clock
} from 'lucide-react';

const activities = [
  {
    id: 1, type: 'order', icon: Package, title: 'Order shipped',
    description: 'Vintage denim jacket is on its way', time: '2 hours ago', color: 'green'
  },
  {
    id: 2, type: 'review', icon: Star, title: 'New review received',
    description: '5-star rating for your vintage sweater', time: '4 hours ago', color: 'accent'
  },
  {
    id: 3, type: 'message', icon: MessageCircle, title: 'New message',
    description: 'Question about the leather boots', time: '6 hours ago', color: 'terra'
  },
  {
    id: 4, type: 'milestone', icon: Award, title: 'Milestone achieved!',
    description: 'You reached Sapling sustainability tier', time: '1 day ago', color: 'green'
  }
];

const notifications = [
  { id: 1, type: 'info', title: 'Price drop alert', description: 'Items in your wishlist are now 20% off', urgent: false },
  { id: 2, type: 'success', title: 'Item sold!', description: 'Your vintage camera just sold', urgent: true }
];

const ActivityFeed = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
      >
        <h3 className="font-heading font-semibold text-gray-800 mb-4 flex items-center">
          <div className="w-2 h-2 bg-eco-green rounded-full mr-2"></div>
          Notifications
        </h3>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-lg border-l-4 ${
                notification.urgent
                  ? 'bg-eco-accent/10 border-eco-accent'
                  : 'bg-gray-50 border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-sm text-gray-800">{notification.title}</h4>
                  <p className="text-xs text-gray-600 mt-1 font-normal">{notification.description}</p>
                </div>
                {notification.urgent && <div className="w-2 h-2 bg-eco-accent rounded-full animate-pulse-soft"></div>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
      >
        <h3 className="font-heading font-semibold text-gray-800 mb-4 flex items-center">
          <TrendingUp className="w-4 h-4 text-eco-green mr-2" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            const bgClass = activity.color === 'green' ? 'bg-eco-green/10' :
                            activity.color === 'accent' ? 'bg-eco-accent/10' :
                            'bg-eco-terra/10';
            const textClass = activity.color === 'green' ? 'text-eco-green' :
                              activity.color === 'accent' ? 'text-eco-accent' :
                              'text-eco-terra';

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bgClass}`}>
                  <Icon className={`w-4 h-4 ${textClass}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-800 truncate">{activity.title}</h4>
                  <p className="text-xs text-gray-600 truncate font-normal">{activity.description}</p>
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  <span className="font-normal">{activity.time}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-eco-light to-green-50 rounded-xl p-4 border border-eco-green/20"
      >
        <h3 className="font-heading font-semibold text-eco-green mb-3">Need Help?</h3>
        <p className="text-sm text-gray-600 mb-4 font-normal">Get instant support from our community experts</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white text-eco-green py-2 px-4 rounded-lg font-medium hover:bg-white/90 transition-colors border border-eco-green/20"
        >
          Start Chat
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ActivityFeed;
