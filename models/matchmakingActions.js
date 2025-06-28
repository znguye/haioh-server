const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const matchSchema = new Schema(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true
    },

    suggestedUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    matchmakerUserIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],

    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },

    comment: {
      type: String,
      default: ''
    },

    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Match = model('Match', matchSchema);
module.exports = Match;
