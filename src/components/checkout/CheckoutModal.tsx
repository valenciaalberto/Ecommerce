import React, { useState } from 'react';
import { CartItem, Order, ShippingAddress } from '../../types';
import { X, ShieldCheck, CheckCircle2, CreditCard, Truck, Cpu } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onPlaceOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onPlaceOrder
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Alex Vance',
    email: 'alex.vance@techvault.io',
    address: '742 Cybernetic Tech Parkway',
    city: 'San Jose',
    postalCode: '95110',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState('Credit Card / Apple Pay');

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const totalAmount = subtotal + shipping;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setCreatedOrderId(orderId);

    onPlaceOrder({
      items,
      subtotal,
      shipping,
      discount: 0,
      totalAmount,
      shippingAddress: address,
      paymentMethod
    });

    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative text-slate-200">
        
        {/* Modal Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="font-bold text-slate-100 text-base">
              {step === 'details' ? 'Secure Express Checkout' : 'Order Confirmed!'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
            
            {/* Shipping Form */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
                <Truck className="w-4 h-4" /> Shipping Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 mb-1 block">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={address.fullName}
                    onChange={e => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={address.email}
                    onChange={e => setAddress({ ...address, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-400 mb-1 block">Street Address</label>
                  <input 
                    type="text" 
                    required 
                    value={address.address}
                    onChange={e => setAddress({ ...address, address: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">City</label>
                  <input 
                    type="text" 
                    required 
                    value={address.city}
                    onChange={e => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Postal Code</label>
                  <input 
                    type="text" 
                    required 
                    value={address.postalCode}
                    onChange={e => setAddress({ ...address, postalCode: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Payment Selection */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" /> Payment Options
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {['Credit Card / Apple Pay', 'Google Pay / Crypto'].map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-3 rounded-xl border text-left font-medium transition ${
                      paymentMethod === method
                        ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Summary */}
            <div className="bg-slate-950/90 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between text-xs">
              <div>
                <p className="text-slate-400">Total Items ({items.length})</p>
                <p className="text-lg font-extrabold text-white">${totalAmount.toLocaleString()}</p>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20"
              >
                Place Order Now
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Step */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Thank You for Your Order!</h3>
              <p className="text-xs text-slate-400 mt-1">
                Order ID: <span className="font-mono text-cyan-400 font-bold">{createdOrderId}</span>
              </p>
            </div>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              We have dispatched your hardware request to our fulfillment center. Order status is stored in your order history and synced with Firebase.
            </p>
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-6 py-2.5 rounded-xl border border-slate-700 transition"
            >
              Back to Store
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
