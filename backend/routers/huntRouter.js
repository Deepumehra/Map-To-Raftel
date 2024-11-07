const express = require('express');
const router = express.Router();
const { 
  createHunt,
  fetchHuntById,
  solveClue,
  getAllHuntsById,
  fetchClueById,
  searchHunt,
  getAllHunts,
  joinHunt 
} = require('../controllers/huntController');

// Place specific routes before the dynamic :id route
router.post('/create', createHunt);
router.put('/solve-clue', solveClue);
router.get('/fetch-clue-by-id', fetchClueById);
router.get('/getHuntsById', getAllHuntsById);
router.post('/join-hunt', joinHunt);
router.get('/getAllHunts', getAllHunts);
router.get('/search', searchHunt);

// Dynamic route should be at the end
router.get('/fetchHunt', fetchHuntById);

module.exports = router;
