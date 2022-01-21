import dotenv from 'dotenv';
import express  from "express";
import mongoose  from "mongoose";
import cors from 'cors';
import bodyParser from "body-parser";
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
const app= express();

app.use(bodyParser.json({limit:"10mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"10mb",extended:true}));
app.use(cors());

const options = {
  definition:{
    openapi:"3.0.0",
    info:{
      title:"Memories API",
      version:"1.0.0",
      description:"Memories app backend documentation",
    },
    servers:[
      {
        url:"https://express-memories.herokuapp.com"
      }
    ]
  },
  apis:["./routes/*.js"]
}

const specs= swaggerJsDoc(options);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(specs))

dotenv.config({path:"./.env"});

const PORT=process.env.PORT || 5000;
const CONNECTION_URL=process.env.CONNECTION_URL;

app.use('/posts',postRoutes);
app.use('/users',userRoutes);

app.get('/',(req,res)=>{
  res.send('Welcome to Memories api');
})

mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>app.listen(PORT,()=>console.log(`Server started at port: ${PORT}`)))
.catch((err)=>console.log("Got error",err));







