import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, TrendingUp, Info } from 'lucide-react';

const CarbonFootprintCard = () => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const targetValue = 247.8;
  const equivalentTrees = 125;

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedValue(prev => {
          if (prev >= targetValue) {
            clearInterval(interval);
            return targetValue;
          }
          return prev + (targetValue / 50);
        });
      }, 40);
    }, 500);

    return () => clearTimeout(timer);
  }, [targetValue]);

  const last30Days = [12, 15, 8, 22, 18, 25, 30, 20, 14, 28, 35, 42, 38, 45, 32, 28, 40, 35, 48, 52, 46, 38, 44, 50, 42, 48, 55, 58, 52, 60];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-eco-gradient-start to-eco-gradient-end backdrop-blur-sm rounded-2xl p-6 shadow-glass border border-white/20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-eco-green/5 rounded-full -translate-y-16 translate-x-16"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="w-12 h-12 bg-eco-green/10 rounded-xl flex items-center justify-center"
            >
              <Leaf className="w-6 h-6 text-eco-green" />
            </motion.div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-eco-text">Carbon Footprint Saved</h3>
              <p className="text-sm text-gray-600 font-normal">Your environmental impact</p>
            </div>
          </div>
          <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <Info className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-baseline space-x-2"
              >
                <span className="text-4xl lg:text-5xl font-semibold text-eco-green animate-count-up">
                  {animatedValue.toFixed(1)}
                </span>
                <span className="text-lg text-gray-600 font-normal">kg CO₂e</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-600 mt-2 font-normal"
              >
                = <strong>{equivalentTrees} trees planted</strong> or <strong>540 km not driven</strong>
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center space-x-2 text-sm text-eco-green"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">+15.2% this month</span>
            </motion.div>
          </div>

          <div>
            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Last 30 days</h4>
              <div className="flex items-end space-x-1 h-16">
                {last30Days.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / 60) * 100}%` }}
                    transition={{ delay: 1 + (index * 0.02) }}
                    className="flex-1 bg-eco-green/70 rounded-t min-h-[4px]"
                  />
                ))}
              </div>
            </div>

            {/* Growing leaf animation */}
            <motion.div
              initial={{ scale: 0, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="text-4xl"
              >
                🌱
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-6 p-4 bg-white/30 rounded-xl border border-white/20"
        >
          <p className="text-xs text-gray-600 leading-relaxed font-normal">
            <strong>How we calculate:</strong> Based on avoided manufacturing emissions, 
            reduced transportation, and extended product lifecycle compared to buying new items.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CarbonFootprintCard;
