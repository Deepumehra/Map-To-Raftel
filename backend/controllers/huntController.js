const Hunt = require('../models/huntSchema');  // Import Hunt model
const Clue = require('../models/clueSchema')// Import Clue model
const User = require('../models/userModel');

exports.createHunt = async (req, res) => {
    try {
        const { title, description, clues } = req.body;
        
        const previousClueId = null;  // To store the next clue reference

        // Reverse loop through clues to set up the linked list structure
        const clueIds = await Promise.all(clues.reverse().map(async (clueData) => {
            if(previousClueId==null){
                clueData.isDestinationReached=true;
            }
            const clue = new Clue({
                ...clueData,
                nextClueId: previousClueId  // Link to the previous clue
            });

            const savedClue = await clue.save();  // Save clue to the database
            previousClueId = savedClue._id;  // Update previous clue reference to current

            return savedClue._id;  // Collect the clue ID
        }));
        const startClue=clueIds[0];
        const newHunt = new Hunt({
            title,
            description,
            startClueId:startClue
        });

        const savedHunt = await newHunt.save();
        res.status(201).json({ success: true, data: savedHunt });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


// Get all Hunts
exports.getAllHunts = async (req, res) => {
    try {
        const hunts = await Hunt.find().populate('clues');  // Populate clues if they are referenced
        res.status(200).json({ success: true, data: hunts });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get a single Hunt by ID
exports.getHuntById = async (req, res) => {
    try {
        const hunt = await Hunt.findById(req.params.id).populate('clues');
        if (!hunt) {
            return res.status(404).json({ success: false, message: 'Hunt not found' });
        }
        res.status(200).json({ success: true, data: hunt });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.solveClue=async(req,res)=>{
    try{
        // getting user details via profile authentication 
        const user=await User.findById(req.user._id);
        // getting huntId via parameters in url
        const huntId=req.params.id;
        const hunt=await Hunt.findById(huntId);
        if(!hunt){
            return res.status(404).json({
                message:'Invalid Hunt id is provided'
            })
        }
        // fetching currentClueId
        const currentClueId=hunt._id;
        if(currentClueId.isDestinationReached){
            user.activeHunts.remove(huntId);
            user.completedHunts.add(huntId);
            await user.save();
        }
        const clue=await Clue.findById(currentClueId);
        hunt.nextClueId=clue.nextClueId;
        await hunt.save();
    }catch(error){
        res.status(404).json({
            message:error.message,
        })
    }
}

