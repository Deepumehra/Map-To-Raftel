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
    }],
    leader:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
    },
    // List of hunts that the team has participated in
    hunts: {
        type: [{
            huntId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Hunt',
                required: true // Reference to the Hunt model
            },
            startDate: {
                type: Date,
                default: Date.now, // When the team joined the hunt
            },
            endDate: {
                type: Date,
                default: null, // Will be updated when the hunt ends
            },
            status: {
                type: String,
                enum: ['ongoing', 'completed'],
                default: 'ongoing', // Status of the hunt for the team
            },
            score: {
                type: Number,
                default: 0, // The score for this specific hunt
            },
            currentClueId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Clue',
                required:false,
                default: null, // Current clue for the hunt, initialized to null
            },
            solvedClues: {
                type: [{
                    clueId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Clue',
                    },
                    solvedAt: {
                        type: Date,
                        default: Date.now,
                    },
                }],
                default: [],
            },
        }],
        default: []
    },

    // Track the current hunt and progress of the team
    currentHunt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hunt',
        default: null, // Default to null
    },

    // Track the total score of the team
    score: {
        type: Number,
        default: 0, // Total score across all hunts
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
