const mongoose=require('mongoose');
const UserSchema=new mongooose.Schema({
    userName:{
        type:String,
        required:[true,'User Name is required'],
        minlength:[5,'User Name  must be atleast 5 characters'],
        trim:true
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      minlength: [5, 'Full name must be at least 5 characters'],
      lowercase: true,
      trim: true, 
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please fill in a valid email address',
      ], // Matches email against regex
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, 
    },
    userType:{
        type:String,
        enum:['USER','ADMIN'],
        default:'ADMIN'
    }
})
const Profile=mongoose.model('Profile',UserSchema);
module.exports=Profile;
