const Leaderboard = require('../models/leaderboardModel.js');
const mongoose = require('mongoose');
const Hunt = require('../models/huntSchema.js');// Assuming your Leaderboard model is here
const Team = require('../models/teamModel.js'); // Assuming your Team model is here
const Profile = require('../models/profileModel.js'); // Assuming your Profile model is here

exports.createLeaderboard = async (req, res) => {
    try {
        // Find the Hunt by its ID
        const hunt = await Hunt.findById(req.params.id);
        if (!hunt) {
            return res.status(404).json({
                message: 'Hunt with given ID not found'
            });
        }

        // Extract totalUsers (array of profileIds) from the Hunt schema
        const totalUsers = hunt.totalUsers;

        // Array to store individual scores
        const individualScores = [];

        // Array to store team scores
        const teamScores = [];

        // Iterate over totalUsers (profileIds) to calculate individual scores
        for (const userId of totalUsers) {
            const profile = await Profile.findById(userId);
            if (!profile) {
                continue; // Skip if profile is not found
            }

            // Calculate individual score and completion time
            const team = await Team.findOne({ 'players.profileId': userId, 'hunts.huntId': hunt._id });
            if (!team) {
                continue; // Skip if no team found for the user in this hunt
            }

            const huntData = team.hunts.find(h => h.huntId.toString() === hunt._id.toString());

            // Assuming the score is stored under hunt.score in the team schema
            const score = huntData ? huntData.score : 0;
            const completionTime = huntData ? huntData.endDate : null; // End date if the hunt is completed

            // Add individual score entry to the array
            individualScores.push({
                playerId: profile._id,
                score: score,
                completionTime: completionTime,
                rank: 0, // Rank will be calculated later
            });
        }

        // Iterate over teams to calculate team scores
        for (const team of hunt.teams) {
            const teamObj = await Team.findById(team.teamId); // Assuming teams are in an array
            if (!teamObj) {
                continue; // Skip if no team found
            }

            // Calculate the team's score (You can sum up individual scores or have a specific logic for it)
            let totalTeamScore = 0;
            const completionTimes = [];

            // Sum up individual scores for each player in the team
            for (const player of teamObj.players) {
                const playerId = player.profileId;
                const individualScore = individualScores.find(ind => ind.playerId.toString() === playerId.toString());
                if (individualScore) {
                    totalTeamScore += individualScore.score;
                    completionTimes.push(individualScore.completionTime);
                }
            }

            // Calculate team completion time (take the earliest completion time from all players)
            const teamCompletionTime = Math.min(...completionTimes.filter(time => time !== null));

            // Add the team entry to the array
            teamScores.push({
                teamId: teamObj._id,
                score: totalTeamScore,
                completionTime: teamCompletionTime,
                rank: 0, // Rank will be calculated later
            });
        }

        // Create or update the leaderboard for the hunt
        let leaderboard = await Leaderboard.findOne({ huntId: hunt._id });
        if (!leaderboard) {
            leaderboard = new Leaderboard({
                huntId: hunt._id,
                individualScores: individualScores,
                teamScores: teamScores,
            });
        } else {
            leaderboard.individualScores = individualScores; // Update individual scores
            leaderboard.teamScores = teamScores; // Update team scores
        }

        // Sort and update ranks for both individual and team scores
        await leaderboard.updateRanks(); // This method will update ranks for both

        // Save the leaderboard
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
