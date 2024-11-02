const User=require('../Models/User')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const JWT_SECRET="THIS IS SECRETE"
const register=async(req,res)=>{
    try{
        const {username,email,password}=req.body
        const existUser=await User.findOne({email})
        if(existUser){
            return res.status(401).json({success:false,message:"User already exist"})
        }
        const hashedpassword=await bcryptjs.hashSync(password,10)
        const newUser=new User({username,email,password:hashedpassword});
        await newUser.save()
        res.status(200).json({message:"user registered successfully",newUser});
       
    }
    catch(error){
      res.status(500).json({success:false,message:"Internal server error"});
      console.log(error);
    }
}

const Login=async(req,res)=>{
    try{
      const {email,password}=req.body
      const user=await User.findOne({email})
      if(!user){
        return res.status(404).json({success:false,message:"Invalid credentials"})
      }
      const ispasswordvalid=await bcryptjs.compare(password,user.password)
      if(!ispasswordvalid){
        return res.status(404).json({success:false,message:"Invalid credentials"})
      }
      const token=jwt.sign({userId:user._id},JWT_SECRET)
    //   res.cookie('token',token,{
    //     httpOnly:true,
    //     secure:false,
    //     maxAge:360000
    //   })
      res.cookie('token', token, {
        httpOnly: true,                   // Prevents JavaScript access to the cookie
        secure: process.env.NODE_ENV === 'production', // Secure only in production (HTTPS)
        sameSite: 'None',                 // Required for cross-origin requests
      });
      
      res.status(200).json({success:true,message:"Login successfully",user,token});
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal server error"});
        console.log(error);
      }
}
const Logout=async(req,res)=>{
    try{
        res.clearCookie('token')
        res.status(200).json({message:"User Logout successfully"})
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal server error"});
        console.log(error);
      }
}
module.exports={register,Login,Logout};