const express = require('express');
const router = express.Router();
const MatchmakingAction = require('../models/MatchmakingAction');

// Create a new like or action
router.post('/', async (req, res, next) => {
  try {
    const { profileId, actorEmail, actionType } = req.body;

    if (!profileId || !actorEmail || !actionType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const action = await MatchmakingAction.create({
      profileId,
      actorEmail,
      actionType
    });

    res.status(201).json({ message: 'Action recorded', action });
  } catch (err) {
    next(err);
  }
});

// Get all profiles liked by a user
router.get('/liked-by/:email', async (req, res, next) => {
  try {
    const { email } = req.params;

    const actions = await MatchmakingAction.find({
      actorEmail: email,
      actionType: 'like'
    });

    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});

// Delete a like/match by profileId and actorEmail
router.delete('/:profileId/:actorEmail', async (req, res, next) => {
  try {
    const { profileId, actorEmail } = req.params;

    const result = await MatchmakingAction.findOneAndDelete({
      profileId,
      actorEmail,
      actionType: 'like'
    });

    if (!result) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.status(200).json({ message: 'Match deleted' });
  } catch (err) {
    next(err);
  }
});


module.exports = router;
