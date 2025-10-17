const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({
  name: String,
  code: String,
  type: String,
  capacity: Number,
  resources: Schema.Types.Mixed
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
