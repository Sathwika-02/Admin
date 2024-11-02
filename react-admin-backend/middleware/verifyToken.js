const jwt=require('jsonwebtoken')
const User=require('../Models/User')
const JWT_SECRET="THIS IS SECRETE"
const isAdmin=async(req,res,next)=>{
    try{
        console.log("req",req.cookies)
         const token=req.cookies.token;
         console.log("Token",token);
        if(!token){
            return res.status(401).json({message:"'Unauthorized:No token provided'"});
        }
        const decoded=jwt.verify(token,JWT_SECRET)
        
        const user=await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({message:"user not found"})
        }
       if(user.role!=='admin'){
        return res.status(403).json({message:'Unauthorized User is not admin'})
       }
       req.user=user
       next();
    }
    catch(error){
         console.log(error);
    }
}
module.exports=isAdmin;