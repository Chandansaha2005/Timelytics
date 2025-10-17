const { Subject, Classroom, Timetable, Faculty } = require('../models');
/**
 * Improved greedy scheduler with basic constraint support and explainability.
 * - Respects Faculty.availability (format: { mon:[8,9], tue:[9,10] } hours)
 * - Respects room capacity
 * - Avoids teacher/room double-booking
 * - Produces explain metadata per placement
 *
 * Options:
 *  - days: ['Mon', 'Tue', ...]
 *  - timeSlots: array of hour numbers [8,9,10,...]
 *  - defaultBatch: string
 */
async function generateSchedule(options = {}){
  const days = options.days || ['Mon','Tue','Wed','Thu','Fri'];
  const timeSlots = options.timeSlots || [8,9,10,11,12,13,14,15,16];
  const batch = options.defaultBatch || 'B1';

  const subjects = await Subject.find().populate('teacher').lean();
  const rooms = await Classroom.find().lean();

  // quick lookup maps
  const teacherSchedule = {}; // key: teacherId_day_hour -> true
  const roomSchedule = {}; // key: roomId_day_hour -> true

  const placements = [];

  function teacherAvailable(teacher, day, hour){
    if(!teacher) return false;
    const av = teacher.availability || {};
    const key = day.toLowerCase().slice(0,3); // Mon -> mon
    const hours = av[key];
    if(!hours) return false;
    return hours.includes(hour);
  }

  for(const subj of subjects){
    let placed = false;
    const teacher = subj.teacher;
    for(const day of days){
      if(placed) break;
      for(const hour of timeSlots){
        if(placed) break;

        // check teacher availability
        if(!teacherAvailable(teacher, day, hour)) continue;

        // find a room that fits capacity
        for(const room of rooms){
          if(room.capacity && subj.estimatedStudents && room.capacity < subj.estimatedStudents) continue;
          const rKey = `${room._id}_${day}_${hour}`;
          const tKey = `${teacher?._id}_${day}_${hour}`;
          if(roomSchedule[rKey] || teacherSchedule[tKey]) continue;

          // commit placement
          roomSchedule[rKey] = true;
          teacherSchedule[tKey] = true;
          const explain = {
            placedBy: 'greedy-constraints',
            reason: 'teacher available and room capacity OK',
            day, hour,
            score: {
              availability: 1,
              capacity: room.capacity ? 1 : 0.5
            },
            createdAt: new Date()
          };

          const timeSlot = `${String(hour).padStart(2,'0')}:00`;
          const tt = await Timetable.create({ day, timeSlot, room: room._id, subject: subj._id, teacher: teacher?._id, batch, explain });
          placements.push({ tt, explain });
          placed = true; break;
        }
      }
    }
    if(!placed){
      const explain = { placedBy: 'failed', reason: 'No available teacher/room slot found', createdAt: new Date() };
      const tt = await Timetable.create({ day: 'TBD', timeSlot: 'TBD', subject: subj._id, teacher: subj.teacher?._id, batch, explain });
      placements.push({ tt, explain });
    }
  }

  return placements;
}

module.exports = { generateSchedule };
