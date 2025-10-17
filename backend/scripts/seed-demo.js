const mongoose = require('mongoose');
const { Classroom, Faculty, Subject } = require('../models');
const MONGO = process.env.MONGODB_URI || 'mongodb://localhost:27017/timelytics';

async function seed(){
  await mongoose.connect(MONGO);
  console.log('Connected to', MONGO);

  // clear small collections (careful)
  await Classroom.deleteMany({});
  await Faculty.deleteMany({});
  await Subject.deleteMany({});

  const rooms = await Classroom.create([
    { name:'Room 101', code:'R101', type:'theory', capacity:60 },
    { name:'Lab 1', code:'L1', type:'lab', capacity:40 },
    { name:'Seminar Hall', code:'S1', type:'seminar', capacity:120 }
  ]);

  const f1 = await Faculty.create({ name:'Dr. Sharma', subjects:['Calculus'], availability: { mon:[8,9,10], tue:[9,10,11], wed:[8,9,10], thu:[9,10], fri:[8,9] } });
  const f2 = await Faculty.create({ name:'Prof. Rao', subjects:['Algorithms'], availability: { mon:[9,10], tue:[8,9,10], wed:[9,10,11], thu:[8,9], fri:[9,10] } });
  const f3 = await Faculty.create({ name:'Dr. Mehta', subjects:['DBMS'], availability: { mon:[10,11], tue:[10,11], wed:[10,11], thu:[10,11], fri:[10,11] } });

  const subs = await Subject.create([
    { code:'CS101', name:'Calculus', teacher: f1._id, department:'CS', estimatedStudents:50, type:'theory' },
    { code:'CS201', name:'Algorithms', teacher: f2._id, department:'CS', estimatedStudents:38, type:'theory' },
    { code:'CS305', name:'DBMS', teacher: f3._id, department:'CS', estimatedStudents:42, type:'theory' }
  ]);

  console.log('Seed complete:', { rooms: rooms.length, faculties: 3, subjects: subs.length });
  mongoose.disconnect();
}

seed().catch(err=>{ console.error(err); process.exit(1); });
