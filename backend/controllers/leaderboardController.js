const Leaderboard = require('../models/Leaderboard');

// Get leaderboard for a specific hunt
exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Leaderboard.findOne({ huntId: req.params.huntId })
            .populate('individualScores.playerId')
            .populate('teamScores.teamId');

        if (!leaderboard) return res.status(404).json({ message: "Leaderboard not found for this hunt" });
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update score for an individual player
exports.updateIndividualScore = async (req, res) => {
    try {
        const { huntId, playerId, score, completionTime } = req.body;

        let leaderboard = await Leaderboard.findOne({ huntId });
        if (!leaderboard) {
            leaderboard = new Leaderboard({ huntId, individualScores: [], teamScores: [] });
        }

        // Find or create an individual score entry
        let playerEntry = leaderboard.individualScores.find(entry => entry.playerId.toString() === playerId);
        if (!playerEntry) {
            playerEntry = { playerId, score: 0 };
            leaderboard.individualScores.push(playerEntry);
        }

        // Update the score and completion time if provided
        playerEntry.score += score;
        if (completionTime) playerEntry.completionTime = completionTime;

        await leaderboard.updateRanks();
        res.status(200).json({ message: "Score updated", leaderboard });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update score for a team
exports.updateTeamScore = async (req, res) => {
    try {
        const { huntId, teamId, score, completionTime } = req.body;

        let leaderboard = await Leaderboard.findOne({ huntId });
        if (!leaderboard) {
            leaderboard = new Leaderboard({ huntId, individualScores: [], teamScores: [] });
        }

        // Find or create a team score entry
        let teamEntry = leaderboard.teamScores.find(entry => entry.teamId.toString() === teamId);
        if (!teamEntry) {
            teamEntry = { teamId, score: 0 };
            leaderboard.teamScores.push(teamEntry);
        }

        // Update the score and completion time if provided
        teamEntry.score += score;
        if (completionTime) teamEntry.completionTime = completionTime;

        await leaderboard.updateRanks();
        res.status(200).json({ message: "Score updated", leaderboard });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
