const mongoose=require('mongoose');
const Hunt = require('../models/huntSchema');  // Import Hunt model
const Clue = require('../models/clueSchema')// Import Clue model
const Profile = require('../models/profileModel')

exports.createHunt = async (req, res) => {
    try {
        const { title, description, clues, createdBy } = req.body;
        let totalPoints = 0;
        console.log("Received Hunt Data:", req.body);

        // Save each clue and store their IDs
        let previousClueId = null;  
        const clueIds = [];

        // Step 1: Save each clue without linking nextClueId first
        for (let i = clues.length - 1; i >= 0; i--) {
            const clueData = clues[i];

            if (i === clues.length - 1) {
                clueData.isDestinationReached = true;
            }

            const clue = new Clue({
                ...clueData,
                nextClueId: previousClueId
            });

            totalPoints += clue.points;

            // Save the current clue
            const savedClue = await clue.save();
            console.log(`Saved clue with ID ${savedClue._id}, linking to previousClueId: ${previousClueId}`);

            // Update references
            previousClueId = savedClue._id;
            clueIds.push(savedClue._id);  // Collect the ID
        }

        // Step 2: Update `nextClueId` fields in saved Clues
        for (let i = clueIds.length - 1; i > 0; i--) {
            await Clue.findByIdAndUpdate(clueIds[i], { nextClueId: clueIds[i - 1] });
            console.log(`Updated clue ID ${clueIds[i]} with nextClueId: ${clueIds[i - 1]}`);
        }

        // Final Hunt creation
        const startClue = clueIds[clueIds.length - 1];
        const newHunt = new Hunt({
            title,
            description,
            startClueId: startClue,
            totalPoints,
            createdBy: createdBy ? createdBy.toString() : 'admin',
        });

        const savedHunt = await newHunt.save();
        res.status(200).json({ success: true, data: savedHunt });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};




exports.getAllHunts = async (req, res) => {
    try {
        const hunts = await Hunt.find({})
        console.log("Hunts :",hunts);
        res.status(200).json({ success: true, hunts });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


exports.getAllHuntsById = async (req, res) => {
    try {
        console.log("Req body :",req);
        const {profileId }= req.query;
        console.log("Profile Id :",profileId);
        if (!profileId) {
            return res.status(400).json({ success: false, message: "Profile ID is required" });
        }
        if (!mongoose.Types.ObjectId.isValid(profileId)) {
            return res.status(400).json({ success: false, message: "Invalid Profile ID format" });
        }
        // console.log("Profile Id type :",profileId.Types());
        // Fetch the profile and populate hunt details for active and completed hunts
        const profile = await Profile.findById(profileId)
            .populate({
                path: 'activeHunts.huntId',
                model: 'Hunt'
            })
            .populate({
                path: 'completedHunts.huntId',
                model: 'Hunt'
            });
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        // Process active hunts with detailed information
        const activeHuntDetails = profile.activeHunts.map(activeHunt => ({
            huntId: activeHunt.huntId._id,
            huntName: activeHunt.huntId.name,  // Assuming the Hunt model has a 'name' field
            startClueId: activeHunt.startClueId,
            currentClueId: activeHunt.currentClueId,
            startDate: activeHunt.startDate,
            solvedClues: activeHunt.solvedClues.map(clue => ({
                clueId: clue.clueId,
                dateSolved: clue.dateSolved
            }))
        }));

        // Process completed hunts with detailed information
        const completedHuntDetails = profile.completedHunts.map(completedHunt => ({
            huntId: completedHunt.huntId._id,
            huntName: completedHunt.huntId.name, // Assuming the Hunt model has a 'name' field
            completionDate: completedHunt.completionDate,
            solvedClues: completedHunt.solvedClues.map(clue => ({
                clueId: clue.clueId,
                dateSolved: clue.dateSolved
            }))
        }));

        // Send response with separate sections for active and completed hunts
        res.status(200).json({
            success: true,
            data: {
                profileId: profile._id,
                userName: profile.userName,
                activeHunts: activeHuntDetails,
                completedHunts: completedHuntDetails
            }
        });
    } catch (error) {
        console.error("Error retrieving hunts:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


// Get a single Hunt by ID
exports.fetchHuntById = async (req, res) => {
    try {
        const {huntId}=req.body;
        const hunt = await Hunt.findById(huntId);
        if (!hunt) {
            return res.status(404).json({ success: false, message: 'Hunt not found' });
        }
        res.status(200).json({ success: true, data: hunt });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}   

exports.joinHunt=async(req,res)=>{
    try{
        const {profileId, huntId}=req.body;
        const profile=await Profile.findById(profileId);
        const activeHunt = profile?.activeHunts.find(hunt => hunt.huntId.toString() === huntId);

        if (activeHunt) {
            return res.status(404).json({ message: "User already Participating" });
        }

        const hunt = await Hunt.findById(huntId);

        if (!hunt) {
            return res.status(404).json({message: "Hunt not found"});
        }
        const startClueId = hunt.startClueId;
        profile.activeHunts.push({
            huntId:huntId,
            startClueId:startClueId,
            currentClueId:startClueId,
            startDate:new Date(),
            solvedClues:[]
        })
        hunt.totalUsers.push(profileId);
        await profile.save();
        await hunt.save();
        res.status(200).json({
            message:"User successfully joined the hunt",
            profile,
        })
    }catch(error){
        res.status(500).json({ success: false, error: error.message });
    }
}
exports.solveClue = async (req, res) => {
    try {
        const { profileId, huntId, currentClueId, points } = req.body;
        const profile = await Profile.findById(profileId);
        const hunt = await Hunt.findById(huntId);

        // Find the active hunt with the given huntId
        const activeHunt = profile.activeHunts.find(hunt => hunt.huntId.toString() === huntId);

        if (!activeHunt) {
            return res.status(404).json({ message: "Active hunt not found" });
        }

        // Correct the property name and check if the currentClueId matches
        if (activeHunt.currentClueId.toString() !== currentClueId) {
            return res.status(400).json({ message: "Current clue does not match" });
        }

        // Fetch the current clue details
        const currentClue = await Clue.findById(currentClueId);

        // Mark currentClueId as solved
        activeHunt.solvedClues.push({
            clueId: currentClueId,
            dateSolved: new Date()
        });
        activeHunt.points += points;
        profile.points += points;

        // Check if there's a next clue or if this hunt is completed
        if (currentClue.nextClueId != null) {
            activeHunt.solvedClues.push({
                clueId: activeHunt.currentClueId,
                dateSolved: new Date()
            });
            // If there is a next clue, update currentClueId to the next clue
            activeHunt.currentClueId = currentClue.nextClueId;
            activeHunt.points += points;
            
        } else {
            // If no next clue, move the hunt to completedHunts
            profile.completedHunts.push({
                huntId: activeHunt.huntId,
                completionDate: new Date(),
                solvedClues: [...activeHunt.solvedClues]
            });
            hunt.numberOfPlayersCompleted++;
            hunt.totalUsers.remove(profileId);
            // Remove the hunt from activeHunts
            profile.activeHunts = profile.activeHunts.filter(hunt => hunt.huntId.toString() !== huntId);
        }

        // Save the updated profile and hunt
        await profile.save();
        await hunt.save();
        return res.status(200).json({ message: "Clue solved successfully", profile });
    } catch (error) {
        console.error("Error solving clue:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

exports.fetchClueById=async(req,res)=>{
    try{
        const {clueId}=req.body;
        if(!clueId){
            return res.status(400).json({
                message:"Clue Id not found"
            })
        }
        const clueData=await Clue.findById(clueId);
        if(!clueData){
            return res.status(400).json({
                message:"Invalid clue Id"
            })       
        }
        res.status(200).json({
            message:"Clue Details fetched successfully",
            clueData
        })
    }catch(error){
        return res.status(500).json({
            message:error.message,
        })
    }
}
exports.getClueById=async(req,res)=>{
    try{
        const clue=await Clue.findById(req.params.id);
        const nextClueId=clue.nextClueId;
        if(!nextClueId){
            res.status(200).json({
                message:"Treasure is here"
            })
        }
        const nextClue=await Clue.findById(nexrClueId);
        res.status(200).json({
            message:"Clue with id found",
            nextClue,
        })
    }catch(err){
        res.status(500).json({
            message: err.message,
        });
    }
}

exports.searchHunt = async (req, res) => {
    try {
        const { keyword } = req.body;
        const query = {};

        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } }, // Case-insensitive search for title
                { description: { $regex: keyword, $options: 'i' } } // Optional: search by description as well
            ];
        }

        const hunts = await Hunt.find(query);
        
        res.status(200).json({ success: true, hunts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};