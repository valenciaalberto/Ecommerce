import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'MacBook Pro 16" M3 Max',
    brand: 'Apple',
    category: 'Laptops & PCs',
    price: 3499,
    originalPrice: 3899,
    rating: 4.9,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
    description: 'The ultimate pro laptop. Packed with the M3 Max chip, 36GB Unified Memory, Liquid Retina XDR display, and up to 22 hours of battery life.',
    specs: [
      { label: 'Processor', value: 'Apple M3 Max (16-core CPU, 40-core GPU)' },
      { label: 'Memory', value: '36GB Unified RAM' },
      { label: 'Storage', value: '1TB Superfast NVMe SSD' },
      { label: 'Display', value: '16.2" Liquid Retina XDR (3456x2234, 120Hz)' },
      { label: 'Battery', value: '100Wh, up to 22 hrs video playback' }
    ],
    inStock: true,
    isFeatured: true,
    isNewArrival: true,
    tags: ['Laptop', 'Apple', 'M3 Max', 'Pro', 'Editing']
  },
  {
    id: 'prod-2',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    brand: 'Sony',
    category: 'Audio & Headphones',
    price: 398,
    originalPrice: 449,
    rating: 4.8,
    reviewCount: 1240,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    description: 'Industry-leading noise canceling with Auto NC Optimizer, 30-hour battery, crystal clear hands-free calling, and ultra-comfortable lightweight design.',
    specs: [
      { label: 'Noise Cancellation', value: 'HD Noise Canceling Processor QN1 + V1' },
      { label: 'Battery Life', value: 'Up to 30 hours (ANC On)' },
      { label: 'Audio Codec', value: 'LDAC, AAC, SBC' },
      { label: 'Weight', value: '250g' }
    ],
    inStock: true,
    isFeatured: true,
    tags: ['Headphones', 'Audio', 'Noise Canceling', 'Wireless', 'Sony']
  },
  {
    id: 'prod-3',
    name: 'Samsung Galaxy Ultra S24 512GB',
    brand: 'Samsung',
    category: 'Smartphones & Tablets',
    price: 1299,
    originalPrice: 1419,
    rating: 4.7,
    reviewCount: 520,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80',
    description: 'Galaxy AI is here. Epic titanium shield, built-in S Pen, 200MP camera with Quad Tele System, and Snapdragon 8 Gen 3 for Galaxy.',
    specs: [
      { label: 'Display', value: '6.8" Dynamic AMOLED 2X, 120Hz' },
      { label: 'Camera', value: '200MP Main + 50MP Periscope + 12MP Ultra Wide' },
      { label: 'Chipset', value: 'Snapdragon 8 Gen 3 for Galaxy' },
      { label: 'Battery', value: '5000 mAh with 45W Fast Charging' }
    ],
    inStock: true,
    isFeatured: true,
    tags: ['Phone', 'Samsung', 'Galaxy AI', '200MP', '5G']
  },
  {
    id: 'prod-4',
    name: 'Asus ROG Swift 32" 4K OLED Gaming Monitor',
    brand: 'ASUS',
    category: 'Gaming & Accessories',
    price: 1199,
    originalPrice: 1299,
    rating: 4.9,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
    description: '32-inch 4K QD-OLED display running at buttery smooth 240Hz refresh rate with 0.03ms response time and custom heatsink for anti-burn-in performance.',
    specs: [
      { label: 'Resolution', value: '3840 x 2160 (4K UHD QD-OLED)' },
      { label: 'Refresh Rate', value: '240Hz' },
      { label: 'Response Time', value: '0.03ms GTG' },
      { label: 'HDR', value: 'DisplayHDR True Black 400' }
    ],
    inStock: true,
    isFeatured: true,
    tags: ['Monitor', 'OLED', '4K', '240Hz', 'Gaming', 'ASUS']
  },
  {
    id: 'prod-5',
    name: 'DJI Mini 4 Pro Drone Fly More Combo',
    brand: 'DJI',
    category: 'Cameras & Drones',
    price: 1099,
    originalPrice: 1159,
    rating: 4.9,
    reviewCount: 275,
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80',
    description: 'Under 249g ultra-lightweight drone with omnidirectional obstacle sensing, 4K/60fps HDR video, 20km FHD video transmission, and 34 min flight time.',
    specs: [
      { label: 'Weight', value: '< 249 g' },
      { label: 'Camera', value: '1/1.3-inch CMOS, 48MP, 4K/60fps HDR' },
      { label: 'Flight Time', value: '34 mins (Standard) / 45 mins (Plus)' },
      { label: 'Obstacle Sensing', value: 'Omnidirectional' }
    ],
    inStock: true,
    tags: ['Drone', 'DJI', '4K Camera', 'Aerial', 'Pro']
  },
  {
    id: 'prod-6',
    name: 'Apple Watch Ultra 2 Titanium',
    brand: 'Apple',
    category: 'Wearables & Smart Home',
    price: 799,
    originalPrice: 849,
    rating: 4.8,
    reviewCount: 410,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80',
    description: 'Rugged titanium case, precision dual-frequency GPS, S9 SiP with Double Tap gesture, 3000-nit display, and up to 36-hour battery.',
    specs: [
      { label: 'Case Material', value: 'Titanium (49mm)' },
      { label: 'Brightness', value: '3000 nits Always-On Retina' },
      { label: 'Water Resistance', value: '100m (EN13319 certified for diving)' },
      { label: 'Sensors', value: 'ECG, Blood Oxygen, Temperature, Dual GPS' }
    ],
    inStock: true,
    isFeatured: true,
    tags: ['Smartwatch', 'Apple Watch', 'Titanium', 'Fitness']
  },
  {
    id: 'prod-7',
    name: 'Sony Alpha A7 IV Full-Frame Mirrorless',
    brand: 'Sony',
    category: 'Cameras & Drones',
    price: 2498,
    originalPrice: 2699,
    rating: 4.9,
    reviewCount: 615,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
    description: '33MP full-frame Exmor R CMOS sensor, 4K 60p video, Real-time Eye AF for humans, animals, and birds, and 5-axis 5.5-step optical stabilization.',
    specs: [
      { label: 'Sensor', value: '33.0 MP Full-Frame Exmor R CMOS' },
      { label: 'Video', value: '4K 60p in Super 35 / 4K 30p full 7.K oversampling' },
      { label: 'Autofocus', value: '759 phase-detection points with Real-time Eye AF' },
      { label: 'Stabilization', value: '5-axis in-body image stabilization' }
    ],
    inStock: true,
    tags: ['Camera', 'Sony', 'Mirrorless', '4K', 'Photography']
  },
  {
    id: 'prod-8',
    name: 'PlayStation 5 Pro Console 2TB',
    brand: 'Sony',
    category: 'Gaming & Accessories',
    price: 699,
    rating: 4.7,
    reviewCount: 890,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=80',
    description: 'PlayStation 5 Pro featuring Spectral Super Resolution AI upscaling, upgraded GPU with 67% more Compute Units, advanced Ray Tracing, and 2TB SSD.',
    specs: [
      { label: 'GPU', value: 'Custom RDNA with 67% more CUs' },
      { label: 'Storage', value: '2TB Custom High-Speed NVMe SSD' },
      { label: 'Feature', value: 'PlayStation Spectral Super Resolution (PSSR)' },
      { label: 'Wireless', value: 'Wi-Fi 7 Ready' }
    ],
    inStock: true,
    isNewArrival: true,
    tags: ['Gaming', 'PS5 Pro', 'Console', '4K 120Hz', 'Sony']
  },
  {
    id: 'prod-9',
    name: 'Sonos Era 300 Spatial Audio Smart Speaker',
    brand: 'Sonos',
    category: 'Wearables & Smart Home',
    price: 449,
    originalPrice: 479,
    rating: 4.6,
    reviewCount: 164,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80',
    description: 'Next-level spatial audio speaker powered by Dolby Atmos with 6 strategically positioned drivers, Trueplay tuning, Wi-Fi 6, Bluetooth, and voice control.',
    specs: [
      { label: 'Audio Tech', value: 'Dolby Atmos Spatial Audio with 6 drivers' },
      { label: 'Connectivity', value: 'Wi-Fi 6, Bluetooth 5.0, AirPlay 2' },
      { label: 'Microphones', value: 'Far-field microphone array with mute switch' }
    ],
    inStock: true,
    tags: ['Speaker', 'Sonos', 'Spatial Audio', 'Smart Home', 'Dolby Atmos']
  }
];
