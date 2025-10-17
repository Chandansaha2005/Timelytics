const { initFirebase } = require('../services/firebase');
const admin = initFirebase();
const User = require('../models/user');

// Middleware: verifies Firebase ID token from Authorization header (Bearer <token>)
async function firebaseAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const idToken = auth.split(' ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    // Upsert a local user record (minimal) so existing routes that expect a User can work
    const email = decoded.email || decoded.uid + '@firebase.local';
    const displayName = decoded.name || decoded.email || decoded.uid;
    let user = await User.findOne({ email }).exec();
    if (!user) {
      user = new User({
        name: displayName,
        email,
        firebaseUid: decoded.uid,
      });
      await user.save();
    } else if (!user.firebaseUid) {
      user.firebaseUid = decoded.uid;
      await user.save();
    }

    // Attach user and firebase token info to request for downstream handlers
    req.user = user;
    req.firebase = { decoded };
    next();
  } catch (err) {
    console.error('Firebase token verification failed', err);
    return res.status(401).json({ error: 'Invalid or expired Firebase ID token' });
  }
}

module.exports = firebaseAuth;
