const { oauth2client } = require("../config/googleConfig");
const axios=require('axios');
const googleLogin=async (req,res)=>{
    try{
        // getting the code generated a frontend via request query
        const {code}=req.query;
        const googleRes=await oauth2client.getToken(code);
        // setting the tokens authorized by google auth server
        oauth2client.setCredentials(googleRes.tokens);
        // getting user info via access token 
        const userRes=await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);
        const obj=userRes.data;
        return res.status(200).json({
            message:'Success',
            obj
        })
    }catch(e){
        res.status(500).json({
            message:'Internal Server Error'
        })
    }
}
module.exports={googleLogin};