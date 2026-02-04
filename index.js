//Core modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Custom modules
const movieRoutes = require('./routes/movie.route.js');
const theatreRoutes = require('./routes/theatre.route.js');
const authRoutes = require('./routes/auth.routes.js');
const userRoutes = require('./routes/user.routes.js');
const bookingRoutes = require('./routes/booking.routes.js');
const showRoutes = require('./routes/show.routes.js');
const paymentRoutes = require('./routes/payment.routes.js');

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.get('/',(req, res) => {
    res.send("Welcome to HomePage");
});

movieRoutes(app);
theatreRoutes(app);
authRoutes(app);
userRoutes(app);
bookingRoutes(app);
showRoutes(app);
paymentRoutes(app);

app.listen(process.env.PORT, async ()=>{
    console.log(`server started at localhost:${process.env.PORT}`);
    
    try {
        if(process.env.NODE_URL == 'production') {
            await mongoose.connect(process.env.PROD_DB_URL);
            console.log(`Successfully Connected to mongoDB Atlas`);
        }
        else{
            await mongoose.connect(process.env.DB_URL);
            console.log(`Successfully Connected to mongoDB Compass`);
        }
        
    } catch (error) {
        console.log(error);      
    }    
});