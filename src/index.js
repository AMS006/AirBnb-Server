const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const env = require('dotenv')
const mongoose = require('mongoose')
const user = require('./routes/user')
const place = require('./routes/place')
const booking = require('./routes/booking')
const helmet = require("helmet");

const app = express()
env.config();

app.use(express.json())
app.use(cookieParser())
app.use(helmet())



app.use(cors({
    origin: 'https://air-bnb-client.vercel.app/', 
    methods: ['GET', 'PUT', 'POST','DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'], 
    credentials: true,
    maxAge: 5000,
    exposedHeaders: ['*', 'Authorization' ]
}))
mongoose.connect(process.env.MONGODB_CONNECTION,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DataBase Connected")
})
app.get('/', (req,res)=>{
    return res.json({message:"App is Running"})
})
app.use('/api/v1/user',user)
app.use('/api/v1/place',place)
app.use('/api/v1/booking',booking)

app.listen(4000, ()=>{
    console.log('Server is Running on Port 4000')
})
