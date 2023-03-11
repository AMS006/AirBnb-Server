const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const user = require('./routes/user')
const place = require('./routes/place')
const booking = require('./routes/booking')
const app = express()

dotenv.config();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'https://shy-lime-bull-tux.cyclic.app',
    methods:["GET","POST","PUT"],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    credentials:true
}))

// app.use('/uploads',express.static(__dirname +'\\uploads'))

app.get('/', (req,res)=>{
    return res.json({message:"App is Running"})
})
app.use('/api/v1/user',user)
app.use('/api/v1/place',place)
app.use('/api/v1/booking',booking)

app.listen(4000, ()=>{
    console.log('Server is Running on Port 4000')
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("DataBase Connected")
    }).catch((err) =>{
        console.log("DataBase Connection Failed" + err)
    })
})