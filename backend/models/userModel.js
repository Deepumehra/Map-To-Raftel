const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    fullName:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    profileId: String
});
const User=mongoose.model('User',UserSchema);
module.exports=User;