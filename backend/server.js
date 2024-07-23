const express = require('express');
const authRouter = require('./routes/user.routes');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/connectDB');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/users', authRouter);
app.use(express.static(path.join(__dirname,'..', 'frontend/dist')));

app.get('/', (req,res) =>{
  res.send('<h1>Server started</h1>')
})
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, '..','frontend', 'dist', 'index.html'))
})


app.listen(PORT, () =>{
  connectDB();
  console.log(`Server listening on port: ${PORT}`)
})