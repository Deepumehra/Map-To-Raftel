const mongoose=require("mongoose");
const HuntSchema=new mongoose.Schema({
    huntId:String,
    title:String,
    description:String,
    startDate:Date,
    endDate:Date,
    status:{
        type:String,
        enum:["SOLVED","UNSOLVED"],
        default:"UNSOLVED",
    },
    clues:[{
        type:mongoose.Schema.Types,ObjectId,
        ref:"Clue",
    }]
});
const Hunt=mongoose.model("Hunt",HuntSchema);
module.exports=Hunt;