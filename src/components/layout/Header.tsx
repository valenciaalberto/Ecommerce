import React from 'react';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  Heart, 
  Clock, 
  Cpu, 
  ShieldCheck, 
  SlidersHorizontal 
} from 'lucide-react';
import { Category, FilterOptions } from '../../types';

interface HeaderProps {
  categories: Category[];
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  cartCount: number;
  wishlistCount: number;
  ordersCount: number;
  onOpenCart: () => void;
  onOpenOrders: () => void;
  onOpenAiAdvisor: () => void;
  onToggleMobileFilters: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  categories,
  filters,
  setFilters,
  cartCount,
  wishlistCount,
  ordersCount,
  onOpenCart,
  onOpenOrders,
  onOpenAiAdvisor,
  onToggleMobileFilters
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Top Banner: Firebase AppHosting System Status */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-1.5 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-400 font-semibold px-2 py-0.5 rounded-sm border border-blue-500/30">
              <Cpu className="w-3 h-3 animate-pulse" /> SYSTEM // FIREBASE APPHOSTING
            </span>
            <span className="hidden sm:inline text-slate-500">
              INSTANCES: 0 - 2 | CPU: 1 | MEMORY: 1024 MiB | EXPRESS 5
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> AUTHENTIC HARDWARE
            </span>
            <span className="hidden md:inline text-slate-500">PORT // 8080</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5">
        <div className="flex items-center justify-between gap-6">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setFilters(f => ({ ...f, category: 'All', searchQuery: '' }))}>
            <div className="w-9 h-9 bg-blue-600 rounded-sm flex items-center justify-center font-black text-white text-lg tracking-wider">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tighter text-white font-sans uppercase">
                  TECH<span className="text-blue-500">VAULT</span>
                </span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-1.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-sm">
                  NEXT.JS
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest leading-none">Geometric Core Store</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text"
              placeholder="Search Hardware, Specs, GPUs..."
              value={filters.searchQuery}
              onChange={(e) => setFilters(f => ({ ...f, searchQuery: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-sm pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
            />
            {filters.searchQuery && (
              <button 
                onClick={() => setFilters(f => ({ ...f, searchQuery: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiAdvisor}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-2.5 rounded-sm transition border border-blue-400/30 tracking-wider uppercase font-mono"
              title="Ask Gemini AI for tech recommendations"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span className="hidden sm:inline">AI Advisor</span>
            </button>

            {/* Orders Button */}
            <button
              onClick={onOpenOrders}
              className="relative p-2.5 text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-sm transition"
              title="Order History"
            >
              <Clock className="w-4 h-4" />
              {ordersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {ordersCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 px-3.5 py-2.5 rounded-sm transition font-medium text-xs font-mono"
            >
              <ShoppingBag className="w-4 h-4 text-blue-500" />
              <span className="hidden sm:inline font-bold uppercase tracking-wider">Cart</span>
              {cartCount > 0 && (
                <span className="bg-blue-600 text-white font-bold text-xs px-1.5 py-0.2 rounded-sm min-w-5 text-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Filter Toggle */}
            <button
              onClick={onToggleMobileFilters}
              className="md:hidden p-2 text-slate-300 bg-slate-950 border border-slate-800 rounded-sm"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Search Hardware..."
            value={filters.searchQuery}
            onChange={(e) => setFilters(f => ({ ...f, searchQuery: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-sm pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 font-mono"
          />
        </div>

        {/* Category Navigation Bar */}
        <nav className="mt-3 pt-2.5 border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilters(f => ({ ...f, category: cat }))}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
