const mongoose=require('mongoose');
const ClueSchema=new mongoose.Schema({
    title:String,
    description:String,
    endingLat:Number,
    endingLong:Number,
    nextClueId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'clue',
    },
    isDestinationReached:{
        type:Boolean,
        default:false,
    },
    points: {
        type: Number,
        default: 0
    }
});
const Clue=mongoose.model("Clue",ClueSchema);
module.exports=Clue;