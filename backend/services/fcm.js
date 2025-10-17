let admin;
try {
  // lazy require to avoid hard failure when firebase is not configured
  const { initFirebase } = require('./firebase');
  admin = initFirebase();
} catch (e) {
  console.warn('FCM service not initialized:', e.message);
}

async function sendToToken(token, payload = {}) {
  if (!admin) throw new Error('Firebase admin not initialized');
  return admin.messaging().sendToDevice(token, { notification: payload });
}

async function sendToTopic(topic, payload = {}) {
  if (!admin) throw new Error('Firebase admin not initialized');
  return admin.messaging().sendToTopic(topic, { notification: payload });
}

module.exports = { sendToToken, sendToTopic };
