const Leaderboard = require('../models/leaderboardModel.js');
const mongoose = require('mongoose');
const Hunt = require('../models/huntSchema.js');// Assuming your Leaderboard model is here
const Team = require('../models/teamModel.js'); // Assuming your Team model is here
const Profile = require('../models/profileModel.js'); // Assuming your Profile model is here

exports.createLeaderboard = async (req, res) => {
    try {
        const { id } = req.params;
        const hunt = await Hunt.findById(id);
        if (!hunt) {
            return res.status(404).json({
                message: 'Hunt with given ID not found'
            });
        }
        const individualScores = [];
        const teamScores = [];
        for (const userId of hunt.totalUsers) {
            const profile = await Profile.findById(userId);
            if (!profile) continue;

            const userHunt = profile.activeHunts.find(h => h.huntId.toString() === id);
            if (!userHunt) continue;
            const score = userHunt.points;
            console.log("Active Hunt :",userHunt);
            console.log("Score :",score);
            // console.log("Completion time :",completionTime);
            individualScores.push({
                playerId: profile._id,
                score: score,
                completionTime:null,
                rank: 0
            });
        }
        console.log("Individuals Score:",individualScores);
        for (const teamId of hunt.teams) {
            const teamObj = await Team.findById(teamId);
            if (!teamObj) continue;

            const teamHuntData = teamObj.hunts.find(h => h.huntId.toString() === id);
            if (!teamHuntData) continue;

            const totalTeamScore = teamHuntData.score;
            const startDate = teamHuntData.startDate;
            teamScores.push({
                teamId: teamObj._id,
                score: totalTeamScore,
                rank: 0
            });
        }

        let leaderboard = await Leaderboard.findOne({ huntId: hunt._id });
        if (!leaderboard) {
            leaderboard = new Leaderboard({
                huntId: hunt._id,
                individualScores: individualScores,
                teamScores: teamScores,
            });
        } else {
            leaderboard.individualScores = individualScores;
            leaderboard.teamScores = teamScores;
        }

        await leaderboard.updateRanks();
        await leaderboard.save();

        res.status(200).json({
            message: 'Leaderboard created successfully',
            leaderboard,
        });

    } catch (err) {
        res.status(500).json({
            message: 'Error while creating leaderboard',
            error: err.message,
        });
    }
};


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
        const { huntId, playerId, score } = req.body;

        let leaderboard = await Leaderboard.findOne({ huntId })
        console.log("Leaderbboard :",leaderboard);
        if (!leaderboard) {
            leaderboard = new Leaderboard({ huntId, individualScores: [], teamScores: [] });
        }
        // Find or create an individual score entry
        let playerEntry = leaderboard.individualScores.find(entry => entry.playerId.toString() === playerId.toString());
        if (!playerEntry) {
            playerEntry = { playerId, score: 0 };
            leaderboard.individualScores.push(playerEntry);
        }

        // Update the score and completion time if provided
        playerEntry.score += score;
        await leaderboard.updateRanks();
        res.status(200).json({ message: "Score updated", leaderboard });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update score for a team
exports.updateTeamScore = async (req, res) => {
    try {
        let { huntId, teamId, score } = req.body;

        // Validate that huntId and teamId are 24-character valid ObjectId strings
        if (huntId.length !== 24 || teamId.length !== 24) {
            return res.status(400).json({ message: "Invalid huntId or teamId length" });
        }

        // Convert huntId and teamId to ObjectId
        const huntObjectId = mongoose.Types.ObjectId(huntId);
        const teamObjectId = mongoose.Types.ObjectId(teamId);

        // Convert score to a number
        score = Number(score);
        if (isNaN(score)) {
            return res.status(400).json({ message: "Score must be a valid number" });
        }

        // Find or create the leaderboard entry
        let leaderboard = await Leaderboard.findOne({ huntId: huntObjectId });
        if (!leaderboard) {
            leaderboard = new Leaderboard({ huntId: huntObjectId, individualScores: [], teamScores: [] });
        }

        // Find or create the team score entry
        let teamEntry = leaderboard.teamScores.find(entry => entry.teamId.toString() === teamObjectId.toString());
        if (!teamEntry) {
            teamEntry = { teamId: teamObjectId, score: 0 };
            leaderboard.teamScores.push(teamEntry);
        }

        // Update the team score
        teamEntry.score += score;

        // Update ranks and save the leaderboard
        await leaderboard.updateRanks();
        await leaderboard.save();

        res.status(200).json({ message: "Score updated", leaderboard });
    } catch (error) {
        res.status(500).json({ message: "Error while updating team score", error: error.message });
    }
};
