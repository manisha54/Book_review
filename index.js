require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const books_routes = require('./routes/book-routes')
const user_routes  =require('./routes/user_routes')
const {verifyUser} = require('./middlewares/auth')



const port = process.env.PORT


mongoose.connect('mongodb://127.0.0.1:27017/Books-Review')
  .then(()=>{
    console.log('connected to the mongodb database server')
  })
  .catch((err) => console.log(err))




const app = express()  //initiate  express by giving name app

app.use(express.json())   //request pass through this





app.get('/', (req,res) =>{
  //  console.log(req)
    res.send("aratiiii chaprii nibiii")

})


app.use('/users', user_routes )
app.use(verifyUser)            //call middleware
app.use('/books', books_routes )


//error handling middleware
app.use((err,req, res,next)=>{
  console.error(err)
  if (err.name === 'ValidatioError') res.status(400)
  else if(err.name === 'CastError')res.status(400)
  console.log(err.message)
  res.json({error:err.message})
})



//unknown path

app.use((req, res) =>{
  res.status(404).json({error: "path not found"})
})



app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})