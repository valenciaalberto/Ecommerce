import React from 'react';
import { ProductCard } from './ProductCard';
import { Product, FilterOptions } from '../../types';
import { SlidersHorizontal, PackageX, Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  filters,
  setFilters,
  onAddToCart,
  onQuickView,
  onResetFilters
}) => {
  return (
    <div className="flex-1">
      {/* Top Filter Summary & Sorting Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-extrabold text-slate-100 text-lg flex items-center gap-2">
            <span>{filters.category === 'All' ? 'All Electronics & Hardware' : filters.category}</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {products.length} Products
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {filters.searchQuery ? `Showing results for "${filters.searchQuery}"` : 'Handpicked high-performance hardware with full warranty.'}
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-slate-400 whitespace-nowrap">Sort By:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(f => ({ ...f, sortBy: e.target.value as any }))}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 w-full sm:w-auto"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">New Arrivals</option>
          </select>
        </div>
      </div>

      {/* Grid or Empty State */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-12 text-center max-w-lg mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-slate-800/80 text-cyan-400 flex items-center justify-center mx-auto mb-4">
            <PackageX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-200 mb-1">No products found</h3>
          <p className="text-xs text-slate-400 mb-6">
            We couldn't find any electronics matching your current search or filter parameters. Try adjusting your search query or reset filters.
          </p>
          <button
            onClick={onResetFilters}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow-md shadow-cyan-500/20"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
