// Cart is per-user, keyed by userId
export const carts = {
  2: [
    { id: 1, cropId: 1, quantity: 50 },
    { id: 2, cropId: 2, quantity: 20 },
    { id: 3, cropId: 3, quantity: 30 },
  ],
};

let nextId = 4;
export function getNextId() { return nextId++; }
