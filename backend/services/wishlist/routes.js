import { Router } from 'express';
import { wishlists } from './data.js';
import { crops } from '../crops/data.js';
import { verifyToken, requireRole } from '../../middleware/auth.js';

const router = Router();

// GET /api/wishlist
router.get('/', verifyToken, requireRole('buyer'), (req, res) => {
  const ids = wishlists[req.user.id] || [];
  const items = ids.map(id => crops.find(c => c.id === id)).filter(Boolean);
  res.json(items);
});

// POST /api/wishlist
router.post('/', verifyToken, requireRole('buyer'), (req, res) => {
  const { cropId } = req.body;
  if (!cropId) return res.status(400).json({ error: 'cropId is required.' });

  if (!wishlists[req.user.id]) wishlists[req.user.id] = [];
  if (!wishlists[req.user.id].includes(Number(cropId))) {
    wishlists[req.user.id].push(Number(cropId));
  }
  res.status(201).json({ message: 'Added to wishlist.' });
});

// DELETE /api/wishlist/:cropId
router.delete('/:cropId', verifyToken, requireRole('buyer'), (req, res) => {
  if (!wishlists[req.user.id]) return res.json({ message: 'Removed.' });
  wishlists[req.user.id] = wishlists[req.user.id].filter(id => id !== Number(req.params.cropId));
  res.json({ message: 'Removed from wishlist.' });
});

export default router;
