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

//express module returns a function(not object)
const { response } = require('express')
const express = require('express')

//express function returns express object that contains http server (app is a conventional name used)
const app = express()

//parsing body to be accessed by request object
app.use(express.json())

//creating REST API

//creating middleware1
const middleware1=(request,response,next)=>{
    console.log("middleware1");
    next();
}

//creating middleware2
const middleware2=(request,response,next)=>{
    console.log("middleware2");
    next();
}

//activate/call middlewares
app.use(middleware1)
app.use("/getallusers",middleware2)

//creating a route to handle '/getallusers' ; calling middleware2 specifically for this req
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

//creating a route to handle "/createuser"
app.post("/createuser",(request,response)=>{
    //obtaining user data in json format which is converted to js object
    userObj = request.body
    //adding userobj into the users array
    users.push(userObj)
    response.send({mesaage:"User created"})
})

//creating a route to handle "/updateuser"
app.put("/updateuser",(request,response)=>{
    //obtaining user data in json format which is converted to js object
    newuserObj = request.body

    newuserObjId = newuserObj.id    //getting user id to check for the users id in arr

    //searching for the userobj using id
    let userObj = users.find(userObj=>userObj.id==newuserObjId)

    //if user not found
    if(userObj==undefined)
        response.send({message:"user not found"});
    else{

        //loop to match newuserid with existing id and then updating
        for(let i=0;i<users.length;i++){
            if(users[i].id === newuserObjId){
                users[i] = newuserObj
                break
            }
        }
    }
    response.send({message:"user updated"})

})

//creating a route to handle "/deleteuser"
app.delete("/deleteuser/:id",(request,response)=>{
    //getting user id from argument to check for the users id in arr
    let userID = request.params.id

    //searching for the userobj using id
    let userObj = users.find(userObj=>userObj.id==userID)

    //if user not found
    if(userObj==undefined)
        response.send({message:"user not found"});
    else{

        //loop to match userid and then delete the obj
        for(let i=0;i<users.length;i++){
            if(users[i].id==userID){
                users.splice(i,1);
            }
        }
        response.send({message:"user deleted"});
    }
})

//assigning port number to the server obj
app.listen(3000,()=>{
    console.log("server listening on port 3000..")
})