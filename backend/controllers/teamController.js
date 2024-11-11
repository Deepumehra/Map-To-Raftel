const Clue = require('../models/clueSchema.js');
const Team = require('../models/teamModel.js');
const Hunt= require('../models/huntSchema.js');
// Create a new team
exports.createTeam = async (req, res) => {
    try {
        console.log("Req Body :",req.body);
        const team = await Team.create(req.body);
        res.status(201).json(team);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a specific team by ID
exports.getTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: "Team not found" });
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a team by ID
exports.updateTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!team) return res.status(404).json({ message: "Team not found" });
        res.status(200).json(team);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a team by ID
exports.deleteTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) return res.status(404).json({ message: "Team not found" });
        res.status(200).json({ message: "Team deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a player to a team
exports.addPlayer = async (req, res) => {
    try {
        const {profileId}=req.body;
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: "Team not found" });
        if(profileId!=team.leader){
            res.status(400).json({
                message:"Team Leader can add team members only",
            })
        }
        team.players.push(req.body); // req.body should contain player data
        await team.save();
        res.status(200).json(team);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Join a hunt
exports.joinHunt = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: "Team not found" });
        team.hunts.push(req.body);
        team.currentHunt = req.body.huntId;
        const huntId=req.body.huntId;
        const hunt=await Hunt.findById(huntId);
        hunt.teams.push(req.params.id);
        team.joinedAt = Date.now();
        await team.save();
        await hunt.save();
        res.status(200).json({ message: "Team joined the hunt", team });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Solve a clue and update progress
exports.solveClue = async (req, res) => {
    try {
        // Fetch team by ID
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: "Team not found" });

        const { profileId, huntId } = req.body;
        // Find the hunt by its ID
        const hunt = team.hunts.find(h => h.huntId.toString() === huntId);
        if (!hunt) return res.status(404).json({ message: "Hunt not found for this team" });
        console.log("Hunt :",hunt);
        // Get current clue from hunt
        const currentClueId = hunt.currentClueId;
        if (!currentClueId) return res.status(400).json({ message: "No current clue found for the hunt" });

        // Fetch the clue by ID
        const clue = await Clue.findById(currentClueId);
        if (!clue) return res.status(404).json({ message: "Clue not found" });
        console.log("Clue :",clue);
        // If there is a next clue, solve this one and move to the next clue
        if (clue.nextClueId) {
            hunt.solvedClues.push({
                clueId: currentClueId,
                solvedBy: profileId,
                solvedAt: new Date(),
            });
            hunt.currentClueId = clue.nextClueId; // Set the next clue as current clue
            hunt.score += clue.points; // Make sure `points` exist, or default to 0
            team.score+=clue.points || 0;
        } else {
            // If no next clue, mark hunt as completed
            hunt.solvedClues.push({
                clueId: currentClueId,
                solvedBy: profileId,
                solvedAt: new Date(),
            });
            hunt.score += clue.points || 0; // Ensure points exist
            hunt.status = "completed"; // Mark hunt as completed
            team.score+=clue.points || 0;
            hunt.endDate = new Date(); // Set the end date of the hunt
            hunt.currentClueId = null; // No more clues, set current clue to null
        }
        console.log("Hunt :",hunt);
        // Save the updated team
        await team.save();

        // Return success message
        res.status(200).json({ message: "Clue solved successfully!", team });
    } catch (error) {
        // Return any caught errors
        res.status(400).json({ message: error.message });
    }
};

// Update team score
exports.updateScore = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: "Team not found" });

        team.score += req.body.score; // req.body.score is the score to be added
        await team.save();
        res.status(200).json({ message: "Score updated", team });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
