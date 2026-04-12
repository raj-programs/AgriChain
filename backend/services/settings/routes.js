import { Router } from 'express';
import { verifyToken, requireRole } from '../../middleware/auth.js';

const router = Router();

let platformSettings = {
  platformName: 'AgriChain',
  supportEmail: 'support@agrichain.in',
  supportPhone: '1800-AGRI-HELP',
  maxFileUploadSize: 5,
  categories: 'Grains, Fruits, Vegetables, Spices, Processed',
  platformFee: 2,
  listingFee: 0,
  minOrderValue: 500,
  maxTradeAmount: 500000,
  paymentGateway: 'Razorpay',
  requireKYC: true,
  requireGST: true,
  twoFactorAdmin: true,
  autoBlockSuspicious: false,
  emailVerification: true,
  maintenanceMode: false,
};

// GET /api/settings
router.get('/', verifyToken, requireRole('admin'), (req, res) => {
  res.json(platformSettings);
});

// PUT /api/settings
router.put('/', verifyToken, requireRole('admin'), (req, res) => {
  platformSettings = { ...platformSettings, ...req.body };
  res.json(platformSettings);
});

export default router;
