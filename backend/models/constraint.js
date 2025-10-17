const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConstraintSchema = new Schema({
  type: String,
  target: String,
  params: Schema.Types.Mixed
});

module.exports = mongoose.model('Constraint', ConstraintSchema);
