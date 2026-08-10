import React, { useState } from 'react';
import { Product, Review } from '../../types';
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw, Cpu, MessageSquare } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onAddReview: (productId: string, review: Omit<Review, 'id' | 'productId' | 'date'>) => void;
  reviews: Review[];
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onAddReview,
  reviews
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');
  const [newReviewer, setNewReviewer] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const productReviews = reviews.filter(r => r.productId === product.id);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewer || !newComment) return;
    onAddReview(product.id, {
      userName: newReviewer,
      rating: newRating,
      comment: newComment
    });
    setNewReviewer('');
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col my-auto text-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white p-2 rounded-xl border border-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scroll Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          
          {/* Top Section: Media & Primary Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[4/3] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-cyan-500/90 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-full">
                  {product.brand}
                </div>
              </div>
              
              {/* Value Props Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-slate-400">
                <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/80 flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>2 Year Warranty</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/80 flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-blue-400" />
                  <span>Free Express</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/80 flex flex-col items-center gap-1">
                  <RefreshCw className="w-4 h-4 text-emerald-400" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">{product.category}</span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1 leading-tight">{product.name}</h1>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="font-bold text-slate-100">{product.rating}</span>
                <span className="text-slate-400">({product.reviewCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-white">${product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">${product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium mt-0.5">
                    <Check className="w-3.5 h-3.5" /> In stock and ready to ship
                  </p>
                </div>

                {/* Quantity selector */}
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-xl p-1">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-7 h-7 text-slate-300 hover:text-white font-bold rounded-lg hover:bg-slate-800"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-xs">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-7 h-7 text-slate-300 hover:text-white font-bold rounded-lg hover:bg-slate-800"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Add to Cart CTA */}
              <button
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm py-3.5 rounded-xl transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add {quantity} to Cart - ${(product.price * quantity).toLocaleString()}</span>
              </button>
            </div>
          </div>

          {/* Bottom Tabs: Tech Specs & Reviews */}
          <div className="border-t border-slate-800 pt-6">
            <div className="flex items-center gap-4 border-b border-slate-800 pb-3 mb-4">
              <button
                onClick={() => setActiveTab('specs')}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider pb-1 transition ${
                  activeTab === 'specs' 
                    ? 'text-cyan-400 border-b-2 border-cyan-400' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-4 h-4" /> Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider pb-1 transition ${
                  activeTab === 'reviews' 
                    ? 'text-cyan-400 border-b-2 border-cyan-400' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" /> Verified Reviews ({productReviews.length})
              </button>
            </div>

            {/* Tab 1: Specs Table */}
            {activeTab === 'specs' && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800 text-xs">
                {product.specs && product.specs.length > 0 ? (
                  product.specs.map((spec, i) => (
                    <div key={i} className="flex p-3">
                      <span className="w-1/3 text-slate-400 font-semibold">{spec.label}</span>
                      <span className="w-2/3 text-slate-100 font-mono">{spec.value}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-slate-400">Standard manufacturer tech specifications apply.</div>
                )}
              </div>
            )}

            {/* Tab 2: Reviews Section */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Submit review form */}
                <form onSubmit={handleSubmitReview} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-200">Write a Customer Review</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={newReviewer} 
                      onChange={e => setNewReviewer(e.target.value)}
                      required
                      className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-100"
                    />
                    <select
                      value={newRating}
                      onChange={e => setNewRating(Number(e.target.value))}
                      className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-100"
                    >
                      <option value={5}>5 Stars - Excellent</option>
                      <option value={4}>4 Stars - Very Good</option>
                      <option value={3}>3 Stars - Average</option>
                      <option value={2}>2 Stars - Needs Improvement</option>
                      <option value={1}>1 Star - Poor</option>
                    </select>
                  </div>
                  <textarea 
                    placeholder="Share your experience with this tech product..."
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    required
                    rows={2}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-100"
                  />
                  <button 
                    type="submit" 
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition"
                  >
                    Post Review
                  </button>
                </form>

                {/* Reviews List */}
                <div className="space-y-3">
                  {productReviews.length > 0 ? (
                    productReviews.map(r => (
                      <div key={r.id} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-200">{r.userName}</span>
                          <span className="text-slate-500">{r.date}</span>
                        </div>
                        <div className="flex text-amber-400">
                          {Array.from({ length: r.rating }).map((_, idx) => (
                            <Star key={idx} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed pt-1">{r.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-400 p-4 text-center">Be the first to leave a review for this electronics item!</div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
