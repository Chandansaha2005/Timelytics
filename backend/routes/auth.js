const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'secretdev';

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try{
    const user = await User.create({ name, email, passwordHash: hash, role });
    const token = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  }catch(e){
    res.status(400).json({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(401).json({ error: 'Invalid' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(401).json({ error: 'Invalid' });
  const token = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

// Get current user
router.get('/me', async (req, res) => {
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ error: 'No token' });
  const parts = auth.split(' ');
  if(parts.length !== 2) return res.status(401).json({ error: 'Bad token' });
  const token = parts[1];
  try{
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.sub).lean();
    if(!user) return res.status(404).json({ error: 'User not found' });
    delete user.passwordHash;
    res.json(user);
  }catch(e){
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Optional: Firebase-authenticated current user (uses firebaseAuth middleware)
try {
  const firebaseAuth = require('../middleware/firebaseAuth');
  router.get('/me-firebase', firebaseAuth, async (req, res) => {
    const u = req.user.toObject ? req.user.toObject() : req.user;
    delete u.passwordHash;
    res.json({ user: u, firebase: req.firebase.decoded });
  });
} catch (e) {
  // If Firebase packages are not installed or configured, skip exposing the route.
  console.warn('Firebase auth route not mounted:', e.message);
}

module.exports = router;
