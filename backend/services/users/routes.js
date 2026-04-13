import { Router } from 'express';
import { users } from '../auth/mockUsers.js';
import { verifyToken, requireRole } from '../../middleware/auth.js';

const router = Router();

// GET /api/users — admin only
router.get('/', verifyToken, requireRole('admin'), (req, res) => {
  const { role, search } = req.query;
  let list = users.map(u => {
    const { password: _, ...safe } = u;
    return safe;
  });

  if (role && role !== 'All') list = list.filter(u => u.role.toLowerCase() === role.toLowerCase() || u.role === role);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }

  res.json(list);
});

// GET /api/users/:id
router.get('/:id', verifyToken, requireRole('admin'), (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  const { password: _, ...safe } = user;
  res.json(safe);
});

// PUT /api/users/:id/status
router.put('/:id/status', verifyToken, requireRole('admin'), (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found.' });

  if (req.body.verified !== undefined) user.verified = req.body.verified;
  if (req.body.status) {
    user.verified = req.body.status === 'Verified';
    user.blocked = req.body.status === 'Blocked';
  }

  const { password: _, ...safe } = user;
  res.json(safe);
});

export default router;
