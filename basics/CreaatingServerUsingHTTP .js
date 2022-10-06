//importing http module to create http/web server
const http = require('http')

//creating server object
const server = http.createServer((request,response)=>{
    response.end("This is displayed")
})

//assigning port number to server 
server.listen(3000,()=>{
    console.log("server listening on port 3000..") 
})

//exporting server
module.exports = server