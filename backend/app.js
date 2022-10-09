//express module returns a function(not object)
const { response } = require('express')
const express = require('express')

//express function returns express object that contains http server (app is a conventional name used)
const app = express()

//importing userApi,productApi objects 
const userApp = require('./APIS/userApi')
const productApp = require('./APIS/productApi')

//using middleware mechanism, requests are transferred to the APIS using 
//imported userApi,productApi objects 
app.use("/user-api",userApp)
app.use("/product-api",productApp)


//invalid path handling middleware
app.use((request,response,next)=>{
    response.send({message:`path ${request.url} is invalid`})
})

//error handling middleware
app.use((error,request,response,next)=>{
    response.send({message:"Error occured",reason:`${error.message}`})
})

//assigning port number to the server obj
app.listen(3000,()=>{
    console.log("server listening on port 3000..")
})