const express=require('express');
const router=express.Router();
const {createHunt,fetchHuntById,solveClue,getAllHuntsById,fetchClueById}=require('../controllers/huntController');
router.post('/create',createHunt);
router.get('/fetch-hunt',fetchHuntById);
router.put('/solve-clue',solveClue);
router.get('/fetch-clue-by-id',fetchClueById);
router.get('/getHunts',getAllHuntsById);
module.exports=router;