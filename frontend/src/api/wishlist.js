import client from './client';

export const wishlistAPI = {
  get: () =>
    client.get('/wishlist').then(r => r.data),

  add: (cropId) =>
    client.post('/wishlist', { cropId }).then(r => r.data),

  remove: (cropId) =>
    client.delete(`/wishlist/${cropId}`).then(r => r.data),
};
