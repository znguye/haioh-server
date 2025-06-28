const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const profileSchema = new Schema(
  {
    ownerUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    bio: {
      type: String,
      maxlength: 500
    },

    birthday: {
      type: Date,
      required: true
    },

    sex: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true
    },

    location: {
      type: String
    },

    religion: {
      type: String
    },

    tagline: {
      type: String,
      maxlength: 100
    },

    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft'
    }
  },
  {
    timestamps: true // creates createdAt and updatedAt fields
  }
);

const Profile = model('Profile', profileSchema);
module.exports = Profile;
