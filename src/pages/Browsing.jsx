import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid, List, Search, X } from 'lucide-react';
import ProductCard from '../components/Browsing/ProductCard';
import FilterPanel from '../components/Browsing/FilterPanel';
import { faker } from '@faker-js/faker';

const Browsing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: [],
    minPrice: 0,
    maxPrice: 500,
    condition: [],
    localOnly: false
  });
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    setTimeout(() => {
      const mockProducts = Array.from({ length: 20 }, () => ({
        id: faker.string.uuid(),
        title: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 300 })),
        condition: faker.helpers.arrayElement(['New', 'Like New', 'Good', 'Fair']),
        distance: `${faker.number.int({ min: 1, max: 50 })} km`,
        co2Saved: faker.number.float({ min: 0.5, max: 5.0, fractionDigits: 1 }),
        image: `https://picsum.photos/300/300?random=${faker.number.int({ min: 1, max: 1000 })}`,
        seller: faker.person.fullName(),
        rating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
        category: faker.helpers.arrayElement(['Clothing', 'Electronics', 'Books', 'Home', 'Sports'])
      }));
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  };

  const filteredProducts = products.filter(product => {
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.category.length > 0 && !filters.category.includes(product.category)) {
      return false;
    }
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }
    if (filters.condition.length > 0 && !filters.condition.includes(product.condition)) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popularity':
        return b.rating - a.rating;
      default:
        return 0; // newest
    }
  });

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Sustainable Finds</h1>
        
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for sustainable treasures..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-card focus:ring-2 focus:ring-eco-green focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-card hover:bg-gray-50"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-card focus:ring-2 focus:ring-eco-green"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popularity">Most Popular</option>
            </select>
            
            <div className="flex border border-gray-300 rounded-card overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-eco-green text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-eco-green text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-6">
        <div className="hidden lg:block w-80 flex-shrink-0">
          <FilterPanel 
            filters={filters} 
            onFiltersChange={setFilters}
            productCount={sortedProducts.length}
          />
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setShowFilters(false)}
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-white h-full w-80 p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-card"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterPanel 
                  filters={filters} 
                  onFiltersChange={setFilters}
                  productCount={sortedProducts.length}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-card p-4 animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-card mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}
            >
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && sortedProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-500 text-lg">No products found</div>
              <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browsing;
