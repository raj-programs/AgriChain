import { Router } from 'express';
import { createFreshClient, createAuthClient } from '../../config/supabase.js';
import { verifyToken } from '../../middleware/auth.js';

const router = Router();

// Map profiles row → frontend-expected shape
function formatProfile(profile) {
  return {
    id: profile.id,
    name: profile.full_name || '',
    email: profile.email || '',
    role: profile.role?.toLowerCase() || '',
    phone: profile.phone_no || '',
    location: profile.address || '',
    dob: profile.dob || '',
    joined: profile.created_at ? profile.created_at.split('T')[0] : '',
    bio: '',
    avatar: '',
    verified: true,
  };
}

// Capitalize first letter to match DB enum (Farmer, Buyer, Both)
function toDbRole(role) {
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, role, phone, location, phoneNo, address, fullName, dob } = req.body;

  const userName = fullName || name;
  const userRole = role;
  const userPhone = phoneNo || phone || '';
  const userAddress = address || location || '';
  const userDob = dob || null;

  if (!userName || !email || !password || !userRole) {
    return res.status(400).json({ error: 'Name, email, password, and role are required.' });
  }

  try {
    const fresh = createFreshClient();
    const { data, error } = await fresh.auth.signUp({
      email,
      password,
      options: { data: { full_name: userName } },
    });

    if (error) {
      if (error.message?.includes('already registered')) {
        return res.status(409).json({ error: 'Email already registered.' });
      }
      return res.status(400).json({ error: error.message });
    }

    const token = data.session?.access_token;
    if (!token) {
      return res.status(201).json({
        token: '',
        user: { id: data.user.id, name: userName, email, role: userRole.toLowerCase(), phone: userPhone, location: userAddress, dob: userDob || '', joined: new Date().toISOString().split('T')[0], bio: '', avatar: '', verified: false },
      });
    }

    // Insert profile row (RLS: auth.uid() = id)
    const authClient = createAuthClient(token);
    const { error: profileError } = await authClient
      .from('profiles')
      .insert({
        id: data.user.id,
        full_name: userName,
        email,
        phone_no: userPhone,
        address: userAddress,
        role: toDbRole(userRole),
        dob: userDob || null,
      });

    if (profileError) {
      return res.status(500).json({ error: 'Account created but profile setup failed: ' + profileError.message });
    }

    res.status(201).json({
      token,
      refreshToken: data.session.refresh_token,
      user: { id: data.user.id, name: userName, email, role: userRole.toLowerCase(), phone: userPhone, location: userAddress, dob: userDob || '', joined: new Date().toISOString().split('T')[0], bio: '', avatar: '', verified: false },
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const fresh = createFreshClient();
    const { data, error } = await fresh.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = data.session.access_token;
    const authClient = createAuthClient(token);

    const { data: profile, error: profileError } = await authClient
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError || !profile) {
      return res.status(500).json({ error: 'Failed to fetch user profile.' });
    }

    res.json({ token, refreshToken: data.session.refresh_token, user: formatProfile(profile) });
  } catch {
    res.status(500).json({ error: 'Login failed.' });
  }
});

// GET /api/auth/me
router.get('/me', verifyToken, async (req, res) => {
  try {
    const { data: profile, error } = await req.supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error || !profile) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(formatProfile(profile));
  } catch {
    res.status(500).json({ error: 'Failed to fetch profile.' });
  }
});

// PUT /api/auth/profile
router.put('/profile', verifyToken, async (req, res) => {
  const { name, phone, location, bio, avatar, fullName, phoneNo, address } = req.body;

  const updates = {};
  if (name || fullName) updates.full_name = name || fullName;
  if (phone || phoneNo) updates.phone_no = phone || phoneNo;
  if (location || address) updates.address = location || address;
  updates.updated_at = new Date().toISOString();

  try {
    const { data: profile, error } = await req.supabase
      .from('profiles')
      .update(updates)
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to update profile.' });
    }

    res.json(formatProfile(profile));
  } catch {
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

// PUT /api/auth/password
router.put('/password', verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password required.' });
  }

  try {
    // Verify current password with a fresh client
    const fresh = createFreshClient();
    const { error: verifyError } = await fresh.auth.signInWithPassword({
      email: req.user.email,
      password: currentPassword,
    });

    if (verifyError) {
      return res.status(401).json({ error: 'Current password is incorrect.' });
    }

    // fresh now has a valid session — use it to update password
    const { error } = await fresh.auth.updateUser({ password: newPassword });
    if (error) {
      return res.status(500).json({ error: error.message || 'Failed to update password.' });
    }

    res.json({ message: 'Password updated successfully.' });
  } catch {
    res.status(500).json({ error: 'Failed to update password.' });
  }
});

export default router;
