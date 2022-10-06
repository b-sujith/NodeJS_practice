//express module returns a function(not object)
const { response } = require('express')
const express = require('express')

//express function returns express object that contains http server (app is a conventional name used)
const app = express()

//fake data to verify route handlers
let users=[
    {
        id : 1,
        name : "sujith",
        age : 21
    },
    {
        id : 2,
        name : "shubham",
        age : 22
    }
]

//creating REST API

//creating a route to handle '/getallusers'
app.get('/getallusers',(request,response)=>{
    response.send({mesaage:"all users",payload:users})
})

//creating a route to handle '/getalluser/id'
app.get('/getuser/:id',(request,response)=>{

    let userID = request.params.id; //getting argument of url using params property

    //searching for user using id
    let userObj = users.find(userObj=>userObj.id==userID);

    //if user not found
    if(userObj==undefined)
        response.send({message:"USer doesn't exist"});
    //if user found
    else
        response.send({message:"user found",payload:userObj});
})

//assigning port number to the server obj
app.listen(3000,()=>{
    console.log("server listening on port 3000..")
})