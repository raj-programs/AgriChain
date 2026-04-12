import { Router } from 'express';
import { fraudReports, getNextId } from './data.js';
import { spoilageReports } from '../spoilage/data.js';
import { verifyToken, requireRole } from '../../middleware/auth.js';

const router = Router();

// GET /api/reports
router.get('/', verifyToken, requireRole('admin'), (req, res) => {
  res.json({ fraudReports, spoilageReports });
});

// POST /api/reports
router.post('/', verifyToken, (req, res) => {
  const { type, reported, description, severity } = req.body;
  if (!type || !reported || !description) {
    return res.status(400).json({ error: 'Type, reported party, and description are required.' });
  }

  const report = {
    id: getNextId(),
    type,
    reporterId: req.user.id,
    reporter: req.user.name || 'Anonymous',
    reported,
    description,
    date: new Date().toISOString().split('T')[0],
    severity: severity || 'Medium',
    status: 'Submitted',
  };
  fraudReports.push(report);
  res.status(201).json(report);
});

// PUT /api/reports/:id/status
router.put('/:id/status', verifyToken, requireRole('admin'), (req, res) => {
  const report = fraudReports.find(r => r.id === req.params.id);
  if (!report) return res.status(404).json({ error: 'Report not found.' });

  report.status = req.body.status || report.status;
  res.json(report);
});

export default router;
