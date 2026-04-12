import client from './client';

export const ordersAPI = {
  getFarmerOrders: (status) =>
    client.get('/orders/farmer', { params: { status } }).then(r => r.data),

  getBuyerOrders: (status) =>
    client.get('/orders/buyer', { params: { status } }).then(r => r.data),

  getAllOrders: (status) =>
    client.get('/orders/all', { params: { status } }).then(r => r.data),

  placeOrder: (items, paymentMethod) =>
    client.post('/orders', { items, paymentMethod }).then(r => r.data),

  updateStatus: (id, status) =>
    client.put(`/orders/${id}/status`, { status }).then(r => r.data),
};
