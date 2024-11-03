const express=require('express');
const router=express.Router();
const {createHunt,getHuntById,solveClue,getAllHunts,getNextClueById}=require('../controllers/huntController');
router.post('/create',createHunt);
router.get('/:id',getHuntById);
router.put('/:id/solve-clue',solveClue);
router.get('/getHunts',getAllHunts);
router.get('/:id/getNextClueById',getNextClueById);
module.exports=router;