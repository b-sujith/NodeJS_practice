//express module returns a function(not object)
const express = require('express')
//express function returns express object that contains http server (app is a conventional name used)
const app = express()

//import mongodb and retrieve MongoClient
const mongoClient = require('mongodb').MongoClient

//mongoDB connection url
const DBurl = "mongodb+srv://sujith:sujith123@cluster0.vceyf.mongodb.net/?retryWrites=true&w=majority"

//connect with MongoDB server-->returns a promise
mongoClient.connect(DBurl)
.then((client)=>{

    //get dbObj from client
    let dbObj = client.db("db1")

    //create collection objs from dbObj
    let userCollection = dbObj.collection("usercollection");
    let productCollection = dbObj.collection("productcollection");

    //share collection objects to APIS
    app.set("userCollection",userCollection);
    app.set("productCollection",productCollection);    

    console.log("DB Connection is success");
})
.catch(err=>console.log("Error in DB connection",err));

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