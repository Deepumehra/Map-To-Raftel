const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    huntId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hunt',
        required: true,
    },

    // Individual leaderboard entries
    individualScores: [{
        playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
            required: true,
        },
        score: {
            type: Number,
            default: 0,
        },
        completionTime: {
            type: Date,  // Record the time of completion if needed
        },
        rank: {
            type: Number,
        },
    }],
    // Team leaderboard entries
    teamScores: [{
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            required: true,
        },
        score: {
            type: Number,
            default: 0,
        },
        completionTime: {
            type: Date, // Record the time of completion if needed
        },
        rank: {
            type: Number,
        },
    }],
});

// Automatically update ranks based on scores
leaderboardSchema.methods.updateRanks = function() {
    // Sort individual scores and assign ranks
    this.individualScores.sort((a, b) => b.score - a.score || a.completionTime - b.completionTime);
    this.individualScores.forEach((entry, index) => {
        entry.rank = index + 1;
    });
    // Sort team scores and assign ranks
    this.teamScores.sort((a, b) => b.score - a.score || a.completionTime - b.completionTime);
    this.teamScores.forEach((entry, index) => {
        entry.rank = index + 1;
    });

    return this.save();
};

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
