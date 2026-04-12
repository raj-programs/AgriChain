import { Router } from 'express';
import { farmerOrders, buyerOrders, getNextFarmerOrderId, getNextBuyerOrderId } from './data.js';
import { verifyToken, requireRole } from '../../middleware/auth.js';

const router = Router();

// GET /api/orders/farmer — farmer's received orders
router.get('/farmer', verifyToken, requireRole('farmer'), (req, res) => {
  const { status } = req.query;
  let orders = farmerOrders.filter(o => o.farmerId === req.user.id);
  if (status && status !== 'All') orders = orders.filter(o => o.status === status);
  res.json(orders);
});

// GET /api/orders/buyer — buyer's purchase orders
router.get('/buyer', verifyToken, requireRole('buyer'), (req, res) => {
  const { status } = req.query;
  let orders = buyerOrders.filter(o => o.buyerId === req.user.id);
  if (status && status !== 'All') orders = orders.filter(o => o.status === status);
  res.json(orders);
});

// GET /api/orders/all — admin view all orders
router.get('/all', verifyToken, requireRole('admin'), (req, res) => {
  const { status } = req.query;
  const allOrders = [
    ...farmerOrders.map(o => ({ ...o, type: 'Farmer→Buyer' })),
    ...buyerOrders.map(o => ({ ...o, type: 'Buyer Purchase' })),
  ];
  const filtered = status && status !== 'All' ? allOrders.filter(o => o.status === status) : allOrders;
  res.json(filtered);
});

// POST /api/orders — buyer places order
router.post('/', verifyToken, requireRole('buyer'), (req, res) => {
  const { items, paymentMethod } = req.body;
  if (!items || !items.length) {
    return res.status(400).json({ error: 'Items are required.' });
  }

  const createdOrders = items.map(item => {
    const order = {
      id: getNextBuyerOrderId(),
      buyerId: req.user.id,
      farmerId: item.farmerId || 1,
      farmer: item.farmer || 'Unknown',
      crop: item.cropName,
      quantity: item.quantity,
      amount: item.amount,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      tracking: `TRCK${Date.now().toString().slice(-5)}`,
    };
    buyerOrders.push(order);

    const farmerOrder = {
      id: getNextFarmerOrderId(),
      farmerId: item.farmerId || 1,
      buyerId: req.user.id,
      buyer: req.user.name || 'Buyer',
      crop: item.cropName,
      quantity: item.quantity,
      amount: item.amount,
      status: 'Pending',
      date: order.date,
    };
    farmerOrders.push(farmerOrder);

    return order;
  });

  res.status(201).json(createdOrders);
});

// PUT /api/orders/:id/status
router.put('/:id/status', verifyToken, (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'Status is required.' });

  let order = farmerOrders.find(o => o.id === req.params.id);
  if (!order) order = buyerOrders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  order.status = status;
  res.json(order);
});

export default router;
