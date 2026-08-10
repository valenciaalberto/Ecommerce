import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ProductGrid } from './components/products/ProductGrid';
import { FilterSidebar } from './components/products/FilterSidebar';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderHistoryModal } from './components/orders/OrderHistoryModal';
import { AiTechAdvisor } from './components/ai/AiTechAdvisor';
import { INITIAL_PRODUCTS } from './data/products';
import { Product, Category, FilterOptions, CartItem, Order, Review } from './types';
import { Sparkles, Shield, Cpu, Zap, ArrowRight, Layers, Tag } from 'lucide-react';

const CATEGORIES: Category[] = [
  'All',
  'Laptops & PCs',
  'Smartphones & Tablets',
  'Audio & Headphones',
  'Wearables & Smart Home',
  'Gaming & Accessories',
  'Cameras & Drones'
];

export default function App() {
  // Products & Reviews State
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'rev-1',
      productId: 'prod-1',
      userName: 'Marcus Sterling',
      rating: 5,
      comment: 'The M3 Max chip renders 4K video faster than anything I have ever tested. Display brightness is unbelievable.',
      date: '2026-08-01'
    },
    {
      id: 'rev-2',
      productId: 'prod-2',
      userName: 'Elena Rostova',
      rating: 5,
      comment: 'Active noise cancellation is whisper quiet during long haul flights. Battery lasts well over 30 hours.',
      date: '2026-08-04'
    }
  ]);

  // Cart State with LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('techvault_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('techvault_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Orders State with LocalStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('techvault_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('techvault_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Filter State
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'All',
    brand: 'All',
    minPrice: 0,
    maxPrice: 5000,
    minRating: 0,
    searchQuery: '',
    sortBy: 'featured',
    inStockOnly: false
  });

  // UI Modal States
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Available Brands list
  const brands = useMemo(() => {
    return Array.from(new Set(products.map(p => p.brand))).sort();
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.category !== 'All' && product.category !== filters.category) return false;
      if (filters.brand !== 'All' && product.brand !== filters.brand) return false;
      if (product.price > filters.maxPrice) return false;
      if (product.rating < filters.minRating) return false;
      if (filters.inStockOnly && !product.inStock) return false;
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesTag = product.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesCat && !matchesTag) return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, filters]);

  // Cart Operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => setCart([]);

  const handlePlaceOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: 'processing'
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
  };

  const handleAddReview = (productId: string, newRev: Omit<Review, 'id' | 'productId' | 'date'>) => {
    const created: Review = {
      ...newRev,
      id: 'rev-' + Date.now(),
      productId,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [created, ...prev]);
  };

  const resetFilters = () => {
    setFilters({
      category: 'All',
      brand: 'All',
      minPrice: 5000,
      maxPrice: 5000,
      minRating: 0,
      searchQuery: '',
      sortBy: 'featured',
      inStockOnly: false
    });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Header */}
      <Header 
        categories={CATEGORIES}
        filters={filters}
        setFilters={setFilters}
        cartCount={totalCartCount}
        wishlistCount={0}
        ordersCount={orders.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
        onToggleMobileFilters={() => setIsMobileFiltersOpen(true)}
      />

      {/* Hero Banner Section (Geometric Balance Theme) */}
      <section className="relative overflow-hidden bg-slate-900 py-10 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-px bg-slate-800 border border-slate-800">
          
          {/* Main Hero Column */}
          <div className="col-span-12 lg:col-span-8 bg-slate-900 p-6 sm:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-blue-500 font-mono text-xs uppercase tracking-widest font-bold">
                FEATURED RELEASE // Q4 2026 ARCHITECTURE
              </span>
              <h1 className="text-4xl sm:text-6xl font-black leading-none tracking-tight text-white uppercase">
                TECH<span className="text-blue-500">VAULT</span> PRO <br />
                HARDWARE MATRIX
              </h1>
              <p className="text-slate-400 max-w-xl text-sm sm:text-base leading-relaxed">
                Next-generation mobile workstation computing, 4K OLED display displays, and custom silicon. Deployed with Express 5 SPA and Firebase AppHosting.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={() => setFilters(f => ({ ...f, category: 'Laptops & PCs' }))}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-8 py-4 rounded-sm transition-colors uppercase tracking-wider font-mono flex items-center gap-2"
                >
                  <span>EXPLORE HARDWARE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsAiAdvisorOpen(true)}
                  className="border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs px-8 py-4 rounded-sm transition-colors uppercase tracking-wider font-mono flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>AI SPEC ADVISOR</span>
                </button>
              </div>
            </div>

            {/* Spec Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800">
              <div className="bg-slate-800/50 p-4 rounded-sm border border-slate-800">
                <span className="block text-blue-500 text-[10px] font-mono mb-1 font-bold">01 / PROCESSING</span>
                <div className="text-xl font-bold font-mono text-white">M3 MAX 16-CORE</div>
                <div className="text-[10px] text-slate-500 uppercase mt-1 font-mono">38-Core GPU Engine</div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-sm border border-slate-800">
                <span className="block text-blue-500 text-[10px] font-mono mb-1 font-bold">02 / DISPLAY</span>
                <div className="text-xl font-bold font-mono text-white">120Hz Liquid Retina</div>
                <div className="text-[10px] text-slate-500 uppercase mt-1 font-mono">Extreme Dynamic Range</div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-sm border border-slate-800">
                <span className="block text-blue-500 text-[10px] font-mono mb-1 font-bold">03 / APPHOSTING</span>
                <div className="text-xl font-bold font-mono text-white">EXPRESS 5 SPA</div>
                <div className="text-[10px] text-slate-500 uppercase mt-1 font-mono">Port 8080 // Container</div>
              </div>
            </div>
          </div>

          {/* System Deployment Side Card */}
          <div className="col-span-12 lg:col-span-4 bg-slate-900 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest mb-4 flex justify-between text-slate-300">
                <span>SYSTEM DEPLOYMENT INFO</span>
                <span className="text-blue-500 text-[10px]">APPHOSTING</span>
              </h2>

              <div className="border border-blue-500/30 bg-blue-500/5 rounded-sm p-4 font-mono text-xs space-y-2 text-slate-400">
                <div className="flex justify-between"><span>APP_NAME:</span> <span className="text-white font-bold">techvault-applet</span></div>
                <div className="flex justify-between"><span>HOSTING:</span> <span className="text-white font-bold">Firebase AppHosting</span></div>
                <div className="flex justify-between"><span>INSTANCES:</span> <span className="text-white font-bold">0 - 2 (Dynamic)</span></div>
                <div className="flex justify-between"><span>RESOURCES:</span> <span className="text-white font-bold">1 CPU / 1024 MiB</span></div>
                <div className="flex justify-between"><span>RUNTIME:</span> <span className="text-white font-bold">Express 5 + React</span></div>
                <div className="flex justify-between"><span>PORT:</span> <span className="text-white font-bold">8080</span></div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] uppercase font-bold text-slate-300">SERVER STATUS // OPTIMAL</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Catalog Main View */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        <div className="flex gap-8">
          
          {/* Sidebar */}
          <FilterSidebar 
            categories={CATEGORIES}
            brands={brands}
            filters={filters}
            setFilters={setFilters}
            onReset={resetFilters}
            isOpenMobile={isMobileFiltersOpen}
            onCloseMobile={() => setIsMobileFiltersOpen(false)}
          />

          {/* Grid */}
          <ProductGrid 
            products={filteredProducts}
            filters={filters}
            setFilters={setFilters}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onResetFilters={resetFilters}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick View Modal */}
      <ProductDetailModal 
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onAddReview={handleAddReview}
        reviews={reviews}
      />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Orders History Modal */}
      <OrderHistoryModal 
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />

      {/* AI Assistant Modal */}
      <AiTechAdvisor 
        isOpen={isAiAdvisorOpen}
        onClose={() => setIsAiAdvisorOpen(false)}
        products={products}
        onSelectProduct={(p) => {
          setIsAiAdvisorOpen(false);
          setQuickViewProduct(p);
        }}
      />

    </div>
  );
}
