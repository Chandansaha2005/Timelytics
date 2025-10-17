const express = require('express');
const { Timetable, Classroom, Subject, Faculty } = require('../models');
const { requireAuth } = require('../middleware/auth');

const scheduleQueue = require('../queues/scheduleQueue');
const router = express.Router();
const { generateSchedule } = require('../services/scheduler');

// Simple in-memory timeslots for demo
const TIMES = ['Mon 8','Mon 9','Mon 10','Mon 11','Mon 12','Mon 13','Mon 14','Mon 15','Mon 16'];

// Greedy scheduler: iterate subjects, assign first available room+time that doesn't conflict
router.post('/generate', async (req, res) => {
  // enqueue a schedule generation job to be processed by the worker
  const job = await scheduleQueue.add('generate_schedule', { options: req.body.options || {} });
  res.json({ taskId: job.id, status: 'queued' });
});

// Synchronous generation (useful for landing page/testing) - runs the greedy scheduler inline
router.post('/generate-sync', async (req, res) => {
  try{
    const opts = req.body.options || {};
    const placements = await generateSchedule(opts);
    res.json({ success:true, placed: placements.length, placements });
  }catch(e){ console.error(e); res.status(500).json({ error: e.message }); }
});

router.get('/', async (req, res) => {
  const tts = await Timetable.find().populate('room subject teacher').lean();
  res.json(tts);
});

// resource endpoints
router.get('/subjects/list', async (req, res) => { const subs = await Subject.find().populate('teacher').lean(); res.json(subs); });
router.get('/classrooms/list', async (req, res) => { const rooms = await Classroom.find().lean(); res.json(rooms); });
router.get('/faculty/list', async (req, res) => { const f = await Faculty.find().lean(); res.json(f); });

// Manual override: move a timetable entry to a new day/time (and optional room)
router.post('/override', requireAuth, async (req, res) => {
  const { id, day, timeSlot, room } = req.body;
  if(!id || !day || !timeSlot) return res.status(400).json({ error: 'id, day and timeSlot required' });
  const tt = await Timetable.findById(id);
  if(!tt) return res.status(404).json({ error: 'Timetable entry not found' });

  // conflict checks
  const teacherConflict = await Timetable.findOne({ teacher: tt.teacher, day, timeSlot, _id: { $ne: id } });
  if(teacherConflict) return res.status(409).json({ error: 'Teacher conflict', conflict: teacherConflict });

  const targetRoom = room || tt.room;
  const roomConflict = await Timetable.findOne({ room: targetRoom, day, timeSlot, _id: { $ne: id } });
  if(roomConflict) return res.status(409).json({ error: 'Room conflict', conflict: roomConflict });

  // apply override
  tt.day = day;
  tt.timeSlot = timeSlot;
  tt.room = targetRoom;
  tt.explain = Object.assign({}, tt.explain || {}, { reason: 'Manual override by admin', changedAt: new Date().toISOString() });
  await tt.save();
  const updated = await Timetable.findById(id).populate('room subject teacher').lean();
  res.json({ success: true, updated });
});

module.exports = router;
