const mongoose = require('mongoose');
const { User, Faculty, Classroom, Subject } = require('../models');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/timelytics';

async function seed(){
  await mongoose.connect(MONGO_URL);
  console.log('Seeding...');
  await User.deleteMany({});
  await Faculty.deleteMany({});
  await Classroom.deleteMany({});
  await Subject.deleteMany({});

  const bcrypt = require('bcrypt');
  const hash = await bcrypt.hash('demo', 10);
  const admin = await User.create({ name: 'Admin', email: 'admin@timely.local', role: 'admin', passwordHash: hash });

  // faculties
  for(let i=1;i<=8;i++){
    await Faculty.create({ name: `Prof ${i}`, subjects: [] , availability: {}});
  }

  // classrooms
  for(let i=1;i<=10;i++){
    const type = i<=3? 'lab' : (i===4? 'seminar' : 'smart');
    await Classroom.create({ name: `Room ${i}`, code: `R${i}`, type, capacity: 25 + i });
  }

  // subjects
  const faculties = await Faculty.find();
  for(let i=1;i<=25;i++){
    const t = faculties[i % faculties.length];
    await Subject.create({ code: `S${i}`, name: `Subject ${i}`, department: 'CS', teacher: t._id, type: i%5===0? 'lab':'theory' });
  }

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
