import React from 'react';
import { FilterOptions, Category } from '../../types';
import { SlidersHorizontal, RotateCcw, Check, Sparkles } from 'lucide-react';

interface FilterSidebarProps {
  categories: Category[];
  brands: string[];
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  onReset: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  brands,
  filters,
  setFilters,
  onReset,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const content = (
    <div className="bg-slate-900 border border-slate-800 rounded-sm p-5 space-y-6 text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 font-mono">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-500" />
          <h3 className="font-bold text-xs uppercase tracking-widest text-slate-100">FILTER MATRIX</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold uppercase tracking-wider"
        >
          <RotateCcw className="w-3 h-3" /> RESET
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">CATEGORY</h4>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters(f => ({ ...f, category: cat }))}
              className={`w-full text-left text-xs font-mono px-3 py-2 rounded-sm transition flex items-center justify-between uppercase tracking-wider ${
                filters.category === cat
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>{cat}</span>
              {filters.category === cat && <Check className="w-3.5 h-3.5 text-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">MANUFACTURER</h4>
        <select
          value={filters.brand}
          onChange={(e) => setFilters(f => ({ ...f, brand: e.target.value }))}
          className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
        >
          <option value="All">All Manufacturers</option>
          {brands.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2 font-mono">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">MAX BUDGET</h4>
          <span className="text-xs font-bold text-blue-400">${filters.maxPrice.toLocaleString()}</span>
        </div>
        <input 
          type="range"
          min={100}
          max={5000}
          step={100}
          value={filters.maxPrice}
          onChange={(e) => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))}
          className="w-full accent-blue-600 bg-slate-950 h-1.5 rounded-sm appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
          <span>$100</span>
          <span>$5,000+</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">MIN RATING</h4>
        <div className="flex gap-2 font-mono">
          {[0, 4.0, 4.5, 4.8].map((rating) => (
            <button
              key={rating}
              onClick={() => setFilters(f => ({ ...f, minRating: rating }))}
              className={`flex-1 text-xs py-1.5 rounded-sm border text-center font-bold transition uppercase ${
                filters.minRating === rating
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {rating === 0 ? 'ALL' : `${rating}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Toggle */}
      <div className="pt-2 border-t border-slate-800 font-mono">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">IN STOCK ONLY</span>
          <input 
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters(f => ({ ...f, inStockOnly: e.target.checked }))}
            className="w-4 h-4 rounded-sm border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500"
          />
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 shrink-0">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm md:hidden flex justify-end">
          <div className="w-80 bg-slate-950 h-full p-4 overflow-y-auto border-l border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-slate-100">Filter Electronics</span>
              <button 
                onClick={onCloseMobile}
                className="text-xs text-slate-400 hover:text-white bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800"
              >
                Close
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};
