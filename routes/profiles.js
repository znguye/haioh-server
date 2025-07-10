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

// Get profile by profile ID (for MatchList)
router.get('/by-id/:id', async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ id: req.params.id, status: 'published' }).lean();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ profile });
  } catch (err) {
    next(err);
  }
});



// Get a public profile by username
router.get('/:username', async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ username: req.params.username, status: 'published' }).lean();

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ profile });
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

// PATCH: Update parts of the current user's profile
router.patch('/', authenticate, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const updates = req.body;
    const profile = await Profile.findOneAndUpdate(
      { ownerUserId: userId },
      { $set: updates },
      { new: true }
    );
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile updated', profile });
  } catch (err) {
    next(err);
  }
});

// Delete a profile by ID
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const profileId = req.params.id;
    const profile = await Profile.findOne({ id: profileId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    if (profile.ownerUserId !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this profile' });
    }
    await Profile.deleteOne({ id: profileId });
    res.status(200).json({ message: 'Profile deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;