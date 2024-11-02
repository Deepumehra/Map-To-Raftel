const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    fullName:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    otp:String,
    isVerified:{
        type:Boolean,
        default:false,
    },
    new:{
        type:Boolean,
        default:false,
    },
    otpExpiresAt:{
        type:Date
    }
});
const User=mongoose.model('User',UserSchema);
module.exports=User;