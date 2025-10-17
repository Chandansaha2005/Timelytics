require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const scheduleRoutes = require('./routes/schedule');
const notificationsRoutes = require('./routes/notifications');
const adminRoutes = require('./routes/admin');
const exportRoutes = require('./routes/export');
const Notification = require('./models/notification');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/timelytics';

mongoose.connect(MONGO_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => { console.error('Mongo connect error', err); });

app.use('/api/auth', authRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/export', exportRoutes);

app.get('/api/healthz', (req, res) => res.json({ status: 'ok' }));

// Simple SSE endpoint to push notification events to connected clients
app.get('/api/events', (req, res) => {
  res.set({ 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
  const send = (data) => res.write(`data: ${JSON.stringify(data)}\n\n`);
  const changeStream = Notification.watch();
  changeStream.on('change', async (c) => {
    if(c.operationType === 'insert'){
      const full = c.fullDocument;
      send({ type: 'notification', payload: full });
    }
  });
  req.on('close', () => { changeStream.close(); });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
