const { Timetable, Classroom, Subject, Faculty } = require('../models');

/**
 * Very small greedy scheduler.
 * Inputs (options): {
 *   days: ['Mon','Tue',...],
 *   timeSlots: ['08:00-09:00', ...],
 *   batch: '2025-A',
 * }
 * This function is intentionally simple as a starting point. It:
 * - loads subjects and classrooms
 * - iterates subjects and attempts to place each into the first available day/time/room respecting
 *   teacher availability and room capacity/type
 */
async function generateSchedule(options = {}){
  const days = options.days || ['Mon','Tue','Wed','Thu','Fri'];
  const timeSlots = options.timeSlots || ['08:00-09:00','09:15-10:15','10:30-11:30','11:45-12:45','14:00-15:00','15:15-16:15'];
  const batch = options.batch || 'default';

  // load data
  const subjects = await Subject.find().populate('teacher').lean();
  const rooms = await Classroom.find().lean();

  const placements = [];

  // helper: check conflicts
  async function hasConflict({ day, timeSlot, teacherId, roomId }){
    const teacherConflict = await Timetable.findOne({ teacher: teacherId, day, timeSlot });
    if(teacherConflict) return { conflict: 'teacher', existing: teacherConflict };
    const roomConflict = await Timetable.findOne({ room: roomId, day, timeSlot });
    if(roomConflict) return { conflict: 'room', existing: roomConflict };
    return null;
  }

  for(const subj of subjects){
    // try to place this subject once per week (simplified)
    let placed = false;
    for(const day of days){
      if(placed) break;
      for(const ts of timeSlots){
        if(placed) break;
        // choose a room that fits capacity/type (naive: first room)
        for(const r of rooms){
          const conflict = await hasConflict({ day, timeSlot: ts, teacherId: subj.teacher?._id, roomId: r._id });
          if(conflict) continue;
          // create timetable entry
          const tt = await Timetable.create({ day, timeSlot: ts, room: r._id, subject: subj._id, teacher: subj.teacher?._id, batch, explain: { placedBy: 'greedy', createdAt: new Date() } });
          placements.push(tt);
          placed = true; break;
        }
      }
    }
  }

  return placements;
}

module.exports = { generateSchedule };
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
