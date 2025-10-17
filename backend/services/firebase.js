const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

let initialized = false;

function initFirebase() {
  if (initialized) return admin;

  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || '';
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '';

  let creds = null;
  if (serviceAccountJson) {
    try {
      creds = JSON.parse(serviceAccountJson);
    } catch (err) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON', err);
      throw err;
    }
  } else if (serviceAccountPath) {
    const abs = path.isAbsolute(serviceAccountPath)
      ? serviceAccountPath
      : path.join(process.cwd(), serviceAccountPath);
    if (!fs.existsSync(abs)) {
      throw new Error(`Firebase service account file not found at ${abs}`);
    }
    creds = require(abs);
  } else {
    console.warn('No Firebase service account provided; using application default credentials');
  }

  const options = {};
  if (creds) options.credential = admin.credential.cert(creds);

  admin.initializeApp(options);
  initialized = true;
  console.log('Firebase admin initialized');
  return admin;
}

module.exports = {
  initFirebase,
};
