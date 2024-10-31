const mongoose=require('mongoose');
const ClueSchema=new mongoose.Schema({
    clueId:String,
    description:String,
    hint:{
        type:String,
        select:false
    },
    location:String,
    sequenceOrder:Number
});
const Clue=mongooose.model("Clue",ClueSchema);
module.exports=Clue;