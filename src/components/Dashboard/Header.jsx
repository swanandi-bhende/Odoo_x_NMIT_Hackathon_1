import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Coins, User, LogOut, Menu, Info, Package } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearchClick = () => {
    navigate('/browse');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-card"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-eco-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="font-bold text-xl text-gray-900">EcoFinds</span>
              </div>
              
              <button
                onClick={() => setShowAbout(!showAbout)}
                className="hidden md:flex items-center space-x-1 text-gray-600 hover:text-eco-green transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>About EcoFinds</span>
              </button>
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for sustainable treasures..."
                onClick={handleSearchClick}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-card focus:ring-2 focus:ring-eco-green focus:border-transparent cursor-pointer"
                readOnly
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-eco-green text-white px-4 py-2 rounded-card font-medium hover:bg-emerald-700 transition-colors hidden md:flex items-center space-x-2"
            >
              <Package className="w-4 h-4" />
              <span>Sell My Product</span>
            </motion.button>
            
            <div className="flex items-center space-x-2">
              <button className="relative p-2 hover:bg-gray-100 rounded-card">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              
              <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-card">
                <Coins className="w-6 h-6 text-mustard" />
                <span className="hidden md:block text-sm font-medium">1,250</span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-card"
                >
                  <div className="w-8 h-8 bg-terracotta rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">
                    {user?.firstName || 'User'}
                  </span>
                </button>
                
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-card shadow-lg border border-gray-200 py-2 z-50"
                  >
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Panel */}
      {showAbout && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-200 bg-eco-green text-white p-6"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-3">About EcoFinds</h3>
            <p className="text-green-100 mb-4">
              EcoFinds is your sustainable thrift marketplace where every purchase saves the planet. 
              We connect eco-conscious buyers and sellers, promoting circular economy and reducing fashion waste.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>🌱 Sustainability First</strong>
                <p className="text-green-100">Track your carbon footprint reduction with every purchase</p>
              </div>
              <div>
                <strong>💰 EcoCoins Rewards</strong>
                <p className="text-green-100">Earn rewards for sustainable shopping and selling</p>
              </div>
              <div>
                <strong>🚀 AR Experience</strong>
                <p className="text-green-100">Try before you buy with our AR visualization</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
