import { Router } from 'express';
import { spoilageReports, getNextId } from './data.js';
import { verifyToken, requireRole } from '../../middleware/auth.js';

const router = Router();

// GET /api/spoilage
router.get('/', verifyToken, (req, res) => {
  if (req.user.role === 'admin') return res.json(spoilageReports);
  const reports = spoilageReports.filter(r => r.farmerId === req.user.id);
  res.json(reports);
});

// POST /api/spoilage
router.post('/', verifyToken, requireRole('farmer'), (req, res) => {
  const { crop, quantity, reason, date, description } = req.body;
  if (!crop || !quantity || !reason || !date) {
    return res.status(400).json({ error: 'Crop, quantity, reason, and date are required.' });
  }

  const report = {
    id: getNextId(),
    farmerId: req.user.id,
    crop,
    quantity: Number(quantity),
    reason,
    date,
    description: description || '',
    status: 'Submitted',
    value: Number(quantity) * 28,
  };
  spoilageReports.unshift(report);
  res.status(201).json(report);
});

// PUT /api/spoilage/:id/status — admin updates status
router.put('/:id/status', verifyToken, requireRole('admin'), (req, res) => {
  const report = spoilageReports.find(r => r.id === Number(req.params.id));
  if (!report) return res.status(404).json({ error: 'Report not found.' });

  report.status = req.body.status || report.status;
  res.json(report);
});

export default router;
