const { Queue } = require('bullmq');
const IORedis = require('ioredis');
const connection = new IORedis(process.env.REDIS_URL || 'redis://redis:6379');

const scheduleQueue = new Queue('schedule', { connection });

module.exports = scheduleQueue;
