export const spoilageReports = [
  { id: 1, farmerId: 1, crop: 'Tomatoes', quantity: 80, reason: 'Heavy rainfall', date: '2025-03-28', status: 'Submitted', value: 2240, description: '' },
  { id: 2, farmerId: 1, crop: 'Spinach', quantity: 30, reason: 'Transportation delay', date: '2025-04-02', status: 'Under Review', value: 540, description: '' },
];

let nextId = 3;
export function getNextId() { return nextId++; }
