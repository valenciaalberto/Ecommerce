export type Category = 
  | 'All' 
  | 'Laptops & PCs' 
  | 'Smartphones & Tablets' 
  | 'Audio & Headphones' 
  | 'Wearables & Smart Home' 
  | 'Gaming & Accessories' 
  | 'Cameras & Drones';

export interface TechSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  description: string;
  specs: TechSpec[];
  inStock: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSpec?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  totalAmount: number;
  shippingAddress: ShippingAddress;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  paymentMethod: string;
}

export interface FilterOptions {
  category: Category;
  brand: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  inStockOnly: boolean;
}
