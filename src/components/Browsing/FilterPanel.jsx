import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin } from 'lucide-react';

const FilterPanel = ({ filters, onFiltersChange, productCount }) => {
  const categories = [
    { name: 'Clothing', count: 156 },
    { name: 'Electronics', count: 89 },
    { name: 'Books', count: 245 },
    { name: 'Home', count: 123 },
    { name: 'Sports', count: 67 }
  ];

  const conditions = ['New', 'Like New', 'Good', 'Fair'];

  const handleCategoryChange = (category) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    
    onFiltersChange({ ...filters, category: newCategories });
  };

  const handleConditionChange = (condition) => {
    const newConditions = filters.condition.includes(condition)
      ? filters.condition.filter(c => c !== condition)
      : [...filters.condition, condition];
    
    onFiltersChange({ ...filters, condition: newConditions });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: [],
      minPrice: 0,
      maxPrice: 500,
      condition: [],
      localOnly: false
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-card p-6 shadow-sm border h-fit sticky top-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-eco-green hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Min Price</label>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => onFiltersChange({ ...filters, minPrice: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-card focus:ring-2 focus:ring-eco-green focus:border-transparent"
                placeholder="$0"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Max Price</label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => onFiltersChange({ ...filters, maxPrice: parseInt(e.target.value) || 500 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-card focus:ring-2 focus:ring-eco-green focus:border-transparent"
                placeholder="$500"
              />
            </div>
            <div className="mt-3">
              <input
                type="range"
                min="0"
                max="500"
                value={filters.maxPrice}
                onChange={(e) => onFiltersChange({ ...filters, maxPrice: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #237A57 0%, #237A57 ${(filters.maxPrice / 500) * 100}%, #e5e7eb ${(filters.maxPrice / 500) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$0</span>
                <span>$500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.name} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.category.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                  className="rounded border-gray-300 text-eco-green focus:ring-eco-green"
                />
                <span className="flex-1 text-sm text-gray-700">{category.name}</span>
                <span className="text-xs text-gray-500">({category.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Condition */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Condition</h3>
          <div className="space-y-2">
            {conditions.map((condition) => (
              <label key={condition} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.condition.includes(condition)}
                  onChange={() => handleConditionChange(condition)}
                  className="rounded border-gray-300 text-eco-green focus:ring-eco-green"
                />
                <span className="text-sm text-gray-700">{condition}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Local Only */}
        <div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.localOnly}
              onChange={(e) => onFiltersChange({ ...filters, localOnly: e.target.checked })}
              className="rounded border-gray-300 text-eco-green focus:ring-eco-green"
            />
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">Local pickup only</span>
          </label>
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium text-gray-900">{productCount}</span> results
        </p>
      </div>
    </motion.div>
  );
};

export default FilterPanel;
