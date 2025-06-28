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
    }
  },
  {
    role: { 
      type: String, 
      enum: ['loner', 'matchmaker'] 
    },
  },
  {
    profileId: String,
    
  }
);

const User = model("User", userSchema);

module.exports = User;
