const mongoose=require("mongoose");
const HuntSchema=new mongoose.Schema({
    title:String,
    description:String,
    status:{
        type:String,
        enum:["SOLVED","UNSOLVED","PARTIAL"],
        default:"UNSOLVED",
    },
    startClueId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'clue',
    },
    numberOfPlayersCompleted:{
        type:Number,
        default:0,
    },
    totalPoints:Number,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
    }
});
const Hunt=mongoose.model("Hunt",HuntSchema);
module.exports=Hunt;