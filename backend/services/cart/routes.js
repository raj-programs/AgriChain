import { Router } from 'express';
import { carts, getNextId } from './data.js';
import { crops } from '../crops/data.js';
import { verifyToken, requireRole } from '../../middleware/auth.js';

const router = Router();

// GET /api/cart
router.get('/', verifyToken, requireRole('buyer'), (req, res) => {
  const userCart = carts[req.user.id] || [];
  const enriched = userCart.map(item => {
    const crop = crops.find(c => c.id === item.cropId);
    return { ...item, crop: crop || null };
  });
  res.json(enriched);
});

// POST /api/cart
router.post('/', verifyToken, requireRole('buyer'), (req, res) => {
  const { cropId, quantity } = req.body;
  if (!cropId) return res.status(400).json({ error: 'cropId is required.' });

  if (!carts[req.user.id]) carts[req.user.id] = [];
  const existing = carts[req.user.id].find(i => i.cropId === Number(cropId));
  if (existing) {
    existing.quantity += (quantity || 1);
    const crop = crops.find(c => c.id === existing.cropId);
    return res.json({ ...existing, crop });
  }

  const item = { id: getNextId(), cropId: Number(cropId), quantity: quantity || 1 };
  carts[req.user.id].push(item);
  const crop = crops.find(c => c.id === item.cropId);
  res.status(201).json({ ...item, crop });
});

// PUT /api/cart/:id
router.put('/:id', verifyToken, requireRole('buyer'), (req, res) => {
  const userCart = carts[req.user.id] || [];
  const item = userCart.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Cart item not found.' });

  if (req.body.quantity !== undefined) item.quantity = Math.max(1, Number(req.body.quantity));
  const crop = crops.find(c => c.id === item.cropId);
  res.json({ ...item, crop });
});

// DELETE /api/cart/:id
router.delete('/:id', verifyToken, requireRole('buyer'), (req, res) => {
  if (!carts[req.user.id]) return res.status(404).json({ error: 'Cart item not found.' });
  const idx = carts[req.user.id].findIndex(i => i.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Cart item not found.' });

  carts[req.user.id].splice(idx, 1);
  res.json({ message: 'Item removed from cart.' });
});

// DELETE /api/cart — clear entire cart
router.delete('/', verifyToken, requireRole('buyer'), (req, res) => {
  carts[req.user.id] = [];
  res.json({ message: 'Cart cleared.' });
});

export default router;
