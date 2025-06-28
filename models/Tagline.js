const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taglineSchema = new Schema(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true
    },

    authorUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    text: {
      type: String,
      required: true,
      maxlength: 200
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

const Tagline = model('Tagline', taglineSchema);
module.exports = Tagline;
