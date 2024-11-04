const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'User Name is required'],
        minlength: [5, 'User Name  must be atleast 5 characters'],
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
        currentClueIds: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clue'
        },
        startDate: {
            type: Date,
            default: Date.now,
        }
    }],
    description:String,
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{10}$/, 'Phone number must be a 10-digit number.'],
    },
})
const Profile = mongoose.model('Profile', UserSchema);
module.exports = Profile;
