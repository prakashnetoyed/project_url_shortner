const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const env = require('dotenv').config()
const process = require('node:process')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route)

async function bootstrap(){
try{
   mongoose.set('strictQuery', false)
await mongoose.connect(process.env.MONGO_URI)
console.log("MongoDb is connected")
 app.listen(process.env.PORT , ()=>{
console.log(`server is running on PORT ${process.env.PORT}`)
  })
}catch(error){
console.log("db error", error.message)
return res.status(500).json({message:error.message})
  }
}

bootstrap().finally()
