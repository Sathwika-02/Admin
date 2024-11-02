//for database connection
const mongoose=require('mongoose')
const mongourl='mongodb://localhost:27017/ReactAdmin'

mongoose.connect(mongourl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db=mongoose.connection;
db.on('connected',()=>{
    console.log("connected to db")
})
db.on('disconnected',()=>{
    console.log("disconnected to db")
})
module.exports=db;