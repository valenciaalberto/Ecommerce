import React from 'react';
import { Order } from '../../types';
import { X, Clock, PackageCheck, Truck, CheckCircle2, ShoppingBag } from 'lucide-react';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden relative text-slate-200 my-auto max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h2 className="font-bold text-slate-100 text-base">Your Order History</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3 text-xs">
                  <div>
                    <span className="text-slate-400">Order ID:</span>{' '}
                    <span className="font-mono font-bold text-cyan-400">{order.id}</span>
                  </div>
                  <div className="text-slate-400">
                    <span>Placed: {new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="bg-cyan-500/10 text-cyan-300 font-semibold border border-cyan-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[10px]">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1">
                      <div className="flex items-center gap-2">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-8 h-8 object-cover rounded bg-slate-900"
                        />
                        <span className="text-slate-200 font-medium">{item.product.name} x {item.quantity}</span>
                      </div>
                      <span className="font-mono text-slate-300">${(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Tracking Progress Bar */}
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/60">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1 text-cyan-400"><Clock className="w-3 h-3" /> Processing</span>
                    <span className="flex items-center gap-1 text-blue-400"><Truck className="w-3 h-3" /> Shipped</span>
                    <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-3 h-3" /> Delivered</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 h-full w-2/3 rounded-full" />
                  </div>
                </div>

                {/* Order Footer */}
                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-slate-400">Total Paid:</span>
                  <span className="text-sm font-extrabold text-white">${order.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-500">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-700" />
              <p className="text-sm font-semibold text-slate-400">No past orders found</p>
              <p className="text-xs text-slate-500 mt-1">Once you complete a purchase, your orders will show up here.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
