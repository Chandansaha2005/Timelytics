const express = require('express');
const { Queue } = require('bullmq');
const IORedis = require('ioredis');
const connection = new IORedis(process.env.REDIS_URL || 'redis://redis:6379');

const exportQueue = new Queue('export', { connection });

const router = express.Router();

router.post('/pdf', async (req, res) => {
  const job = await exportQueue.add('export_pdf', { options: req.body });
  res.json({ taskId: job.id, status: 'queued' });
});

router.post('/docx', async (req, res) => {
  const job = await exportQueue.add('export_docx', { options: req.body });
  res.json({ taskId: job.id, status: 'queued' });
});

module.exports = router;
