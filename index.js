//Core modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const movieRoutes = require('./routes/movie.route.js');
const theatreRoutes = require('./routes/theatre.route.js');

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

movieRoutes(app);
theatreRoutes(app);

app.listen(process.env.PORT, async ()=>{
    console.log(`server started at localhost:${process.env.PORT}`);
    
    await mongoose.connect(process.env.DB_URL);
    console.log('Successfully connected to mongoDB');    
});