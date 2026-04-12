import client from './client';

export const cartAPI = {
  get: () =>
    client.get('/cart').then(r => r.data),

  addItem: (cropId, quantity) =>
    client.post('/cart', { cropId, quantity }).then(r => r.data),

  updateItem: (id, quantity) =>
    client.put(`/cart/${id}`, { quantity }).then(r => r.data),

  removeItem: (id) =>
    client.delete(`/cart/${id}`).then(r => r.data),

  clear: () =>
    client.delete('/cart').then(r => r.data),
};
