require('dotenv').config();
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=express();
const connectToDB =require('./config/db');
const authRouters=require('./routers/authRouter');
const huntRouters=require('./routers/huntRouter');
const teamRouter=require('./routers/teamRouter');
const leaderboardRouter=require('./routers/leaderboardRouter');
const morgan = require('morgan');
const PORT=5454 || process.env.PORT;
app.use(morgan());
app.use(cors());

app.use(bodyParser.json());

app.use('/auth',authRouters);
app.use('/hunt',huntRouters);
app.use('/team',teamRouter);
app.use('/leaderBoard',leaderboardRouter);
app.listen(PORT,async ()=>{
    await connectToDB();
    console.log("Server running on port ",PORT)
})
module.exports=app;