//Core modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.listen(process.env.PORT, ()=>{
    console.log(`server started at localhost:${process.env.PORT}`);
  
})