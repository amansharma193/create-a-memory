import axios from 'axios';

const API = axios.create({baseURL:'https://create-a-memory.onrender.com'})
// const url='https://express-memories.herokuapp.com/posts';


API.interceptors.request.use((req)=>{
  const profile = localStorage.getItem('profile');
  if(profile){
    req.headers.authorization=`Bearer ${JSON.parse(profile).token}`;
  }
  return req;
})

export const fetchPosts=()=>API.get('/posts');
export const createPost=(postData)=>API.post('/posts',postData);
export const updatePost=(postData)=>API.patch(`/posts/${postData._id}`,postData);
export const deletePost=(id)=>API.delete(`/posts/${id}`);
export const likePost=(id)=>API.patch(`/posts/${id}/likePost`);
export const signIn=(formData)=>API.post('/users/signin',formData);
export const signUp=(formData)=>API.post('/users/signup',formData);

