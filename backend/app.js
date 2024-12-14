const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connect = require('./db/db');
connect();
app.use(cors());


app.get('/', (req,res)=>{
  res.send('Hello World!');
})

module.exports = app;