const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dateAchieved: {
        type: Date,
        default: Date.now,
    },
    description: String,
});

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'User Name is required'],
        minlength: [5, 'User Name must be at least 5 characters'],
        trim: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userType: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    completedHunts: [{
        huntId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hunt',
            required: true,
        },
        completionDate: {
            type: Date,
            default: Date.now,
        },
        solvedClues: [{
            clueId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Clue',
            },
            dateSolved: {
                type: Date,
                default: Date.now,
            }
        }]

    }],
    activeHunts: [{
        huntId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hunt',
            required: true,
        },
        startClueId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clue',
        },
        currentClueId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clue',
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
        solvedClues: [{
            clueId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Clue',
            },
            dateSolved: {
                type: Date,
                default: Date.now,
            }
        }],
        points:{
            type:Number,
            default:0,
        }

    }],
    description: String,
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{10}$/, 'Phone number must be a 10-digit number.'],
    },
    badges: [BadgeSchema], // Array of badge objects
    globalRank: {
        type: Number,
        default: 9859, // Default value can be adjusted as needed
    },
    points: {
        type: Number,
        default: 0, // Initial value for a new user
    },
    avatarIndex: {
        type: Number,
        default: 0, // Initial value for a new user
    }
});

const Profile = mongoose.model('Profile', UserSchema);
module.exports = Profile;
