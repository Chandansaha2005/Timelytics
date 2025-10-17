const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimetableSchema = new Schema({
  day: String,
  timeSlot: String,
  room: { type: Schema.Types.ObjectId, ref: 'Classroom' },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
  teacher: { type: Schema.Types.ObjectId, ref: 'Faculty' },
  batch: String,
  explain: Schema.Types.Mixed
});

module.exports = mongoose.model('Timetable', TimetableSchema);
