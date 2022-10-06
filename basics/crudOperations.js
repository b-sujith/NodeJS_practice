const http = require('http')

const server = http.createServer((request,response)=>{
    if(request.method=='GET'){
        if(request.url=='/getusers')
            response.end("GEtusers")
        else
            response.end("Getproducts")
    }
    
    if(request.method=='POST'){
        if(request.url=='/createuser')
            response.end("user created")
        else
            response.end("producted")
    }
})

server.listen(3000,()=>{
    console.log("server listening on port 3000...")
})