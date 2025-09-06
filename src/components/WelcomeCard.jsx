import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Zap } from 'lucide-react';

const WelcomeCard = () => {
  const userStats = {
    totalOrders: 24,
    itemsSold: 12,
    coinsEarned: 247,
    sustainabilityTier: 'Sapling'
  };

  const tierProgress = 65; // Progress to next tier

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-glass border border-white/20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-eco-accent/10 rounded-full -translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 bg-gradient-to-br from-eco-green to-eco-green/80 rounded-2xl flex items-center justify-center text-white text-xl font-medium shadow-lg"
            >
              A
            </motion.div>
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-heading font-semibold text-eco-text"
              >
                Hello, Alex! 👋
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 font-normal"
              >
                Ready to make a sustainable impact today?
              </motion.p>
            </div>
          </div>

          {/* Sustainability Tier */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="relative w-16 h-16 mb-2">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="4"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="#237A57"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 176' }}
                  animate={{ strokeDasharray: `${(tierProgress / 100) * 176} 176` }}
                  transition={{ delay: 0.8, duration: 1.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                🌱
              </div>
            </div>
            <p className="text-xs font-medium text-eco-green">{userStats.sustainabilityTier}</p>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="text-center">
            <div className="text-2xl font-semibold text-eco-text">{userStats.totalOrders}</div>
            <div className="text-xs text-gray-600 font-normal">Total Orders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-eco-text">{userStats.itemsSold}</div>
            <div className="text-xs text-gray-600 font-normal">Items Sold</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-eco-accent">{userStats.coinsEarned}</div>
            <div className="text-xs text-gray-600 font-normal">Coins Earned</div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center space-x-2 bg-eco-green text-white py-3 px-6 rounded-xl font-medium hover:bg-eco-green/90 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Sell an item</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center space-x-2 bg-eco-light text-eco-green py-3 px-6 rounded-xl font-medium hover:bg-eco-light/80 transition-colors border border-eco-green/20"
          >
            <Zap className="w-5 h-5" />
            <span>List faster with templates</span>
          </motion.button>
        </motion.div>

        {/* Progress to next tier */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-4 p-3 bg-eco-light/30 rounded-lg border border-eco-green/10"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 font-normal">Progress to Tree tier:</span>
            <span className="font-medium text-eco-green">{tierProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${tierProgress}%` }}
              transition={{ delay: 1.1, duration: 1 }}
              className="bg-eco-green h-2 rounded-full"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 font-normal">Sell 5 more items to reach Tree status</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
