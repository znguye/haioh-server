const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.'],
      trim: true
    },

    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },

    role: { 
      type: String, 
      enum: ['loner', 'matchmaker'],
      required: true,
      default: 'matchmaker' // Default role is matchmaker 
    },
  
    profileId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      default: null // Initially no profile is associated
    },
  },
  {
    timestamps: true // Automatically manage createdAt and updatedAt fields
  }
);

const User = model("User", userSchema);
module.exports = User;
