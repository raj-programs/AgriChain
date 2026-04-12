export const fraudReports = [
  { id: 'FR-001', type: 'Fake Listing', reporterId: 2, reporter: 'FreshMart Pvt Ltd', reported: 'Unknown Farmer', description: 'Listing photos appear to be from internet, not actual farm.', date: '2025-04-08', severity: 'High', status: 'Under Review' },
  { id: 'FR-002', type: 'Non-Delivery', reporterId: 5, reporter: 'Green Grocers', reported: 'Shyam Lal', description: 'Paid for order but no delivery after 15 days.', date: '2025-04-05', severity: 'Medium', status: 'Resolved' },
  { id: 'FR-003', type: 'Quality Mismatch', reporterId: 2, reporter: 'Metro Foods', reported: 'Dilip Verma', description: 'Received inferior quality compared to listing photos.', date: '2025-04-03', severity: 'Low', status: 'Submitted' },
];

let nextNum = 4;
export function getNextId() { return `FR-${String(nextNum++).padStart(3, '0')}`; }
