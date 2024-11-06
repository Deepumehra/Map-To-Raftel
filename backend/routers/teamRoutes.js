const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// Team CRUD routes
router.post('/', teamController.createTeam);
router.get('/:id', teamController.getTeam);
router.put('/:id', teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);

// Specific operations for team
router.post('/:id/addPlayer', teamController.addPlayer);
router.post('/:id/joinHunt', teamController.joinHunt);
router.post('/:id/solveClue', teamController.solveClue);
router.post('/:id/updateScore', teamController.updateScore);

module.exports = router;
