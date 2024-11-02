const mongoose=require('mongoose');
const UserSchema=new mongooose.Schema({
    userName:{
        type:String,
        required:[true,'User Name is required'],
        minlength:[5,'User Name  must be atleast 5 characters'],
        trim:true,
        unique:true,
    },
    userDetails:{
      type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    userType:{
        type:String,
        enum:['USER','ADMIN'],
        default:'ADMIN'
    },
    completedHunts:[{
        huntId:{
          type:mongoose.Schema.Types,ObjectId,
        ref:"Hunt",
        },
    }],
    activeHunts:[{
      huntId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hunt', 
        required: true,
      },
      solvedClueIds: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Clue',
        }
      ],
      totalClues:Number,
      numberOfolvedClues:Number
    }]
})
const Profile=mongoose.model('Profile',UserSchema);
module.exports=Profile;
