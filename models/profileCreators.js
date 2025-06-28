const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const profileCreatorSchema = new Schema(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true // Optional, helps track when a creator contributed
  }
);

const ProfileCreator = model('ProfileCreator', profileCreatorSchema);
module.exports = ProfileCreator;
