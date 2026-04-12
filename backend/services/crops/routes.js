import { Router } from 'express';
import { crops, categories, farmers, getNextId } from './data.js';
import { verifyToken, requireRole } from '../../middleware/auth.js';

const router = Router();

// GET /api/crops — public, with filters
router.get('/', (req, res) => {
  const { search, category, organic, available, minPrice, maxPrice, sortBy, farmerId } = req.query;
  let list = [...crops];

  if (farmerId) list = list.filter(c => c.farmerId === Number(farmerId));
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(c => c.name.toLowerCase().includes(q) || c.farmer.toLowerCase().includes(q) || c.location.toLowerCase().includes(q));
  }
  if (category && category !== 'all') list = list.filter(c => c.category === category);
  if (organic === 'true') list = list.filter(c => c.organic);
  if (available === 'true') list = list.filter(c => c.available);
  if (minPrice) list = list.filter(c => c.price >= Number(minPrice));
  if (maxPrice) list = list.filter(c => c.price <= Number(maxPrice));

  if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
  else if (sortBy === 'newest') list.sort((a, b) => b.id - a.id);

  res.json(list);
});

// GET /api/crops/categories
router.get('/categories', (req, res) => {
  res.json(categories);
});

// GET /api/crops/farmers
router.get('/farmers', (req, res) => {
  res.json(farmers);
});

// GET /api/crops/:id
router.get('/:id', (req, res) => {
  const crop = crops.find(c => c.id === Number(req.params.id));
  if (!crop) return res.status(404).json({ error: 'Crop not found.' });
  res.json(crop);
});

// POST /api/crops — farmer adds crop
router.post('/', verifyToken, requireRole('farmer'), (req, res) => {
  const { name, category, variety, quantity, unit, price, minOrder, description, state, city, harvestDate, organic, available } = req.body;
  if (!name || !category || !quantity || !price) {
    return res.status(400).json({ error: 'Name, category, quantity, and price are required.' });
  }

  const newCrop = {
    id: getNextId(),
    name,
    category,
    variety: variety || '',
    price: Number(price),
    unit: unit || 'kg',
    quantity: Number(quantity),
    farmerId: req.user.id,
    farmer: req.user.name || 'Unknown Farmer',
    location: `${city || ''}, ${state || ''}`.replace(/^, |, $/g, ''),
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
    rating: 0,
    reviews: 0,
    available: available !== false,
    organic: organic || false,
    description: description || '',
    approvalStatus: 'Pending',
    views: 0,
    enquiries: 0,
    minOrder: minOrder ? Number(minOrder) : 1,
    harvestDate: harvestDate || '',
  };
  crops.push(newCrop);
  res.status(201).json(newCrop);
});

// PUT /api/crops/:id
router.put('/:id', verifyToken, (req, res) => {
  const crop = crops.find(c => c.id === Number(req.params.id));
  if (!crop) return res.status(404).json({ error: 'Crop not found.' });

  if (req.user.role === 'farmer' && crop.farmerId !== req.user.id) {
    return res.status(403).json({ error: 'Not your crop listing.' });
  }

  const allowed = ['name', 'category', 'price', 'unit', 'quantity', 'description', 'organic', 'available', 'location'];
  for (const key of allowed) {
    if (req.body[key] !== undefined) crop[key] = req.body[key];
  }

  if (req.user.role === 'admin' && req.body.approvalStatus) {
    crop.approvalStatus = req.body.approvalStatus;
  }

  res.json(crop);
});

// DELETE /api/crops/:id
router.delete('/:id', verifyToken, (req, res) => {
  const idx = crops.findIndex(c => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Crop not found.' });

  if (req.user.role === 'farmer' && crops[idx].farmerId !== req.user.id) {
    return res.status(403).json({ error: 'Not your crop listing.' });
  }

  crops.splice(idx, 1);
  res.json({ message: 'Crop deleted.' });
});

export default router;
