import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"


export const getPosts=async (req,res)=>{
  try{
    const postMessages= await PostMessage.find();
    res.status(200).send(postMessages);
  }catch(err){
    res.status(404).send({message:err.message});
  }
}


export const createPost=async(req,res)=>{
  const body= req.body;
  const postMessage=new PostMessage({...body,creator:req.userId});
  try{
    await postMessage.save();
    res.status(201).send(postMessage);
  }catch(err){
    res.status(409).send({message:err.message});
  }
}

export const updatePost=async(req,res)=>{
  const {id} =req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  if(!mongoose.Types.ObjectId.isValid(id)) req.status(404).send({message:'No post with this id'});
  let updatedPost = { creator, title, message, tags, selectedFile, _id: id };
  updatedPost=await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
  res.json(updatedPost);
}

export const deletePost=async(req,res)=>{
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).send({message:`No post with id: ${id}`});

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}

export const likePost=async(req,res)=>{
  const { id } = req.params;

  if(!req.userId) return res.json({message:'Unauthenticated'});

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({message:`No post with id: ${id}`});
  const post=await PostMessage.findById(id);
  const index = await post.likes.findIndex((id)=>(id==String(req.userId)));
  if(index==-1){
    post.likes.push(String(req.userId));
  }else{
    post.likes = post.likes.filter((id)=>id!=String(req.userId))
  }
  const updatedPost= await PostMessage.findByIdAndUpdate(id,post,{new:true});
  res.json(updatedPost);
}

