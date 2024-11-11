const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    huntId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hunt',
        required: true,
    },

    // Individual leaderboard entries
    individualScores:{
        type:[{
                playerId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Profile',
                    required: true,
                },
                score: {
                    type: Number,
                    default: 0,
                },
        }],
        default:[],
    } ,
    // Team leaderboard entries
    teamScores: {
        type:[{
                teamId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Team',
                    required: true,
                },
                score: {
                    type: Number,
                    default: 0,
                },
            }],
        default:[],
    }
});

// Automatically update ranks based on scores
leaderboardSchema.methods.updateRanks = function() {
    // Sort individual scores and assign ranks
    this.individualScores.sort((a, b) => b.score - a.score);
    this.individualScores.forEach((entry, index) => {
        entry.rank = index + 1;
    });
    // Sort team scores and assign ranks
    this.teamScores.sort((a, b) => b.score - a.score);
    this.teamScores.forEach((entry, index) => {
        entry.rank = index + 1;
    });

    return this.save();
};

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
