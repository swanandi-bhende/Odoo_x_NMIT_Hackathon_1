import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, MapPin, Leaf, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    // Maybe show a toast here
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-card shadow-sm border hover:shadow-md transition-all duration-300 p-4"
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-24 h-24 object-cover rounded-card"
            />
            <div className="absolute top-1 right-1 bg-eco-green text-white text-xs px-1.5 py-0.5 rounded-full">
              -{product.co2Saved}kg
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{product.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full">{product.condition}</span>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{product.distance}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{product.rating}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">Sold by {product.seller}</p>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-eco-green mb-2">${product.price.toFixed(2)}</div>
            <div className="flex items-center space-x-2">
              <button className="p-2 border border-gray-300 rounded-card hover:bg-gray-50">
                <Heart className="w-5 h-5 text-gray-400" />
              </button>
              <button onClick={handleAddToCart} className="bg-eco-green text-white px-4 py-2 rounded-card hover:bg-emerald-700 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-card shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col h-full"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
          <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
        </button>
        <div className="absolute bottom-3 left-3 bg-eco-green text-white text-sm px-2 py-1 rounded-full flex items-center space-x-1">
          <Leaf className="w-4 h-4" />
          <span>-{product.co2Saved}kg CO₂</span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-eco-green transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
            {product.condition}
          </span>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{product.distance} • {product.seller}</span>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="text-xl font-bold text-eco-green">${product.price.toFixed(2)}</div>
          <button 
            onClick={handleAddToCart}
            className="bg-eco-green text-white px-4 py-2 rounded-card hover:bg-emerald-700 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
