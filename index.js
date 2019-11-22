// importing the module
const express = require('express')
const appConfig=require('./config/appConfig')
const fs=require('fs')
const mongoose = require('./node_modules/mongoose')
const bodyParser=require('body-parser')
const errAndNotFound = require('./middleware/errorAndNotFound')
const routeLogger =require('./middleware/routeLogger')
const helmet=require('helmet')
const http=require('http')
const logger=require('./lib/loggerLib')
// creating object of the module class

const app = express()

// using middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(errAndNotFound.errorHandler)
app.use(routeLogger.routeIpLogger)
app.use(helmet())

// searching the each file of directory to import routes
const dirPath='./route'

fs.readdirSync(dirPath).forEach((file)=>{
    if(~file.indexOf('.js')){
        let route=require(`${dirPath}/${file}`)
        route.setRouter(app)
    }
})
// searching the each file of directory to import models
const modelPath='./model'
fs.readdirSync(modelPath).forEach((file)=>{
    if(~file.indexOf('.js')){
        let model=require(`${modelPath}/${file}`)
    }
})

// using custom middlewares

app.use(errAndNotFound.notFoundHandler)



// setting the port for app
// app.listen(appConfig.port, ()=>{
//     console.log('App is listening on localhost')
//     // creating db connection 
//     let db=mongoose.connect(appConfig.dbUrl.uri,{ useNewUrlParser: true , useUnifiedTopology: true } )
// })

// creating http server
const server=http.createServer(app)
server.listen(appConfig.port,onListening)
server.on('error',onError)

function onError(error){
if(error.syscall!='listen'){
    logger.captureError(error.code,10,'serverOnErrorHandler')
    throw error
}
switch (error.code) {
    case 'EACCES':
        logger.captureError(`${error.code}: elevated priviledges required`,10,'serverOnErrorHandler')
        process.exit(1)
        break;
    case 'EADDRINUSE':
        logger.captureError(`${error.code}:port is already in use`,10,'serverOnErrorHandler')
        process.exit(1)
    default:
        logger.captureError(`${error.code}:some unknown error occurred`,10,'serverOnErrorHandler')
        throw error;
}
}

function onListening(){
    let addr =server.address()
    let bind=typeof addr==='string'?'pipe '+addr:'port '+addr.port
    console.log('listening on '+bind);
    
    logger.captureInfo('server listening on port '+addr.port,1,'serverOnListeningHandler')
    let db=mongoose.connect(appConfig.dbUrl.uri,{ useNewUrlParser: true , useUnifiedTopology: true } )
}

process.on('unhandledRejection',(reason,p)=>{
    console.log('Unhandled rejection at: Promise ',p,' reason: ',reason);
    
})



mongoose.connection.on('open',(err)=>{
    if(err){
        console.log('--db error occurred--',err);
    }
    else{
        console.log('Db Connection successfull');
    }
})

mongoose.connection.on('error',(err)=>{
    console.log('--some error in db connection--',err);
})