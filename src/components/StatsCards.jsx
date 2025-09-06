import React from 'react';
import { motion } from 'framer-motion';
import { Coins, ShoppingBag, Star, DollarSign } from 'lucide-react';

const statsData = [
  {
    title: 'Wallet & Coins',
    value: '247',
    subtitle: 'Available balance',
    icon: Coins,
    color: 'accent',
    change: '+12 today',
  },
  {
    title: 'Recent Orders',
    value: '8',
    subtitle: 'This month',
    icon: ShoppingBag,
    color: 'green',
    change: '+2 pending',
  },
  {
    title: 'Seller Stats',
    value: '94%',
    subtitle: 'Satisfaction rate',
    icon: Star,
    color: 'terra',
    change: '+5% vs last month',
  },
  {
    title: 'Monthly Sales',
    value: '$342',
    subtitle: 'Revenue earned',
    icon: DollarSign,
    color: 'green',
    change: '+15% growth',
  }
];

const StatsCards = () => {
  return (
    <div className="stats-grid">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        const cardBgClass = stat.color === 'accent' ? 'bg-gradient-to-br from-yellow-50 to-amber-50'
                          : stat.color === 'green' ? 'bg-gradient-to-br from-eco-light to-green-50'
                          : 'bg-gradient-to-br from-orange-50 to-amber-50';

        const iconClass = stat.color === 'accent' ? 'text-eco-accent'
                        : stat.color === 'green' ? 'text-eco-green'
                        : 'text-eco-terra';

        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`card interactive p-6 border border-white/50 shadow-sm hover:shadow-lift transition-all duration-300 ${cardBgClass}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/70 rounded-card flex items-center justify-center shadow-sm">
                <Icon className={`w-6 h-6 ${iconClass}`} />
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                className="text-xs text-gray-500 font-normal bg-white/60 px-2 py-1 rounded-full"
              >
                {stat.change}
              </motion.div>
            </div>

            <div className="mb-2">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-2xl font-semibold text-gray-800"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-600 font-normal">{stat.subtitle}</div>
            </div>

            <h3 className="font-medium text-gray-700 text-sm">{stat.title}</h3>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;
