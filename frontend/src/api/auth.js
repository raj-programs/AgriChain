import client from './client';

export const authAPI = {
  login: (email, password, role) =>
    client.post('/auth/login', { email, password, role }).then(r => r.data),

  register: (data) =>
    client.post('/auth/register', data).then(r => r.data),

  getProfile: () =>
    client.get('/auth/me').then(r => r.data),

  updateProfile: (data) =>
    client.put('/auth/profile', data).then(r => r.data),

  changePassword: (currentPassword, newPassword) =>
    client.put('/auth/password', { currentPassword, newPassword }).then(r => r.data),
};
