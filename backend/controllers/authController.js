const { oauth2client } = require("../config/googleConfig");
const User = require('../models/userModel');
require('dotenv').config();
const axios = require('axios');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { generateToken, getUserIdFromToken } = require('../config/jwtProvider.js');
const { sendOTPEmail } = require('../utils/sendOTPEmail');
const PasswordResetToken = require("../models/passwordResetToken.js");
const Profile = require("../models/profileModel");

const register = async (req, res) => {
    try {
        let { fullName, email, password } = req.body;
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({
                message: `User already exists with email: ${email}`
            });
        }

        password = await bcryptjs.hash(password, 8);
        const user = await User.create({
            fullName,
            email,
            password
        });

        const token = generateToken(user._id);
        return res.status(200).json({
            message: "Success",
            token
        });
    } catch (err) {
        console.error("Error in register function:", err); // This logs the error for debugging
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
const getUserDetails = async (req, res) => {
    try {
        console.log("Request headers:", req.headers);

        const authHeader = req.headers.authorization; // lowercase 'authorization'
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        console.log("Authorization Header:", authHeader);

        const jwt = authHeader.split(' ')[1];
        if (!jwt) {
            return res.status(401).json({ message: "Token missing in authorization header" });
        }

        let userId;
        try {
            userId = getUserIdFromToken(jwt);
        } catch (error) {
            console.error("Error extracting userId from token:", error);
            return res.status(400).json({ message: "Invalid token" });
        }

        if (!userId) {
            return res.status(400).json({ message: "Invalid token" });
        }

        console.log("Extracted userId:", userId);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User details",
            user
        });
    } catch (err) {
        console.error("Error in getUserDetails function:", err);
        res.status(500).json({ error: err.message || "Internal server error" });
    }
};


const login = async (req, res) => {
    const { password, email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: `User not found with email: ${email}`
            });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = generateToken(user._id);
        return res.status(200).json({
            message: "Login Success",
            token,
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
const saveProfile = async (req, res) => {
    console.log("Save Profile route reached");
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        
        const jwt = authHeader.split(' ')[1];
        if (!jwt) {
            return res.status(401).json({ message: "Token missing in authorization header" });
        }

        let userId;
        try {
            userId = getUserIdFromToken(jwt);
        } catch (error) {
            console.error("Error extracting userId from token:", error);
            return res.status(400).json({ message: "Invalid token" });
        }

        if (!userId) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User ID:", userId);
        console.log("Request Body:", req.body);
        const { name, phone, bio } = req.body;

        // Validate required fields
        if (!name || !phone || !bio) {
            return res.status(400).json({
                message: "All fields are necessary"
            });
        }

        // Create and save the profile
        const profile = await Profile.create({
            userName:name,
            userId:userId,
            completedHunts:[],
            activeHunts:[],
            description:bio,
            phoneNumber:phone
        });
        if(!profile){
            return res.status(400).json({message:"Profile creation failed"})
        }
        console.log("Profile created:", profile);

        // Send success response
        res.status(200).json({
            message: "Profile Created Successfully",
            profile
        });
    } catch (err) {
        // Handle unexpected errors
        console.error("Error creating profile:", err);
        return res.status(500).json({ error: err.message });
    }
};

    
const googleLogin = async (req, res) => {
    try {
        const { code } = req.query;
        
        // Get token from Google with authorization code
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);
        
        // Fetch user info from Google API
        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);
        console.log(userRes.data);
        
        // Destructure user details from the response
        const { email, name, picture, verified_email: verifiedEmail } = userRes.data;
        
        // Check if user exists
        let user = await User.findOne({ email });
        
        // If user doesn't exist, create a new user
        if (!user) {
            user = await User.create({
                fullName: name,
                email: email,
                new: verifiedEmail, // Changed `new` to `verifiedEmail` to avoid errors
                image: picture,
            });
        }

        // Generate a JWT for the user
        const token = generateToken(user._id);

        return res.status(200).json({
            message: 'Success',
            userDetails: user,
            jwt: token,
            image: picture,
        });
    } catch (e) {
        console.error(e); // Log the error for debugging
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};


const generateOTP = async (req, res) => {
    try {
        const { email } = req.body;
        await sendOTPEmail(email);
        res.status(200).json({
            message: `OTP sent to email: ${email}`
        });
    } catch (err) {
        res.status(500).json({ message: 'Error sending OTP' });
    }
}

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (Date.now() > user.otpExpiresAt) return res.status(400).json({ message: 'OTP expired' });

    const isMatch = await bcryptjs.compare(otp, user.otp);
    if (isMatch) {
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();
        res.status(200).json({ message: 'Email verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const resetToken = await PasswordResetToken.findOne({ token }).populate('user');
        if (!resetToken) {
            throw new Error("Reset Token is required");
        }
        if (resetToken.isExpired()) {
            await PasswordResetToken.deleteOne({ _id: resetToken._id });
            throw new Error("Token is expired");
        }
        const user = resetToken.user;
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        await PasswordResetToken.findByIdAndDelete(resetToken._id);
        res.status(200).json({ message: "Password updated successfully", status: true });
    } catch (err) {
        res.status(err instanceof Error ? 400 : 500).json({ error: err.message });
    }
}

const resetPasswordRequest = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");

        const resetToken = crypto.randomUUID();
        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 10);

        await PasswordResetToken.create({
            token: resetToken,
            user,
            expiryDate
        });

        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: user.email,
            subject: "Password Reset",
            text: `Click the following link to reset your password: http://localhost:5173/account/reset-password?token=${resetToken}`,
        });

        res.status(200).json({ message: "Password reset email sent successfully" });
    } catch (err) {
        res.status(500).json({ error: `Error sending password reset email: ${err.message}` });
    }
}

module.exports = { googleLogin, register, login,generateOTP, verifyOTP, resetPasswordRequest, resetPassword , getUserDetails,saveProfile};
