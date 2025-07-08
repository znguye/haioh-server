const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const matchmakingActionSchema = new Schema(
  {
    profileId: {
      type: String,
      required: true 
    },

    actorEmail: {
      type: String,
      required: true, 
      trim: true
    },

    actionType: {
      type: String,
      enum: ['like', 'not interested'],
      required: true
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const MatchmakingAction = model('MatchmakingAction', matchmakingActionSchema);
module.exports = MatchmakingAction;
