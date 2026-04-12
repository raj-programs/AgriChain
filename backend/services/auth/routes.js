import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { users, getNextId } from './data.js';
import { generateToken, verifyToken } from '../../middleware/auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  let user = users.find(u => u.email === email);
  if (!user) {
    // Demo mode: auto-login with role selection
    user = users.find(u => u.role === (role || 'buyer'));
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    // Demo mode: allow any password
    // In production, return: res.status(401).json({ error: 'Invalid credentials.' });
  }

  const token = generateToken(user);
  const { password: _, ...safeUser } = user;
  res.json({ token, user: safeUser });
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, role, phone, location } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Name, email, password, and role are required.' });
  }

  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'Email already registered.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: getNextId(),
    name,
    email,
    password: hashedPassword,
    role,
    avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 99)}.jpg`,
    location: location || '',
    phone: phone || '',
    verified: false,
    joined: new Date().toISOString().split('T')[0],
    bio: '',
  };
  users.push(newUser);

  const token = generateToken(newUser);
  const { password: _, ...safeUser } = newUser;
  res.status(201).json({ token, user: safeUser });
});

// GET /api/auth/me
router.get('/me', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  const { password: _, ...safeUser } = user;
  res.json(safeUser);
});

// PUT /api/auth/profile
router.put('/profile', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found.' });

  const { name, phone, location, bio, avatar } = req.body;
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (location) user.location = location;
  if (bio !== undefined) user.bio = bio;
  if (avatar) user.avatar = avatar;

  const { password: _, ...safeUser } = user;
  res.json(safeUser);
});

// PUT /api/auth/password
router.put('/password', verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password required.' });
  }

  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found.' });

  user.password = await bcrypt.hash(newPassword, 10);
  res.json({ message: 'Password updated successfully.' });
});

export default router;
