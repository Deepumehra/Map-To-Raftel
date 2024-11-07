const Team = require('../models/Team');

// Create a new team
exports.createTeam = async (req, res) => {
    try {
        const team = await Team.create(req.body);
        res.status(201).json(team);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a specific team by ID
exports.getTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('players.profileId hunts currentHunt solvedClues.clues.clueId');
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
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: "Team not found" });

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

        team.currentHunt = req.body.huntId;
        team.joinedAt = Date.now();
        await team.save();
        res.status(200).json({ message: "Team joined the hunt", team });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Solve a clue and update progress
exports.solveClue = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: "Team not found" });

        const { huntId, clueId } = req.body;

        let huntProgress = team.solvedClues.find(h => h.huntId.toString() === huntId);
        if (!huntProgress) {
            huntProgress = { huntId, clues: [] };
            team.solvedClues.push(huntProgress);
        }

        huntProgress.clues.push({ clueId, solvedAt: Date.now() });
        await team.save();
        res.status(200).json({ message: "Clue solved!", team });
    } catch (error) {
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
};
