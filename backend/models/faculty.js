const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacultySchema = new Schema({
  name: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  subjects: [String],
  availability: Schema.Types.Mixed, // e.g. { mon: [8,9,...] }
  constraints: Schema.Types.Mixed
});

module.exports = mongoose.model('Faculty', FacultySchema);
