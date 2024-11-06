const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    // Array of players with profileId and current location
    players: [{
        profileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
            required: true, // Ensure each player has a profile
        },
        location: {
            longitude: {
                type: Number,
                default: undefined
            },
            latitude: {
                type: Number,
                default: undefined
            }
        },
        // Adding a status for each player, like if they're active or idle
        status: {
            type: String,
            enum: ['active', 'idle', 'disconnected'],
            default: 'active'
        },
        // Track the timestamp of each player’s last activity for better game management
        lastActiveAt: {
            type: Date,
            default: Date.now
        }
    }],

    // List of hunts that the team has participated in
    hunts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hunt',
    }],

    // Track the current hunt and progress of the team
    currentHunt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hunt',
    },
    
    // To store the clues that the team has solved for each hunt
    solvedClues: [{
        huntId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hunt'
        },
        clues: [{
            clueId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Clue'
            },
            solvedAt: {
                type: Date,
                default: Date.now
            }
        }]
    }],

    // Track the total score of the team
    score: {
        type: Number,
        default: 0
    },

    // The date when the team joined the hunt
    joinedAt: {
        type: Date,
        default: Date.now
    },

    // To maintain timestamps of important events
    timestamps: {
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
});

// Middleware to update the timestamp
teamSchema.pre('save', function(next) {
    this.timestamps.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Team', teamSchema);
