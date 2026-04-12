import { Router } from 'express';
import { platformStats, testimonials, teamMembers, adminStats, notifications } from './data.js';
import { verifyToken } from '../../middleware/auth.js';

const router = Router();

// GET /api/stats/platform — public
router.get('/platform', (req, res) => {
  res.json(platformStats);
});

// GET /api/stats/testimonials — public
router.get('/testimonials', (req, res) => {
  res.json(testimonials);
});

// GET /api/stats/team — public
router.get('/team', (req, res) => {
  res.json(teamMembers);
});

// GET /api/stats/admin — admin dashboard stats
router.get('/admin', verifyToken, (req, res) => {
  res.json(adminStats);
});

// GET /api/stats/notifications
router.get('/notifications', verifyToken, (req, res) => {
  res.json(notifications);
});

export default router;
