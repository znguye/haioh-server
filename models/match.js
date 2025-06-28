const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const matchSchema = new Schema({
  profile1Id: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  profile2Id: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User', // likely a matchmaker
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
    default: 'pending'
  }
});


const Match = model('Match', matchSchema);
module.exports = Match;
