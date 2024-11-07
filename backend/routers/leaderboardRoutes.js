const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

// Route to get leaderboard for a specific hunt
router.get('/:huntId', leaderboardController.getLeaderboard);

// Route to update individual player score
router.post('/updateIndividualScore', leaderboardController.updateIndividualScore);

// Route to update team score
router.post('/updateTeamScore', leaderboardController.updateTeamScore);

module.exports = router;
