//All the app routes related to user profiles
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

//Models
const Profile = require('../models/Profile');
const MatchmakingAction = require('../models/MatchmakingAction');
const Tagline = require('../models/Tagline');
const ProfileCreator = require('../models/ProfileCreator');

// Purpose: For Matchmaker Home Screen, get all published profiles for matchmaker
router.get('/profiles/matchmaker-published', async (req, res, next) => {
    try {
        const profiles = await Profile
            .find({ status: "published" })
            .populate('ownerUserId', 'email');
        res.status(200).json(profiles);
    } catch (error) {
        next({error});
    }
})

// Purpose: For Loner Home Screen, get all published profiles for loner
router.get('/profiles/loner-published', async (req, res, next) => {
    try {
        const profiles = await Profile
            .find({ status: "published" })
            .populate('ownerUserId', 'email');
        res.status(200).json(profiles);
    } catch (error) {
        next({error});
    }
})

// Purpose: For Loner Home Screen, get private profiles for Loner
router.get('/profiles/me', authenticate, async (req, res, next) => {
    try {
        const profile = await Profile
            .findOne({ ownerUserId: req.user.userId });
    res.status(200).json(profile);
    } catch (error) {
        next({error});
    }
});

// Purpose: For Matchmaker Home Screen, record matching action from matchMaker
router.post('/actions', authenticate, async (req, res, next) => {
    const { profileId, actionType, commentText } = req.body;

    const action = new MatchmakingAction({
        profileId,
        actorUserId: req.user.userId,
        actionType,
        commentText: commentText || null
    });
  
    try {
    await action.save();
    res.status(201).json({ message: 'Action recorded', action });
  } catch (error) {
    next({error});
  }
});

// Purpose: Fetch a profile by ID with all taglines
router.get('/profiles/:id', async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id);
    const taglines = await Tagline.find({ profileId: profile._id });
    res.status(200).json({ profile, taglines });
  } catch (error) {
    next({error});
  }
});

// Purpose: Admin screen for matchmakers — show all profiles they contributed to.
router.get('/profiles/created-by/me', authenticate, async (req, res, next) => {
  try {
    const links = await ProfileCreator.find({ userId: req.user.userId });
    const profileIds = links.map(link => link.profileId);
    const profiles = await Profile.find({ _id: { $in: profileIds } });
    res.status(200).json(profiles);
  } catch (error) {
    next({error});
  }
});

module.exports = router;