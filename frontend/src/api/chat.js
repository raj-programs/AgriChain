import client from './client';

export const chatAPI = {
  getContacts: () =>
    client.get('/chat/contacts').then(r => r.data),

  getMessages: (contactUserId) =>
    client.get(`/chat/messages/${contactUserId}`).then(r => r.data),

  sendMessage: (contactUserId, text) =>
    client.post(`/chat/messages/${contactUserId}`, { text }).then(r => r.data),
};
