import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, RotateCcw, Star, Eye } from 'lucide-react';
import { faker } from '@faker-js/faker';

const OrdersWidget = () => {
  const recentOrders = Array.from({ length: 5 }, (_, index) => ({
    id: `ORD-${faker.string.alphanumeric(6).toUpperCase()}`,
    title: faker.commerce.productName(),
    status: faker.helpers.arrayElement(['shipped', 'delivered', 'processing', 'returned']),
    price: faker.commerce.price({ min: 25, max: 150, dec: 0 }),
    image: `https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/80x80/E8F6EF/237A57?text=${index + 1}`,
    eta: faker.date.future({ days: 7 }).toLocaleDateString(),
    seller: faker.person.firstName()
  }));

  const getStatusIcon = (status) => {
    switch (status) {
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'returned':
        return <RotateCcw className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading font-semibold text-gray-800">
          Recent Orders
        </h3>
        <button className="text-sm text-eco-green hover:text-eco-green/80 font-medium">
          View all orders
        </button>
      </div>

      <div className="space-y-4">
        {recentOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors group"
          >
            <img
              src={order.image}
              alt={order.title}
              className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-gray-800 truncate">
                  {order.title}
                </h4>
                <span className="text-sm text-gray-500 font-normal">• {order.seller}</span>
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status}</span>
                </span>
                <span className="text-sm text-gray-500 font-normal">#{order.id}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-eco-green">${order.price}</span>
                {order.status === 'shipped' && (
                  <span className="text-xs text-gray-500 font-normal">ETA: {order.eta}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              {order.status === 'shipped' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-eco-light text-eco-green text-xs font-medium rounded-lg hover:bg-eco-green hover:text-white transition-all"
                >
                  Track
                </motion.button>
              )}
              
              {order.status === 'delivered' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 bg-eco-accent/20 text-eco-accent text-xs font-medium rounded-lg hover:bg-eco-accent hover:text-white transition-all flex items-center space-x-1"
                  >
                    <Star className="w-3 h-3" />
                    <span>Review</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Return
                  </motion.button>
                </>
              )}

              {order.status === 'processing' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200 transition-all flex items-center space-x-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>View</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 p-4 bg-eco-light/30 rounded-lg border border-eco-green/10"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700 font-normal">
            <strong>Eco Shipping</strong> selected for 3 orders
          </span>
          <span className="text-eco-green font-medium">-2.4kg CO₂e saved</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrdersWidget;
