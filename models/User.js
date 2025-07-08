const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    id: { 
      type: String,
      required: true,
      unique: true
    },

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

    status: { 
      type: String, 
      enum: ['active', 'inactive'],
      default: 'active' 
    }
  },
  {
    timestamps: true // Automatically manage createdAt and updatedAt fields
  }
);

const User = model("User", userSchema);
module.exports = User;
