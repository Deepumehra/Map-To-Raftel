const mongoose=require("mongoose");
const HuntSchema=new mongoose.Schema({
    title:String,
    description:String,
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
        type: String,
    }
});
const Hunt=mongoose.model("Hunt",HuntSchema);
module.exports=Hunt;