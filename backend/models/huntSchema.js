const mongoose=require("mongoose");
const HuntSchema=new mongoose.Schema({
    huntId:String,
    title:String,
    description:String,
    startDate:Date,
    endDate:Date,
    huntType:{
        enum:['Completed','Active','Untouched'],
        required:'Hunt type must be there',
    },
    status:{
        type:String,
        enum:["SOLVED","UNSOLVED","PARTIAL"],
        default:"UNSOLVED",
    },
    clues:[{
        type:mongoose.Schema.Types,ObjectId,
        ref:"Clue",
    }],
    totalClues:Number,
    cluesSolved:Number,
});
const Hunt=mongoose.model("Hunt",HuntSchema);
module.exports=Hunt;