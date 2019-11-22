// importing the module
const express = require('express')
const appConfig=require('./config/appConfig')
const fs=require('fs')
const mongoose = require('./node_modules/mongoose')
const bodyParser=require('body-parser')
const errAndNotFound = require('./middleware/errorAndNotFound')
const routeLogger =require('./middleware/routeLogger')
// creating object of the module class

const app = express()

// using middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(errAndNotFound.errorHandler)
app.use(routeLogger.routeIpLogger)
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
app.listen(appConfig.port, ()=>{
    console.log('App is listening on localhost')
    // creating db connection 
    let db=mongoose.connect(appConfig.dbUrl.uri,{ useNewUrlParser: true , useUnifiedTopology: true } )
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