const mongoose=require("mongoose");
const HuntSchema=new mongoose.Schema({
    title:String,
    description:String,
    huntType:{
        enum:['Completed','Active','Untouched'],
        default:'Active',
        required:'Hunt type must be there',
    },
    status:{
        type:String,
        enum:["SOLVED","UNSOLVED","PARTIAL"],
        default:"UNSOLVED",
    },
    currentClueId:{
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