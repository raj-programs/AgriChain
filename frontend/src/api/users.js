import client from './client';

export const usersAPI = {
  getAll: (params) =>
    client.get('/users', { params }).then(r => r.data),

  getById: (id) =>
    client.get(`/users/${id}`).then(r => r.data),

  updateStatus: (id, status) =>
    client.put(`/users/${id}/status`, { status }).then(r => r.data),
};
