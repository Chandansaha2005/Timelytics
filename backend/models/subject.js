const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  code: String,
  name: String,
  department: String,
  teacher: { type: Schema.Types.ObjectId, ref: 'Faculty' },
  credits: Number,
  type: String
});

module.exports = mongoose.model('Subject', SubjectSchema);
