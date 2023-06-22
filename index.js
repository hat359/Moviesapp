const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors =require('cors')
const bodyparser=require('body-parser')
const authroute=require('./routes/user')
const dotenv=require('dotenv')
const myroute=require('./routes/favorites')
dotenv.config()



const config=require('./config/key')
const connect = mongoose.connect(config.mongoURI,
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
    app.use(cors())
    app.use(express.json({limit: '100mb'}))
    

    app.use('/api/user',authroute)
    app.use('/api/favorites',myroute)


const port =process.env.PORT || 6060

if(process.env.NODE_ENV==="production"){
app.use(express.static('client/build'))

const path=require('path')

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client", "build", "index.html"));
});

}

app.listen(port,()=>{
console.log(`Server Listening on ${port}`)


})

