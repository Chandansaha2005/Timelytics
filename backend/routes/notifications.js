const express = require('express');
const { Notification } = require('../models');

const router = express.Router();
const fcm = (() => {
  try { return require('../services/fcm'); } catch (e) { return null; }
})();

router.post('/', async (req, res) => {
  const { title, body, userId, role, data, fcmToken, topic } = req.body;
  const n = await Notification.create({ title, body, userId, role, data });
  // send FCM when token or topic provided and service available
  if (fcm && (fcmToken || topic)) {
    try {
      const payload = { title, body, data };
      if (fcmToken) await fcm.sendToToken(fcmToken, payload);
      if (topic) await fcm.sendToTopic(topic, payload);
    } catch (e) {
      console.warn('Failed to send FCM:', e.message);
    }
  }
  res.json(n);
});

router.get('/', async (req, res) => {
  const list = await Notification.find().sort({ createdAt: -1 }).limit(50).lean();
  res.json(list);
});

module.exports = router;
