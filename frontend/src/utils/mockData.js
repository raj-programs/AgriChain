/* ============================================
   AgriChain - Mock Data
   ============================================ */

export const crops = [
  { id: 1, name: 'Basmati Rice', category: 'Grains', price: 42, unit: 'kg', quantity: 500, farmer: 'Rajesh Kumar', location: 'Punjab', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', rating: 4.8, reviews: 124, available: true, organic: true, description: 'Premium quality long-grain basmati rice, freshly harvested from Punjab fields.' },
  { id: 2, name: 'Alphonso Mango', category: 'Fruits', price: 120, unit: 'kg', quantity: 200, farmer: 'Suresh Patil', location: 'Maharashtra', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80', rating: 4.9, reviews: 89, available: true, organic: false, description: 'World-famous Alphonso mangoes with rich aroma and sweet taste.' },
  { id: 3, name: 'Fresh Tomatoes', category: 'Vegetables', price: 28, unit: 'kg', quantity: 300, farmer: 'Anita Sharma', location: 'Karnataka', image: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=400&q=80', rating: 4.5, reviews: 67, available: true, organic: true, description: 'Farm-fresh juicy tomatoes, harvested daily for maximum freshness.' },
  { id: 4, name: 'Wheat Flour', category: 'Grains', price: 35, unit: 'kg', quantity: 1000, farmer: 'Vikram Singh', location: 'Haryana', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80', rating: 4.6, reviews: 201, available: true, organic: false, description: 'Stone-ground whole wheat flour, rich in fiber and nutrients.' },
  { id: 5, name: 'Banana', category: 'Fruits', price: 45, unit: 'dozen', quantity: 150, farmer: 'Priya Nair', location: 'Kerala', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80', rating: 4.4, reviews: 56, available: true, organic: true, description: 'Naturally ripened bananas from Kerala plantations.' },
  { id: 6, name: 'Onion', category: 'Vegetables', price: 22, unit: 'kg', quantity: 800, farmer: 'Manoj Desai', location: 'Maharashtra', image: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400&q=80', rating: 4.3, reviews: 143, available: true, organic: false, description: 'Fresh red onions directly from Nashik farms.' },
  { id: 7, name: 'Groundnut', category: 'Grains', price: 65, unit: 'kg', quantity: 400, farmer: 'Ramesh Patel', location: 'Gujarat', image: 'https://images.unsplash.com/photo-1567653418944-75e8ae68b636?w=400&q=80', rating: 4.7, reviews: 78, available: true, organic: true, description: 'High-quality groundnuts, ideal for oil extraction and snacking.' },
  { id: 8, name: 'Spinach', category: 'Vegetables', price: 18, unit: 'kg', quantity: 100, farmer: 'Lakshmi Devi', location: 'Tamil Nadu', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80', rating: 4.6, reviews: 45, available: false, organic: true, description: 'Fresh organic spinach, packed with iron and vitamins.' },
  { id: 9, name: 'Turmeric', category: 'Spices', price: 180, unit: 'kg', quantity: 250, farmer: 'Venkat Rao', location: 'Andhra Pradesh', image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80', rating: 4.9, reviews: 92, available: true, organic: true, description: 'Pure Erode turmeric with high curcumin content.' },
  { id: 10, name: 'Green Chilli', category: 'Vegetables', price: 55, unit: 'kg', quantity: 180, farmer: 'Shyam Lal', location: 'Rajasthan', image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&q=80', rating: 4.4, reviews: 38, available: true, organic: false, description: 'Fiery green chillies for that perfect spice kick.' },
  { id: 11, name: 'Potato', category: 'Vegetables', price: 20, unit: 'kg', quantity: 2000, farmer: 'Dilip Verma', location: 'Uttar Pradesh', image: 'https://images.unsplash.com/photo-1518977676405-d6a6d35d2e1a?w=400&q=80', rating: 4.2, reviews: 310, available: true, organic: false, description: 'Fresh potatoes from the fertile plains of Uttar Pradesh.' },
  { id: 12, name: 'Sugarcane Jaggery', category: 'Processed', price: 90, unit: 'kg', quantity: 600, farmer: 'Arun Nikam', location: 'Karnataka', image: 'https://images.unsplash.com/photo-1607920592519-bab15d97ab0e?w=400&q=80', rating: 4.8, reviews: 61, available: true, organic: true, description: 'Traditional organic jaggery made from fresh sugarcane juice.' },
];

export const categories = [
  { id: 'all', label: 'All', icon: '🌾' },
  { id: 'Fruits', label: 'Fruits', icon: '🍎' },
  { id: 'Vegetables', label: 'Vegetables', icon: '🥦' },
  { id: 'Grains', label: 'Grains', icon: '🌾' },
  { id: 'Spices', label: 'Spices', icon: '🌶️' },
  { id: 'Processed', label: 'Processed', icon: '🫙' },
];

export const farmers = [
  { id: 1, name: 'Rajesh Kumar', location: 'Punjab', crops: 8, rating: 4.8, image: 'https://randomuser.me/api/portraits/men/32.jpg', verified: true, yearsActive: 5 },
  { id: 2, name: 'Suresh Patil', location: 'Maharashtra', crops: 5, rating: 4.9, image: 'https://randomuser.me/api/portraits/men/45.jpg', verified: true, yearsActive: 8 },
  { id: 3, name: 'Anita Sharma', location: 'Karnataka', crops: 12, rating: 4.5, image: 'https://randomuser.me/api/portraits/women/28.jpg', verified: true, yearsActive: 3 },
  { id: 4, name: 'Vikram Singh', location: 'Haryana', crops: 6, rating: 4.6, image: 'https://randomuser.me/api/portraits/men/67.jpg', verified: false, yearsActive: 6 },
];

export const testimonials = [
  { id: 1, name: 'Arjun Mehta', role: 'Wholesale Buyer', text: 'AgriChain cut out 3 middlemen for me. I now get fresh produce directly from farmers at 40% lower cost. Revolutionary platform!', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', rating: 5 },
  { id: 2, name: 'Sunita Devi', role: 'Farmer, Bihar', text: 'Before AgriChain, I earned ₹8/kg for my wheat. Now I earn ₹35/kg selling directly. My family income tripled in one season!', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', rating: 5 },
  { id: 3, name: 'Rohit Traders', role: 'Restaurant Chain', text: 'Consistent quality, transparent pricing, and real-time tracking. We\'ve sourced 50+ tons of vegetables through AgriChain this year.', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', rating: 5 },
];

export const stats = [
  { label: 'Active Farmers', value: '2,400+', icon: '👨‍🌾' },
  { label: 'Verified Buyers', value: '890+', icon: '🏪' },
  { label: 'Crops Listed', value: '15,000+', icon: '🌾' },
  { label: 'States Covered', value: '18', icon: '🗺️' },
];

export const farmerOrders = [
  { id: 'ORD-001', buyer: 'FreshMart Pvt Ltd', crop: 'Basmati Rice', quantity: 200, amount: 8400, status: 'Delivered', date: '2025-04-01' },
  { id: 'ORD-002', buyer: 'Green Grocers', crop: 'Wheat', quantity: 150, amount: 5250, status: 'Processing', date: '2025-04-05' },
  { id: 'ORD-003', buyer: 'Metro Foods', crop: 'Basmati Rice', quantity: 300, amount: 12600, status: 'Pending', date: '2025-04-08' },
  { id: 'ORD-004', buyer: 'SuperMart', crop: 'Groundnut', quantity: 100, amount: 6500, status: 'Shipped', date: '2025-04-09' },
];

export const buyerOrders = [
  { id: 'ORD-101', farmer: 'Rajesh Kumar', crop: 'Basmati Rice', quantity: 50, amount: 2100, status: 'Delivered', date: '2025-04-01', tracking: 'TRCK89201' },
  { id: 'ORD-102', farmer: 'Suresh Patil', crop: 'Alphonso Mango', quantity: 30, amount: 3600, status: 'Shipped', date: '2025-04-06', tracking: 'TRCK89312' },
  { id: 'ORD-103', farmer: 'Anita Sharma', crop: 'Fresh Tomatoes', quantity: 20, amount: 560, status: 'Processing', date: '2025-04-10', tracking: 'TRCK89456' },
];

export const adminUsers = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@mail.com', role: 'Farmer', status: 'Verified', joined: '2024-10-12', crops: 8 },
  { id: 2, name: 'FreshMart Pvt Ltd', email: 'freshmart@mail.com', role: 'Buyer', status: 'Verified', joined: '2024-11-05', orders: 34 },
  { id: 3, name: 'Suresh Patil', email: 'suresh@mail.com', role: 'Farmer', status: 'Pending', joined: '2025-01-20', crops: 5 },
  { id: 4, name: 'Green Grocers', email: 'greengrocer@mail.com', role: 'Buyer', status: 'Blocked', joined: '2025-02-14', orders: 2 },
  { id: 5, name: 'Anita Sharma', email: 'anita@mail.com', role: 'Farmer', status: 'Verified', joined: '2025-03-01', crops: 12 },
];

export const spoilageReports = [
  { id: 1, crop: 'Tomatoes', quantity: 80, reason: 'Heavy rainfall', date: '2025-03-28', status: 'Submitted', value: 2240 },
  { id: 2, crop: 'Spinach', quantity: 30, reason: 'Transportation delay', date: '2025-04-02', status: 'Under Review', value: 540 },
];

export const chatMessages = [
  { id: 1, from: 'other', name: 'Rajesh Kumar', text: 'Hello, I have 200kg of Basmati Rice available. Are you interested?', time: '10:32 AM' },
  { id: 2, from: 'me', text: 'Yes, what is your price per kg?', time: '10:34 AM' },
  { id: 3, from: 'other', name: 'Rajesh Kumar', text: 'I can offer ₹40/kg for bulk order above 100kg.', time: '10:35 AM' },
  { id: 4, from: 'me', text: 'That sounds good. Can you ship to Mumbai?', time: '10:38 AM' },
  { id: 5, from: 'other', name: 'Rajesh Kumar', text: 'Yes, shipping is available. Delivery in 3-4 days.', time: '10:39 AM' },
];

export const cartItems = [
  { id: 1, crop: crops[0], quantity: 50 },
  { id: 2, crop: crops[1], quantity: 20 },
  { id: 3, crop: crops[2], quantity: 30 },
];

export const wishlistItems = [crops[3], crops[6], crops[8]];

export const notifications = [
  { id: 1, type: 'order', message: 'New order received for Basmati Rice (200kg)', time: '2 min ago', read: false },
  { id: 2, type: 'payment', message: 'Payment of ₹8,400 credited to your account', time: '1 hr ago', read: false },
  { id: 3, type: 'info', message: 'Your crop listing was approved by admin', time: '3 hrs ago', read: true },
  { id: 4, type: 'chat', message: 'New message from FreshMart Pvt Ltd', time: '1 day ago', read: true },
];

export const teamMembers = [
  { name: 'Priya Menon', role: 'CEO & Co-Founder', bio: 'Former agri-economist with 10 years of rural development experience.', avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
  { name: 'Arjun Iyer', role: 'CTO & Co-Founder', bio: 'Full-stack engineer passionate about using tech to solve rural challenges.', avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
  { name: 'Sneha Rao', role: 'Head of Operations', bio: 'Logistics expert who built supply chains across 12 Indian states.', avatar: 'https://randomuser.me/api/portraits/women/56.jpg' },
  { name: 'Dev Kapoor', role: 'Head of Partnerships', bio: 'Connects farmers with enterprise buyers and government programs.', avatar: 'https://randomuser.me/api/portraits/men/78.jpg' },
];

export const adminStats = {
  totalUsers: 3290, totalCrops: 15400, totalOrders: 8920, totalRevenue: '₹4.2 Cr',
  pendingApprovals: 14, flaggedReports: 3, activeDisputes: 2,
};

export const analyticsData = {
  monthlyRevenue: [12000, 18500, 15200, 22000, 28000, 32000, 27500, 35000, 41000, 38000, 44000, 52000],
  months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  topCrops: [
    { name: 'Basmati Rice', sales: 4200, revenue: 176400 },
    { name: 'Wheat', sales: 3800, revenue: 133000 },
    { name: 'Alphonso Mango', sales: 1200, revenue: 144000 },
    { name: 'Groundnut', sales: 900, revenue: 58500 },
  ],
};
