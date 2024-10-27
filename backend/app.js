const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=express();
const connectToDB =require('./config/db');

const PORT=5454 || process.env.PORT;

app.use(cors());
app.use(bodyParser.json());


app.listen(PORT,async ()=>{
    await connectToDB();
    console.log("Server running on port ",PORT)
})
module.exports=app;