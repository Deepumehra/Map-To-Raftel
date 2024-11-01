require('dotenv').config();
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=express();
const connectToDB =require('./config/db');
const authRouters=require('./routers/authRouter')
const PORT=5454 || process.env.PORT;

app.use(cors());

app.use(bodyParser.json());

app.use('/auth',authRouters);
app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originUrl} on server`,404));
})
app.listen(PORT,async ()=>{
    await connectToDB();
    console.log("Server running on port ",PORT)
})
module.exports=app;