import React from 'react';
import { Star, ShoppingBag, Eye, Check, Tag } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView
}) => {
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-slate-900/60 border border-slate-800 hover:border-blue-500 rounded-sm overflow-hidden transition-all duration-300 flex flex-col h-full">
      {/* Image Banner Container */}
      <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 font-mono">
          {discountPercent > 0 && (
            <span className="bg-blue-600 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded-sm">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-slate-800 text-blue-400 font-bold text-[10px] uppercase px-2 py-0.5 rounded-sm border border-blue-500/30">
              NEW RELEASE
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-blue-950/80 text-blue-300 font-bold text-[10px] uppercase px-2 py-0.5 rounded-sm border border-blue-500/40">
              FEATURED
            </span>
          )}
        </div>

        {/* Quick View Button Overlay */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 right-3 bg-slate-900 hover:bg-blue-600 text-slate-200 hover:text-white p-2 rounded-sm border border-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg font-mono text-xs flex items-center gap-1"
          title="Quick View Specs"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">SPECS</span>
        </button>
      </div>

      {/* Product Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-slate-900">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-mono">
            <span className="font-bold text-blue-500 uppercase tracking-widest text-[10px]">{product.brand}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">{product.category}</span>
          </div>

          {/* Name */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-bold text-slate-100 text-sm leading-snug line-clamp-2 hover:text-blue-400 transition cursor-pointer mb-2.5 font-sans"
          >
            {product.name}
          </h3>

          {/* Key Spec Snippet */}
          {product.specs && product.specs.length > 0 && (
            <div className="bg-slate-800/50 border border-slate-800 rounded-sm p-2 mb-3">
              <p className="text-[10px] text-slate-400 font-mono truncate">
                <span className="text-blue-400 font-semibold">{product.specs[0].label}:</span> {product.specs[0].value}
              </p>
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3 text-xs font-mono">
            <div className="flex text-blue-400">
              <Star className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
            </div>
            <span className="font-bold text-slate-200">{product.rating}</span>
            <span className="text-slate-500">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-white tracking-tight font-mono">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through font-mono">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
              <Check className="w-3 h-3" /> READY TO SHIP
            </p>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2.5 rounded-sm transition-all font-mono uppercase tracking-wider"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ADD</span>
          </button>
        </div>
      </div>
    </div>
  );
};
