const express = require('express');
const app = express();
const dotenv = require('dotenv');


const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

const mongoose = require('mongoose');


dotenv.config();


mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log('DBConnection successfully up');})
.catch((err)=>{console.log(err);});

//create an API
app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/auth',authRoute);


app.listen(process.env.PORT || 5000,()=>{
console.log('Backend server started');
});