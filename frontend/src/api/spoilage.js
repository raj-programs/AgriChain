import client from './client';

export const spoilageAPI = {
  getAll: () =>
    client.get('/spoilage').then(r => r.data),

  create: (data) =>
    client.post('/spoilage', data).then(r => r.data),

  updateStatus: (id, status) =>
    client.put(`/spoilage/${id}/status`, { status }).then(r => r.data),
};
