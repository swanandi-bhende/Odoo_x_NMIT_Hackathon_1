import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Calendar, TrendingUp } from 'lucide-react';

const communityHighlights = [
  { id: 1, title: 'Vintage Fashion Swap', description: 'Join 50+ members for a clothing exchange', location: 'Downtown Community Center', date: 'This Saturday', icon: Users, color: 'green' },
  { id: 2, title: 'Community Impact', description: 'Together we saved 2.4 tonnes CO₂e this month', location: 'Local Community', date: 'December 2025', icon: TrendingUp, color: 'accent' },
  { id: 3, title: 'Local Pickup Zone', description: '15 items available within 5km', location: 'Your Neighborhood', date: 'Available now', icon: MapPin, color: 'terra' },
];

const quickActions = [
  { title: 'Quick List Item', description: 'Upload photo and list in 60 seconds', action: 'Start Listing', style: 'listing' },
  { title: 'Find Local Pickup', description: 'Browse items near you', action: 'Explore Map', style: 'map' },
  { title: 'Carbon Calculator', description: 'See your environmental impact', action: 'Calculate', style: 'calculator' },
];

const RecommendationsGrid = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-heading font-semibold text-gray-800">Community Highlights</h3>
          <button className="text-sm text-eco-green hover:text-eco-green/80 font-medium">View all</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {communityHighlights.map((item, index) => {
            const Icon = item.icon;
            const bgClass = item.color === 'green' ? 'bg-eco-green/10' :
                            item.color === 'accent' ? 'bg-eco-accent/10' :
                            'bg-eco-terra/10';
            const textClass = item.color === 'green' ? 'text-eco-green' :
                              item.color === 'accent' ? 'text-eco-accent' :
                              'text-eco-terra';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bgClass}`}>
                    <Icon className={`w-5 h-5 ${textClass}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 mb-2 font-normal">{item.description}</p>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center space-x-1"><MapPin className="w-3 h-3" /><span className="font-normal">{item.location}</span></div>
                      <div className="flex items-center space-x-1"><Calendar className="w-3 h-3" /><span className="font-normal">{item.date}</span></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-xl font-heading font-semibold text-gray-800 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const bgClass = action.style === 'listing' ? 'bg-gradient-to-br from-eco-light to-green-50' :
                            action.style === 'map' ? 'bg-gradient-to-br from-blue-50 to-indigo-50' :
                            'bg-gradient-to-br from-eco-accent/20 to-yellow-50';

            const textClass = action.style === 'listing' ? 'text-eco-green' :
                              action.style === 'map' ? 'text-blue-700' :
                              'text-orange-700';
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`rounded-lg p-4 border border-white/50 cursor-pointer ${bgClass}`}
              >
                <h4 className={`font-medium mb-2 ${textClass}`}>{action.title}</h4>
                <p className="text-sm text-gray-600 mb-4 font-normal">{action.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-2 px-4 bg-white rounded-lg font-medium hover:shadow-sm transition-all text-sm ${textClass}`}
                >
                  {action.action}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default RecommendationsGrid;
