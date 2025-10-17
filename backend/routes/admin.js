const express = require('express');
const { Faculty, Classroom, Subject, Constraint, Timetable, User } = require('../models');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// create faculty
router.post('/faculty', requireAuth, async (req, res) => {
  const data = req.body;
  const f = await Faculty.create(data);
  res.json(f);
});

// create classroom
router.post('/classrooms', requireAuth, async (req, res) => {
  const data = req.body;
  const c = await Classroom.create(data);
  res.json(c);
});

// create subject
router.post('/subjects', requireAuth, async (req, res) => {
  const data = req.body;
  const s = await Subject.create(data);
  res.json(s);
});

// create constraint
router.post('/constraints', requireAuth, async (req, res) => {
  const data = req.body;
  const c = await Constraint.create(data);
  res.json(c);
});

// dashboard summary
router.get('/dashboard', requireAuth, async (req, res) => {
  const totalTeachers = await Faculty.countDocuments();
  const rooms = await Classroom.countDocuments();
  const courses = await Subject.countDocuments();
  const tts = await Timetable.countDocuments();
  res.json({ totalTeachers, rooms, courses, scheduledSessions: tts });
});

module.exports = router;
