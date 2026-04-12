import client from './client';

export const settingsAPI = {
  get: () =>
    client.get('/settings').then(r => r.data),

  update: (data) =>
    client.put('/settings', data).then(r => r.data),
};
