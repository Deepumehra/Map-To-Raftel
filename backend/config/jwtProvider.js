require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY=process.env.SECRET_KEY;
const generateToken = (userId) => {
    try {
        if (!SECRET_KEY) {
            console.error('SECRET_KEY is not defined in the environment');
            throw new Error('Missing SECRET_KEY');
        }
        const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '48h' });
        return token;
    } catch (e) {
        console.error('Error in generateToken:', e.message); // Log error details
        throw new Error('Jwt is not created');
    }
};

const getUserIdFromToken=(token)=>{
    const decodedToken=jwt.verify(token,SECRET_KEY)
    return decodedToken.userId
}
module.exports={generateToken,getUserIdFromToken};