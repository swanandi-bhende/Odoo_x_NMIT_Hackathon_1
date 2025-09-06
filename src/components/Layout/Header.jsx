import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Coins, User, LogOut, Menu, Package } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSidebar } from '../../contexts/SidebarContext';
import { useCart } from '../../contexts/CartContext';
import MiniCart from '../Cart/MiniCart';

const Header = () => {
  const { user, logout } = useAuth();
  const { setIsSidebarOpen } = useSidebar();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false);

  const handleSearchClick = () => {
    navigate('/browse');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-card"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:block w-40"> {/* Placeholder to align search bar */}
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search for sustainable treasures..."
                onClick={handleSearchClick}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-transparent rounded-card focus:ring-2 focus:ring-eco-green focus:bg-white focus:border-eco-green cursor-pointer transition-all"
                readOnly
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-eco-green text-white px-4 py-2 rounded-card font-medium hover:bg-emerald-700 transition-colors hidden md:flex items-center space-x-2"
            >
              <Package className="w-4 h-4" />
              <span>Sell</span>
            </motion.button>
            
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="relative">
                <button 
                  onMouseEnter={() => setShowMiniCart(true)}
                  onMouseLeave={() => setShowMiniCart(false)}
                  onClick={() => navigate('/cart')}
                  className="relative p-2 hover:bg-gray-100 rounded-card" aria-label={`Cart with ${cartCount} items`}>
                  <ShoppingCart className="w-6 h-6 text-gray-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-gentle">
                      {cartCount}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {showMiniCart && <MiniCart onMouseEnter={() => setShowMiniCart(true)} onMouseLeave={() => setShowMiniCart(false)} />}
                </AnimatePresence>
              </div>
              
              <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-card">
                <Coins className="w-6 h-6 text-mustard" />
                <span className="hidden md:block text-sm font-medium">1,250</span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  onBlur={() => setTimeout(() => setShowUserMenu(false), 200)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 bg-terracotta rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </button>
                
                <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-card shadow-lg border border-gray-200 py-2 z-50"
                  >
                    <button 
                      onClick={() => { navigate('/profile'); setShowUserMenu(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
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
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
