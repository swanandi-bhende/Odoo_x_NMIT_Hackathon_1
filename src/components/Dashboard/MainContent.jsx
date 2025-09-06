import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Add this import
import { Package, TrendingUp, Leaf, Coins, ShoppingCart, Eye, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Lottie from 'lottie-react';

const MainContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  // Mock data
  const stats = {
    totalSavings: 1250,
    co2Saved: 45.2,
    treesEquivalent: 12,
    totalOrders: 28,
    sellerRating: 4.8
  };

  const recentOrders = [
    {
      id: 1,
      title: 'Vintage Denim Jacket',
      price: 45,
      status: 'Delivered',
      image: 'https://picsum.photos/80/80?random=1'
    },
    {
      id: 2,
      title: 'Eco-friendly Water Bottle',
      price: 25,
      status: 'In Transit',
      image: 'https://picsum.photos/80/80?random=2'
    },
    {
      id: 3,
      title: 'Sustainable Tote Bag',
      price: 30,
      status: 'Processing',
      image: 'https://picsum.photos/80/80?random=3'
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Organic Cotton Sweater',
      price: 65,
      co2Saved: 2.3,
      image: 'https://picsum.photos/200/150?random=10'
    },
    {
      id: 2,
      title: 'Bamboo Phone Case',
      price: 20,
      co2Saved: 1.1,
      image: 'https://picsum.photos/200/150?random=11'
    },
    {
      id: 3,
      title: 'Upcycled Backpack',
      price: 80,
      co2Saved: 3.5,
      image: 'https://picsum.photos/200/150?random=12'
    },
    {
      id: 4,
      title: 'Solar Power Bank',
      price: 45,
      co2Saved: 2.8,
      image: 'https://picsum.photos/200/150?random=13'
    }
  ];

  const animationData = {
    v: "5.5.7",
    meta: { g: "LottieFiles AE 0.1.20", a: "", k: "", d: "", tc: "" },
    fr: 29.9700012207031,
    ip: 0,
    op: 90.0000036657751,
    w: 500,
    h: 500,
    nm: "Leaf Animation",
    ddd: 0,
    assets: [],
    layers: [{
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Leaf",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { 
          a: 1, 
          k: [
            { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] },
            { t: 89.0000036250418, s: [360] }
          ], 
          ix: 10 
        },
        p: { a: 0, k: [250, 250, 0], ix: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: { 
          a: 1, 
          k: [
            { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [100, 100, 100] },
            { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 45, s: [120, 120, 100] },
            { t: 89.0000036250418, s: [100, 100, 100] }
          ], 
          ix: 6 
        }
      },
      ao: 0,
      shapes: [{
        ty: "gr",
        it: [{
          ind: 0,
          ty: "sh",
          ix: 1,
          ks: {
            a: 0,
            k: {
              i: [[0,0],[0,0],[0,0],[0,0]],
              o: [[0,0],[0,0],[0,0],[0,0]],
              v: [[-50,-50],[50,-50],[50,50],[-50,50]],
              c: true
            },
            ix: 2
          },
          nm: "Path 1",
          mn: "ADBE Vector Shape - Group",
          hd: false
        }, {
          ty: "fl",
          c: { a: 0, k: [0.137, 0.478, 0.341, 1], ix: 4 },
          o: { a: 0, k: 100, ix: 5 },
          r: 1,
          bm: 0,
          nm: "Fill 1",
          mn: "ADBE Vector Graphic - Fill",
          hd: false
        }],
        nm: "Leaf Shape",
        np: 2,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: false
      }],
      ip: 0,
      op: 90.0000036657751,
      st: 0,
      bm: 0
    }]
  };

  return (
    <div className="flex-1 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-eco-green to-emerald-600 rounded-card p-6 text-white">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.firstName || 'Eco Warrior'}! 🌱
            </h1>
            <p className="text-green-100 mb-4">
              You've saved the equivalent of {stats.treesEquivalent} trees this month through sustainable shopping!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-eco-green px-6 py-2 rounded-card font-medium hover:bg-gray-50 transition-colors"
              onClick={() => navigate('/sell')} // Navigate to /sell
            >
              Sell an Item
            </motion.button>
          </motion.div>
        </div>

        {/* Hero KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Carbon Footprint Saved - Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-white rounded-card p-6 shadow-sm border"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Carbon Footprint Saved</h3>
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-eco-green">{stats.co2Saved}</span>
                  <span className="text-lg text-gray-600">kg CO₂</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  = {stats.treesEquivalent} trees worth of carbon absorption
                </p>
                <div className="bg-eco-green/10 rounded-card p-3">
                  <div className="flex items-center space-x-2">
                    <Leaf className="w-5 h-5 text-eco-green" />
                    <span className="text-sm font-medium text-eco-green">
                      Sustainability Champion Tier
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-20 h-20">
                <div className="w-full h-full bg-eco-green/10 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 text-eco-green animate-bounce-gentle">
                    <Leaf className="w-full h-full" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* EcoCoins */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-card p-6 shadow-sm border"
          >
            <div className="flex items-center justify-between mb-4">
              <Coins className="w-8 h-8 text-mustard" />
              <span className="text-2xl font-bold text-gray-900">{stats.totalSavings}</span>
            </div>
            <h3 className="font-semibold text-gray-900">EcoCoins</h3>
            <p className="text-sm text-gray-600">+125 this week</p>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-card p-6 shadow-sm border"
          >
            <div className="flex items-center justify-between mb-4">
              <ShoppingCart className="w-8 h-8 text-terracotta" />
              <span className="text-2xl font-bold text-gray-900">{stats.totalOrders}</span>
            </div>
            <h3 className="font-semibold text-gray-900">Total Orders</h3>
            <p className="text-sm text-gray-600">3 active orders</p>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-card p-6 shadow-sm border"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-card transition-colors"
              >
                <img
                  src={order.image}
                  alt={order.title}
                  className="w-12 h-12 rounded-card object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{order.title}</h4>
                  <p className="text-sm text-gray-600">${order.price}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feed Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          {/* Recommendations */}
          <div className="bg-white rounded-card p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recommended for You</h3>
              <button className="text-eco-green hover:underline text-sm">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendations.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-card mb-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-eco-green text-white text-xs px-2 py-1 rounded-full">
                      -{item.co2Saved}kg CO₂
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1 group-hover:text-eco-green transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-eco-green font-bold">${item.price}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Activity Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-card p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Viewed</h3>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-card"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                    </div>
                    <Eye className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-card p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Local Pickup Available</h3>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-eco-green" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                    <span className="text-sm text-gray-500">2km</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MainContent;