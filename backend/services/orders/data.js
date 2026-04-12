export const farmerOrders = [
  { id: 'ORD-001', farmerId: 1, buyerId: 2, buyer: 'FreshMart Pvt Ltd', crop: 'Basmati Rice', quantity: 200, amount: 8400, status: 'Delivered', date: '2025-04-01' },
  { id: 'ORD-002', farmerId: 1, buyerId: 5, buyer: 'Green Grocers', crop: 'Wheat', quantity: 150, amount: 5250, status: 'Processing', date: '2025-04-05' },
  { id: 'ORD-003', farmerId: 1, buyerId: 2, buyer: 'Metro Foods', crop: 'Basmati Rice', quantity: 300, amount: 12600, status: 'Pending', date: '2025-04-08' },
  { id: 'ORD-004', farmerId: 1, buyerId: 2, buyer: 'SuperMart', crop: 'Groundnut', quantity: 100, amount: 6500, status: 'Shipped', date: '2025-04-09' },
];

export const buyerOrders = [
  { id: 'ORD-101', buyerId: 2, farmerId: 1, farmer: 'Rajesh Kumar', crop: 'Basmati Rice', quantity: 50, amount: 2100, status: 'Delivered', date: '2025-04-01', tracking: 'TRCK89201' },
  { id: 'ORD-102', buyerId: 2, farmerId: 4, farmer: 'Suresh Patil', crop: 'Alphonso Mango', quantity: 30, amount: 3600, status: 'Shipped', date: '2025-04-06', tracking: 'TRCK89312' },
  { id: 'ORD-103', buyerId: 2, farmerId: 6, farmer: 'Anita Sharma', crop: 'Fresh Tomatoes', quantity: 20, amount: 560, status: 'Processing', date: '2025-04-10', tracking: 'TRCK89456' },
];

let nextFarmerOrderNum = 5;
let nextBuyerOrderNum = 104;

export function getNextFarmerOrderId() { return `ORD-${String(nextFarmerOrderNum++).padStart(3, '0')}`; }
export function getNextBuyerOrderId() { return `ORD-${String(nextBuyerOrderNum++)}`; }
