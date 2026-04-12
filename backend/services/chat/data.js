export const contacts = [
  { id: 1, userId: 1, name: 'Rajesh Kumar', role: 'Farmer', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', online: true },
  { id: 2, userId: 2, name: 'FreshMart Pvt Ltd', role: 'Buyer', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', online: false },
  { id: 3, userId: 5, name: 'Green Grocers', role: 'Buyer', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', online: true },
];

export const messages = [
  { id: 1, conversationKey: '1-2', senderId: 1, receiverId: 2, text: 'Hello, I have 200kg of Basmati Rice available. Are you interested?', time: '10:32 AM', timestamp: Date.now() - 420000 },
  { id: 2, conversationKey: '1-2', senderId: 2, receiverId: 1, text: 'Yes, what is your price per kg?', time: '10:34 AM', timestamp: Date.now() - 300000 },
  { id: 3, conversationKey: '1-2', senderId: 1, receiverId: 2, text: 'I can offer ₹40/kg for bulk order above 100kg.', time: '10:35 AM', timestamp: Date.now() - 240000 },
  { id: 4, conversationKey: '1-2', senderId: 2, receiverId: 1, text: 'That sounds good. Can you ship to Mumbai?', time: '10:38 AM', timestamp: Date.now() - 60000 },
  { id: 5, conversationKey: '1-2', senderId: 1, receiverId: 2, text: 'Yes, shipping is available. Delivery in 3-4 days.', time: '10:39 AM', timestamp: Date.now() },
];

let nextMessageId = 6;
export function getNextMessageId() { return nextMessageId++; }
