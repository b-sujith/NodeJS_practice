const express = require('express')
productApp = express.Router()

//parsing body to be accessed by request object
productApp.use(express.json())

productApp.get("/getallproducts",(request,response)=>{
    response.send({message:`all users`})
})

productApp.get("/getproduct/:id",(request,response)=>{
    response.send({message:`product ${request.params.id}`})
})

productApp.post("/createproduct",(request,response)=>{
    response.send({message:`product created`})
})

productApp.put("/updateproduct",(request,response)=>{
    response.send({message:`product updated`})
})

productApp.delete("/deleteproduct/:id",(request,response)=>{
    response.send({message:`user ${request.params.id} deleted`})
})

module.exports = productApp