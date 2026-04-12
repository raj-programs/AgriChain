export const crops = [
  { id: 1, name: 'Basmati Rice', category: 'Grains', price: 42, unit: 'kg', quantity: 500, farmerId: 1, farmer: 'Rajesh Kumar', location: 'Punjab', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', rating: 4.8, reviews: 124, available: true, organic: true, description: 'Premium quality long-grain basmati rice, freshly harvested from Punjab fields.', approvalStatus: 'Approved', views: 156, enquiries: 12 },
  { id: 2, name: 'Alphonso Mango', category: 'Fruits', price: 120, unit: 'kg', quantity: 200, farmerId: 4, farmer: 'Suresh Patil', location: 'Maharashtra', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80', rating: 4.9, reviews: 89, available: true, organic: false, description: 'World-famous Alphonso mangoes with rich aroma and sweet taste.', approvalStatus: 'Approved', views: 203, enquiries: 18 },
  { id: 3, name: 'Fresh Tomatoes', category: 'Vegetables', price: 28, unit: 'kg', quantity: 300, farmerId: 6, farmer: 'Anita Sharma', location: 'Karnataka', image: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=400&q=80', rating: 4.5, reviews: 67, available: true, organic: true, description: 'Farm-fresh juicy tomatoes, harvested daily for maximum freshness.', approvalStatus: 'Approved', views: 98, enquiries: 7 },
  { id: 4, name: 'Wheat Flour', category: 'Grains', price: 35, unit: 'kg', quantity: 1000, farmerId: 1, farmer: 'Vikram Singh', location: 'Haryana', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80', rating: 4.6, reviews: 201, available: true, organic: false, description: 'Stone-ground whole wheat flour, rich in fiber and nutrients.', approvalStatus: 'Approved', views: 145, enquiries: 15 },
  { id: 5, name: 'Banana', category: 'Fruits', price: 45, unit: 'dozen', quantity: 150, farmerId: 1, farmer: 'Priya Nair', location: 'Kerala', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80', rating: 4.4, reviews: 56, available: true, organic: true, description: 'Naturally ripened bananas from Kerala plantations.', approvalStatus: 'Approved', views: 87, enquiries: 5 },
  { id: 6, name: 'Onion', category: 'Vegetables', price: 22, unit: 'kg', quantity: 800, farmerId: 4, farmer: 'Manoj Desai', location: 'Maharashtra', image: 'https://images.unsplash.com/photo-1518977676405-d6a6d35d2e1a?w=400&q=80', rating: 4.3, reviews: 143, available: true, organic: false, description: 'Fresh red onions directly from Nashik farms.', approvalStatus: 'Approved', views: 134, enquiries: 10 },
  { id: 7, name: 'Groundnut', category: 'Grains', price: 65, unit: 'kg', quantity: 400, farmerId: 1, farmer: 'Ramesh Patel', location: 'Gujarat', image: 'https://images.unsplash.com/photo-1567653418944-75e8ae68b636?w=400&q=80', rating: 4.7, reviews: 78, available: true, organic: true, description: 'High-quality groundnuts, ideal for oil extraction and snacking.', approvalStatus: 'Approved', views: 112, enquiries: 9 },
  { id: 8, name: 'Spinach', category: 'Vegetables', price: 18, unit: 'kg', quantity: 100, farmerId: 6, farmer: 'Lakshmi Devi', location: 'Tamil Nadu', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80', rating: 4.6, reviews: 45, available: false, organic: true, description: 'Fresh organic spinach, packed with iron and vitamins.', approvalStatus: 'Pending', views: 45, enquiries: 3 },
  { id: 9, name: 'Turmeric', category: 'Spices', price: 180, unit: 'kg', quantity: 250, farmerId: 1, farmer: 'Venkat Rao', location: 'Andhra Pradesh', image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80', rating: 4.9, reviews: 92, available: true, organic: true, description: 'Pure Erode turmeric with high curcumin content.', approvalStatus: 'Approved', views: 178, enquiries: 14 },
  { id: 10, name: 'Green Chilli', category: 'Vegetables', price: 55, unit: 'kg', quantity: 180, farmerId: 1, farmer: 'Shyam Lal', location: 'Rajasthan', image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&q=80', rating: 4.4, reviews: 38, available: true, organic: false, description: 'Fiery green chillies for that perfect spice kick.', approvalStatus: 'Approved', views: 67, enquiries: 4 },
  { id: 11, name: 'Potato', category: 'Vegetables', price: 20, unit: 'kg', quantity: 2000, farmerId: 1, farmer: 'Dilip Verma', location: 'Uttar Pradesh', image: 'https://images.unsplash.com/photo-1518977676405-d6a6d35d2e1a?w=400&q=80', rating: 4.2, reviews: 310, available: true, organic: false, description: 'Fresh potatoes from the fertile plains of Uttar Pradesh.', approvalStatus: 'Approved', views: 189, enquiries: 20 },
  { id: 12, name: 'Sugarcane Jaggery', category: 'Processed', price: 90, unit: 'kg', quantity: 600, farmerId: 6, farmer: 'Arun Nikam', location: 'Karnataka', image: 'https://images.unsplash.com/photo-1607920592519-bab15d97ab0e?w=400&q=80', rating: 4.8, reviews: 61, available: true, organic: true, description: 'Traditional organic jaggery made from fresh sugarcane juice.', approvalStatus: 'Approved', views: 95, enquiries: 8 },
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

let nextId = crops.length + 1;
export function getNextId() { return nextId++; }
