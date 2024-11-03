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

exports.solveClue = async (req, res) => {
    try {
        // Get user details
        const user = await User.findById(req.user._id);
        
        // Get hunt details
        const huntId = req.params.id;
        const hunt = await Hunt.findById(huntId);
        if (!hunt) {
            return res.status(404).json({ message: 'Invalid Hunt id provided' });
        }

        // Locate the active hunt in user's activeHunts array
        const activeHunt = user.activeHunts.find(h => h.huntId.toString() === huntId);
        if (!activeHunt) {
            return res.status(404).json({ message: 'Hunt is not active for this user' });
        }

        // Fetch current clue
        const currentClue = await Clue.findById(activeHunt.currentClueIds);
        if (!currentClue) {
            return res.status(404).json({ message: 'Clue not found' });
        }

        // Check if this clue is the destination
        if (currentClue.isDestinationReached) {
            // Remove hunt from active hunts
            user.activeHunts = user.activeHunts.filter(hunt => hunt.huntId.toString() !== huntId);
            
            // Add hunt to completed hunts with completion date
            user.completedHunts.push({
                huntId: huntId,
                completionDate: new Date(),
            });
            await user.save();

            return res.status(200).json({ message: 'Destination reached! Hunt completed.' });
        }

        // Update currentClueIds to the next clue in the hunt
        activeHunt.currentClueIds = currentClue.nextClueId;
        await user.save();

        res.status(200).json({ message: 'Clue solved! Proceed to the next clue.', nextClueId: currentClue.nextClueId });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


exports.getClueById=async(req,res)=>{
    try{
        const clue=await Clue.findById(req.params.id);
        res.status(200).json({
            message:"Clue with id found",
            clue
        })
    }catch(err){
        res.status(500).json({
            message: err.message,
        });
    }
}

