import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin= async(req,res)=>{
  const {email,password} = req.body;
  try{
    const existUser = await User.findOne({email});
    if(!existUser) return res.status(404).json({message:"No User exist with this email : "+email});
    const isPasswordCorrect = bcrypt.compare(password,existUser.password);
    if(!isPasswordCorrect) return res.status(400).json({message:"Wrong Password. "});

    const SECRET_KEY = process.env.SECRET_KEY;
    const token = jwt.sign({email:existUser.email, id:existUser._id},SECRET_KEY,{expiresIn:"1h"});
    
    res.status(200).json({result:existUser,token});
  }catch(err){
    res.status(500).json({message:'Something went wrong. Please try again later.'});
  }
}

export const signup= async(req,res)=>{
  const {email,password,confirmPassword,firstName,lastName} = req.body;
  try{
    
    const existUser = await User.findOne({email});
    if(existUser) return res.status(400).json({message:"User exist with this email : "+email});
    if(password!=confirmPassword) return res.status(400).json({message:"Password doesn't match"});
    
    const hashPassword = await  bcrypt.hash(password, 12);
    const result = await User.create({email,password:hashPassword,name:firstName+' '+lastName});
    
    const SECRET_KEY = process.env.SECRET_KEY;
    const token = jwt.sign({email:result.email, id:result._id},SECRET_KEY,{expiresIn:"1h"});
    
    res.status(200).json({result:result,token});
  }catch(err){
    res.status(500).json({message:'Something went wrong. Please try again later.'});
  }
}