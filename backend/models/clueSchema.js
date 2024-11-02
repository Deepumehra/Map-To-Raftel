const mongoose=require('mongoose');
const ClueSchema=new mongoose.Schema({
    clueId:String,
    description:String,
    hint:{
        type:String,
        select:false
    },
    location:String,
    coodinates:[{
        type:String,
        required:"Coordinates must be required",
    }],
    nextClueId:{
        type:mongoose.Schema.Types,ObjectId,
        ref:"Clue",
    },
    isDestinationReached:Boolean,
    sequenceOrder:Number
});
const Clue=mongooose.model("Clue",ClueSchema);
module.exports=Clue;