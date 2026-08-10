import React, { useState } from 'react';
import { CartItem } from '../../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // percentage

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const shipping = subtotal > 500 || items.length === 0 ? 0 : 25;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'TECH10') {
      setAppliedDiscount(10);
    } else if (promoCode.trim().toUpperCase() === 'VIP20') {
      setAppliedDiscount(20);
    } else {
      alert('Invalid promo code. Try TECH10 for 10% off!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between text-slate-200">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h2 className="font-bold text-slate-100 text-base">Your Tech Cart</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {items.length} items
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div 
                key={item.product.id}
                className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 flex gap-3 items-center"
              >
                <img 
                  src={item.product.image} 
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg bg-slate-900 border border-slate-800 shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs text-slate-100 truncate">{item.product.name}</h4>
                  <p className="text-[11px] text-cyan-400 font-mono mt-0.5">${item.product.price.toLocaleString()}</p>
                  
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-xs text-slate-300 hover:text-white"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-xs text-slate-300 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-500 hover:text-red-400 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-right font-bold text-xs text-white">
                  ${(item.product.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-slate-500">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-700" />
              <p className="text-sm font-semibold text-slate-400">Your cart is empty</p>
              <p className="text-xs text-slate-500 mt-1">Explore our catalog to add products.</p>
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout Summary */}
        {items.length > 0 && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Promo (e.g. TECH10)"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-2 py-1.5 text-xs text-slate-100 placeholder-slate-500"
                />
              </div>
              <button 
                type="submit"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg font-medium border border-slate-700"
              >
                Apply
              </button>
            </form>

            {appliedDiscount > 0 && (
              <p className="text-[11px] text-emerald-400 font-medium">
                ✓ {appliedDiscount}% Promo Discount Applied!
              </p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-900">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-slate-200 font-medium">${subtotal.toLocaleString()}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({appliedDiscount}%)</span>
                  <span>-${discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-emerald-400 font-medium">Free</span> : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="text-cyan-400">${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onProceedToCheckout();
                onClose();
              }}
              className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm py-3 rounded-xl transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
