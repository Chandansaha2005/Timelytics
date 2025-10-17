const { Subject, Classroom, Timetable, Faculty } = require('../models');

// Simple scheduler: greedy placement with explainability vector
async function generateSchedule(options = {}){
  const TIMES = ['Mon 8','Mon 9','Mon 10','Mon 11','Mon 12','Mon 13','Mon 14','Mon 15','Mon 16'];
  const subjects = await Subject.find().limit(500).lean();
  const rooms = await Classroom.find().lean();

  const roomUsage = {};
  const teacherUsage = {};
  const placements = [];

  for(const subj of subjects){
    let placed = false;
    for(const t of TIMES){
      for(const r of rooms){
        const roomKey = `${r._id}_${t}`;
        const teacherKey = `${subj.teacher}_${t}`;
        if(roomUsage[roomKey] || teacherUsage[teacherKey]) continue;
        roomUsage[roomKey]=true; teacherUsage[teacherKey]=true;
        const explain = {
          reason: 'Greedy placement: available room and teacher',
          scoreVector: { availability: 1, roomMatch: 1, gapPenalty: 0, loadBalance: 1 }
        };
        const [day, timeSlot] = t.split(' ');
        const tt = await Timetable.create({ day, timeSlot, room: r._id, subject: subj._id, teacher: subj.teacher, batch: options.defaultBatch || 'B1', explain });
        placements.push({ tt, explain });
        placed = true; break;
      }
      if(placed) break;
    }
    if(!placed){
      const explain = { reason: 'No available slot found', scoreVector: { availability: 0 } };
      const tt = await Timetable.create({ day: 'TBD', timeSlot: 'TBD', subject: subj._id, teacher: subj.teacher, batch: options.defaultBatch || 'B1', explain });
      placements.push({ tt, explain });
    }
  }

  return placements;
}

module.exports = { generateSchedule };
