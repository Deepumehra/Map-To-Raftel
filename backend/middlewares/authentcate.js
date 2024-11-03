const {getUserIdFromToken}=require('../config/jwtProvider');
const User=require('../models/userModel');
const authenticate=async(req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(404).json({
                message:'Token not found',
            });
        }
        const userId=getUserIdFromToken(token);
        const user=User.findById(userId);
        user.password=null;
        req.user=user;
    }catch(err){
        return res.status(500).send({message:err.message})
    }
    next();
}
module.exports=authenticate;