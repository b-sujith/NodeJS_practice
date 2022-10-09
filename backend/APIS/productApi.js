const { response } = require('express')
const express = require('express')
const expressAsyncHandler = require('express-async-handler')

productApp = express.Router()

//parsing body to be accessed by request object
productApp.use(express.json())

//getallproducts req handler
productApp.get("/getallproducts",expressAsyncHandler(async(request,response)=>{

    //retrieving productCollectionObj becuz insertOne can be done on colletion only
    let productCollectionObj = request.app.get("productCollectionObj")
    //get all documents using find->returns cursor,so convert to array using toArray()
    let allProducts = await productCollectionObj.find().toArray()
    //send response
    response.send({message:`all products`,payload : allProducts})

}))

//getproductbyid req handler
productApp.get("/getproduct/:id",expressAsyncHandler(async(request,response)=>{

    //retrieving productCollectionObj becuz insertOne can be done on colletion only
    let productCollectionObj = request.app.get("productCollectionObj")
    //get product_id and convert it to number
    let pid = (+request.params.id)
    //get product document using findOne
    let product = await productCollectionObj.findOne({productId : {$eq : pid}})
    //if product does not exists
    if(product==null)
        response.send({message:`product does not exist`})
    //if product exists
    else
        response.send({message:`product ${pid}`,payload : product})

}))

//createProduct req handler
productApp.post("/createproduct", expressAsyncHandler(async (request,response)=>{

    //retrieving productCollectionObj becuz insertOne can be done on colletion only
    let productCollectionObj = request.app.get("productCollectionObj");
    //get productobj
    let productObj = request.body
    //inserting productObj into product collection
    let result = await productCollectionObj.insertOne(productObj);
    //send response
    response.send({message:`Product created successfully`});

}))

//updateproduct req handler
productApp.put("/updateproduct",expressAsyncHandler(async (request,response)=>{

    //retrieving productCollectionObj becuz insertOne can be done on colletion only
    let productCollectionObj = request.app.get("productCollectionObj");
    //get product
    let product = request.body
    //get product_id from body
    let pid = (+product.productId)
    //search in the DB
    let searchProduct = productCollectionObj.findOne( { productId: { $eq : pid } } );
    //if product does not exists
    if(searchProduct==null)
        response.send({message:`product does not exists`})
    else{
        //update product using updateOne
        let result = await productCollectionObj.updateOne({productId:{$eq :pid}}, {$set : {...product}})
        //send response
        response.send({message:`product ${pid} modified`})
    }

}))

//deleteproduct req handler
productApp.delete("/deleteproduct/:id",expressAsyncHandler(async (request,response)=>{

    //retrieving productCollectionObj becuz insertOne can be done on colletion only
    let productCollectionObj = request.app.get("productCollectionObj");
    //get product_id
    let pid = (+request.params.id)
    //search in the DB
    let searchProduct = productCollectionObj.findOne( { productId: { $eq : pid } } );
    //if product does not exists
    if(searchProduct==null)
        response.send({message:`product does not exists`})
    else{
        //update product using updateOne
        let result = await productCollectionObj.deleteOne({productId:{$eq :pid}})
        //send response
        response.send({message:`product ${pid} removed`})
    }

}))

//export productApp
module.exports = productApp