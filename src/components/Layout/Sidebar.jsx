import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '../../contexts/SidebarContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { 
  LayoutDashboard, Package, ShoppingBag, Heart, Search, MessageCircle, RotateCw, Tag, Leaf, ShoppingCart, User, HelpCircle, Settings, LogOut, X, Info, ChevronsLeft, ChevronsRight
} from 'lucide-react';

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, isCollapsed, toggleCollapse } = useSidebar();
  const { logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = {
    main: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
      { icon: Search, label: 'Browse', path: '/browse' },
    ],
    selling: [
      { icon: Package, label: 'My Listings', path: '/listings' },
      { icon: ShoppingBag, label: 'Orders', path: '/orders' },
    ],
    shopping: [
      { icon: Heart, label: 'Wishlist', path: '/wishlist' },
      { icon: MessageCircle, label: 'Messages', path: '/messages' },
      { icon: RotateCw, label: 'Recent Buyings', path: '/buyings' },
      { icon: Tag, label: 'Coupons & Offers', path: '/offers' },
      { icon: Leaf, label: 'Sustainability', path: '/sustainability' },
      { icon: ShoppingCart, label: 'Cart', path: '/cart', badge: cartCount },
    ],
    account: [
      { icon: User, label: 'Profile', path: '/profile' },
      { icon: HelpCircle, label: 'Support', path: '/support' },
      { icon: Settings, label: 'Settings', path: '/settings' },
    ],
  };

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
      end
      className={({ isActive }) =>
        `flex items-center justify-between w-full px-3 py-2.5 rounded-card text-left transition-colors text-sm font-medium ${
          isCollapsed ? 'justify-center' : ''
        } ${
          isActive 
            ? 'bg-eco-green text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`
      }
      title={item.label}
    >
      <div className="flex items-center space-x-3">
        <item.icon className="w-5 h-5 flex-shrink-0" />
        {!isCollapsed && <span>{item.label}</span>}
      </div>
      {!isCollapsed && item.badge > 0 && (
        <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {item.badge}
        </span>
      )}
    </NavLink>
  );

  const SidebarContent = () => (
    <div className={`h-full flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-sidebar-collapsed' : 'w-sidebar'}`}>
      <div className={`flex items-center p-4 border-b border-gray-200 ${isCollapsed ? 'justify-center h-[65px]' : 'justify-between h-[65px]'}`}>
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-eco-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="font-bold text-xl text-gray-900">EcoFinds</span>
          </div>
        )}
        <button
          onClick={toggleCollapse}
          className="hidden lg:block p-2 hover:bg-gray-100 rounded-card"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronsRight className="w-5 h-5" /> : <ChevronsLeft className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {Object.entries(menuItems).map(([group, items]) => (
          <div key={group}>
            {!isCollapsed && group !== 'main' && (
              <h3 className="px-3 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">{group}</h3>
            )}
            {items.map(item => <NavItem key={item.label} item={item} />)}
            {isCollapsed && group !== 'account' && <hr className="my-2 border-gray-200" />}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full px-3 py-2.5 rounded-card text-left transition-colors text-sm font-medium text-red-600 hover:bg-red-50 ${isCollapsed ? 'justify-center' : ''}`}
          title="Logout"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay & Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-60 z-40"
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 h-full z-50"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-full z-20">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
