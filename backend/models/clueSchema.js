const mongoose=require('mongoose');
const ClueSchema=new mongoose.Schema({
    title:String,
    description:String,
    startingLat:Number,
    startingLong:Number,
    endingLat:Number,
    endingLong:Number,
    nextClueId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'clue',
    },
    isDestinationReached:{
        type:Boolean,
        default:false,
    }
});
const Clue=mongoose.model("Clue",ClueSchema);
module.exports=Clue;