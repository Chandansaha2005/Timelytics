require('dotenv').config();
const { Worker, Queue } = require('bullmq');
const IORedis = require('ioredis');
const Redis = new IORedis(process.env.REDIS_URL || 'redis://redis:6379');

const scheduleQueue = new Queue('schedule', { connection: Redis });

const mongoose = require('mongoose');
const { Timetable, Classroom, Subject, Faculty, Notification } = require('../backend/models');
const { generateSchedule } = require('../backend/services/scheduler');

async function connectDb(){
  const MONGO = process.env.MONGO_URL || 'mongodb://mongo:27017/timelytics';
  await mongoose.connect(MONGO);
}

const worker = new Worker('schedule', async job => {
  console.log('Processing job', job.name, job.data);
  if(job.name === 'generate_schedule'){
    await connectDb();
    const placements = await generateSchedule(job.data.options || {});
    await Notification.create({ title: 'Schedule Generated', body: `Placed ${placements.length} sessions`, role: 'admin' });
    console.log('Schedule generation complete - placed', placements.length);
  }
}, { connection: Redis });

worker.on('completed', (job) => { console.log(`Job ${job.id} completed`); });
worker.on('failed', (job, err) => { console.error(`Job ${job.id} failed`, err); });

// Export worker
const exportWorker = new Worker('export', async job => {
  console.log('Processing export job', job.name);
  if(job.name === 'export_pdf' || job.name === 'export_docx'){
    // placeholder: create simple JSON payload file to simulate export
    const fs = require('fs');
    const path = require('path');
    const outDir = path.resolve(__dirname, 'outputs');
    if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const filename = path.join(outDir, `${job.id}-${job.name}.json`);
    fs.writeFileSync(filename, JSON.stringify({ createdAt: new Date().toISOString(), options: job.data.options || {} }, null, 2));
    await Notification.create({ title: 'Export Ready', body: `Export ${job.name} ready: ${filename}`, role: 'admin', data: { file: filename } });
  }
}, { connection: Redis });

exportWorker.on('completed', (job) => { console.log(`Export ${job.id} completed`); });
exportWorker.on('failed', (job, err) => { console.error(`Export ${job.id} failed`, err); });
