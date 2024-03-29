const express=require('express')
const handler=require('./routes/handlers')
const mongoose=require('mongoose')
const userRoutes=require('./routes/use')
const app=express()

//allows you to exchange data from back to front end
const cors=require('cors')

//sets the .env to work
require("dotenv").config();

//middlewares
app.use(express.json())
app.use(cors())

//endpoint handlers
app.use('/api/handlers',handler)
app.use('/api/user',userRoutes)

app.get('/',(req,res)=>{
    res.send('running')
})

//database setting
mongoose.connect('mongodb+srv://kelvin:salvation22@cluster0.akdtj.mongodb.net/quizapp',{useNewUrlParser:true}).then(()=>{
    console.log('connected')
}).catch(err=>{
    console.log(err)
})

//run server
app.listen(process.env.PORT || 7000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
