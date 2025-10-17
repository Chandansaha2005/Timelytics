const express = require('express');
const { Notification } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  const { title, body, userId, role, data } = req.body;
  const n = await Notification.create({ title, body, userId, role, data });
  res.json(n);
});

router.get('/', async (req, res) => {
  const list = await Notification.find().sort({ createdAt: -1 }).limit(50).lean();
  res.json(list);
});

module.exports = router;
