import client from './client';

export const reportsAPI = {
  getAll: () =>
    client.get('/reports').then(r => r.data),

  create: (data) =>
    client.post('/reports', data).then(r => r.data),

  updateStatus: (id, status) =>
    client.put(`/reports/${id}/status`, { status }).then(r => r.data),
};
