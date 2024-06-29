const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conferenceSchema = new Schema({
  title: String,
  date: Date,
  description: String,
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  feedback: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conference', conferenceSchema);
