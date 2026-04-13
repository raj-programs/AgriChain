import bcrypt from 'bcryptjs';

const hashedPassword = bcrypt.hashSync('password123', 10);

export const users = [
  { id: 1, name: 'Rajesh Kumar', email: 'farmer@agrichain.com', password: hashedPassword, role: 'farmer', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', location: 'Punjab', phone: '+91 98765 43210', verified: true, joined: '2024-10-12', bio: '' },
  { id: 2, name: 'FreshMart Pvt Ltd', email: 'buyer@agrichain.com', password: hashedPassword, role: 'buyer', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', location: 'Mumbai', phone: '+91 99876 54321', verified: true, joined: '2024-11-05', bio: '' },
  { id: 3, name: 'AgriChain Admin', email: 'admin@agrichain.com', password: hashedPassword, role: 'admin', avatar: 'https://randomuser.me/api/portraits/men/67.jpg', location: 'Delhi', phone: '+91 99988 77766', verified: true, joined: '2024-09-01', bio: '' },
  { id: 4, name: 'Suresh Patil', email: 'suresh@mail.com', password: hashedPassword, role: 'farmer', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', location: 'Maharashtra', phone: '+91 98765 11111', verified: false, joined: '2025-01-20', bio: '' },
  { id: 5, name: 'Green Grocers', email: 'greengrocer@mail.com', password: hashedPassword, role: 'buyer', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', location: 'Bangalore', phone: '+91 98765 22222', verified: false, joined: '2025-02-14', bio: '' },
  { id: 6, name: 'Anita Sharma', email: 'anita@mail.com', password: hashedPassword, role: 'farmer', avatar: 'https://randomuser.me/api/portraits/women/28.jpg', location: 'Karnataka', phone: '+91 98765 33333', verified: true, joined: '2025-03-01', bio: '' },
];
