import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Mic, 
  Plus, 
  ShoppingCart, 
  Coins, 
  User, 
  LogOut, 
  Leaf, 
  ShoppingBag,
  Menu,
  X,
  Info
} from 'lucide-react';

const Header = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cartCount] = useState(3);
  const [coinBalance] = useState(247);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm border-b border-eco-green/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left: Logo & About Tab */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Leaf className="w-8 h-8 text-eco-green" />
                  <ShoppingBag className="w-4 h-4 text-eco-accent absolute -bottom-1 -right-1" />
                </div>
                <h1 className="text-xl lg:text-2xl font-heading font-semibold text-eco-text">
                  EcoFinds
                </h1>
              </div>
              
              <button
                onClick={() => setShowAboutModal(true)}
                className="hidden md:flex items-center space-x-1 px-3 py-2 rounded-card bg-eco-light/50 hover:bg-eco-light transition-colors duration-200"
              >
                <Info className="w-4 h-4 text-eco-green" />
                <span className="text-sm font-medium text-eco-text">About EcoFinds</span>
              </button>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search items, brands, sizes, locations — e.g. 'women's denim, size M'"
                  className="input block w-full pl-12 pr-16 py-3 border border-gray-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-eco-green text-sm font-normal"
                />
                <button className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <Mic className="h-5 w-5 text-gray-400 hover:text-eco-green transition-colors" />
                </button>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn flex items-center space-x-2 px-4 py-2 bg-eco-green text-white hover:bg-eco-green/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="font-medium">Sell My Product</span>
                </motion.button>

                <div className="flex items-center space-x-3">
                  <button className="btn relative p-2 hover:bg-gray-100 transition-colors group">
                    <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-eco-green" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-eco-accent text-eco-text text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>

                  <button className="btn relative p-2 hover:bg-gray-100 transition-colors group">
                    <Coins className="w-5 h-5 text-gray-600 group-hover:text-eco-accent" />
                    <span className="absolute -top-1 -right-1 bg-eco-accent text-eco-text text-xs font-medium px-1.5 py-0.5 rounded-full">
                      {coinBalance}
                    </span>
                  </button>

                  <button className="btn p-2 hover:bg-gray-100 transition-colors">
                    <User className="w-5 h-5 text-gray-600" />
                  </button>

                  <button className="btn p-2 hover:bg-gray-100 transition-colors group">
                    <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(true)}
                className="btn lg:hidden p-2 hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search EcoFinds..."
                className="input block w-full pl-12 pr-12 py-3 border border-gray-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-eco-green text-sm font-normal"
              />
              <button className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <Mic className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* About Modal */}
      <AnimatePresence>
        {showAboutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAboutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal bg-white p-6 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <Leaf className="w-8 h-8 text-eco-green" />
                  <ShoppingBag className="w-4 h-4 text-eco-accent absolute -bottom-1 -right-1" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-eco-text">About EcoFinds</h3>
              </div>
              
              <p className="text-gray-600 mb-6 font-normal">
                Curated second-hand fashion, homewares, & vintage finds with verified condition, 
                local pickup & carbon-friendly shipping.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-eco-green rounded-full"></div>
                  <span className="text-sm text-gray-700 font-normal">Sustainable sourcing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-eco-green rounded-full"></div>
                  <span className="text-sm text-gray-700 font-normal">Verified sellers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-eco-green rounded-full"></div>
                  <span className="text-sm text-gray-700 font-normal">Carbon savings tracker</span>
                </div>
              </div>

              <button
                onClick={() => setShowAboutModal(false)}
                className="btn w-full py-2 bg-eco-green text-white hover:bg-eco-green/90 transition-colors font-medium"
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setShowMobileMenu(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl rounded-l-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-heading font-semibold text-eco-text">Menu</h3>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="btn p-2 hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <button className="btn w-full flex items-center space-x-3 p-3 bg-eco-green text-white">
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Sell My Product</span>
                  </button>

                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-card">
                    <div className="flex items-center space-x-3">
                      <ShoppingCart className="w-5 h-5 text-gray-600" />
                      <span className="font-normal">My Cart</span>
                    </div>
                    <span className="bg-eco-accent text-eco-text text-xs font-medium px-2 py-1 rounded-full">
                      {cartCount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-card">
                    <div className="flex items-center space-x-3">
                      <Coins className="w-5 h-5 text-gray-600" />
                      <span className="font-normal">My Coins</span>
                    </div>
                    <span className="bg-eco-accent text-eco-text text-xs font-medium px-2 py-1 rounded-full">
                      {coinBalance}
                    </span>
                  </div>

                  <button className="btn w-full flex items-center space-x-3 p-3 hover:bg-gray-50">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="font-normal">User Info</span>
                  </button>

                  <button className="btn w-full flex items-center space-x-3 p-3 hover:bg-gray-50">
                    <LogOut className="w-5 h-5 text-gray-600" />
                    <span className="font-normal">Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating FAB for mobile */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="btn fixed bottom-6 right-6 lg:hidden w-14 h-14 bg-eco-green text-white rounded-full shadow-lg flex items-center justify-center z-40"
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </>
  );
};

export default Header;
