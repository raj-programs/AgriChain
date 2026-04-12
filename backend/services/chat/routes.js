import { Router } from 'express';
import { contacts, messages, getNextMessageId } from './data.js';
import { verifyToken } from '../../middleware/auth.js';

const router = Router();

function getConversationKey(id1, id2) {
  return [Math.min(id1, id2), Math.max(id1, id2)].join('-');
}

// GET /api/chat/contacts
router.get('/contacts', verifyToken, (req, res) => {
  const userId = req.user.id;
  const result = contacts
    .filter(c => c.userId !== userId)
    .map(c => {
      const key = getConversationKey(userId, c.userId);
      const convMessages = messages.filter(m => m.conversationKey === key);
      const lastMsg = convMessages[convMessages.length - 1];
      const unread = convMessages.filter(m => m.receiverId === userId && !m.read).length;
      return {
        ...c,
        lastMsg: lastMsg?.text || '',
        time: lastMsg?.time || '',
        unread,
      };
    });
  res.json(result);
});

// GET /api/chat/messages/:contactUserId
router.get('/messages/:contactUserId', verifyToken, (req, res) => {
  const key = getConversationKey(req.user.id, Number(req.params.contactUserId));
  const convMessages = messages
    .filter(m => m.conversationKey === key)
    .map(m => ({
      id: m.id,
      from: m.senderId === req.user.id ? 'me' : 'other',
      name: m.senderId === req.user.id ? undefined : contacts.find(c => c.userId === m.senderId)?.name,
      text: m.text,
      time: m.time,
    }));
  res.json(convMessages);
});

// POST /api/chat/messages/:contactUserId
router.post('/messages/:contactUserId', verifyToken, (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Message text is required.' });

  const contactUserId = Number(req.params.contactUserId);
  const key = getConversationKey(req.user.id, contactUserId);
  const now = new Date();
  const msg = {
    id: getNextMessageId(),
    conversationKey: key,
    senderId: req.user.id,
    receiverId: contactUserId,
    text,
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    timestamp: now.getTime(),
  };
  messages.push(msg);

  res.status(201).json({
    id: msg.id,
    from: 'me',
    text: msg.text,
    time: msg.time,
  });
});

export default router;
