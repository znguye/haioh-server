//All the app routes related to user profiles
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

//Models
const Profile = require('../models/Profile');
const { generateId } = require('../utils/idGenerator');

// MVP: Just matchmaker screens

// Get all published profiles (Home feed)
router.get('/', async (req, res, next) => {
  try {
    const profiles = await Profile.find({ status: "published" });
    res.status(200).json(profiles);
  } catch (error) {
    next({ error });
  }
});

// Get current loner's profile
router.get('/create-profile/:usernameme', authenticate, async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ ownerUserId: req.user.userId });
    res.status(200).json(profile);
  } catch (error) {
    next({ error });
  }
});

// Get the profile owned by the logged-in user
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const profile = await Profile.findOne({ ownerUserId: userId });

    if (!profile) {
      return res.status(404).json({ message: 'You have not created a profile yet.' });
    }

    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
});

// Create or update a profile
router.post('/', authenticate, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const profileData = req.body;

    // Check if user already has a profile
    let profile = await Profile.findOne({ ownerUserId: userId });

    if (profile) {
      // Update
      await Profile.updateOne({ ownerUserId: userId }, profileData);
      return res.status(200).json({ message: 'Profile updated' });
    }

    // Generate unique ID for new profile
    const profileId = await generateId('p', Profile);

    // Create new
    const newProfile = await Profile.create({
      ...profileData,
      id: profileId,
      ownerUserId: userId,
    });

    res.status(201).json({ message: 'Profile created', profile: newProfile });
  } catch (err) {
    next(err);
  }
});

module.exports = router;