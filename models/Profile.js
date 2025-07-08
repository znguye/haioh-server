const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const profileSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true // e.g., "p1", "p2"
        },

        ownerUserId: {
            type: String,
            required: true // e.g., "u1", "u2"
        },

        matchmaker_email: {
            type: String,
            trim: true
        },

        first_name: {
            type: String,
            required: true,
            trim: true
        },

        last_name: {
            type: String,
            trim: true
        },

        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            trim: true
        },

        birthday: {
            type: Date,
            required: true
        },

        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            required: true
        },

        from: {
            type: String,
        },

        profilePicture: {
            type: String
        },

        photo: {
            type: String
        },

        tagline: {
            type: String,
            maxlength: 100
        },

        description: {
            type: String,
            maxlength: 1000
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
