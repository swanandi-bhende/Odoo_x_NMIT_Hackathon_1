import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Heart, 
  MessageCircle, 
  Search, 
  Tag, 
  Leaf, 
  HelpCircle, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Package, label: 'My Listings' },
    { icon: ShoppingBag, label: 'Orders' },
    { icon: Heart, label: 'Wishlist' },
    { icon: MessageCircle, label: 'Messages' },
    { icon: Search, label: 'Saved Searches' },
    { icon: Tag, label: 'Coupons & Offers' },
    { icon: Leaf, label: 'Sustainability' },
    { icon: HelpCircle, label: 'Support' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 240 }}
      className="bg-white border-r border-gray-200 h-screen sticky top-16 lg:top-20 overflow-hidden"
    >
      <div className="p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="btn w-full flex items-center justify-center lg:justify-end p-2 hover:bg-gray-100 transition-colors mb-4"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>

        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.02 }}
                className={`btn w-full flex items-center space-x-3 p-3 transition-colors ${
                  item.active 
                    ? 'bg-eco-light text-eco-green' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-eco-green'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-normal text-sm">{item.label}</span>
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
