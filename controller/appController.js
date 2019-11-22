const mongoose = require('mongoose')
// const blogSchema = require('../model/Blog')
// const blogmodel = mongoose.model('blogmodel',blogSchema,'blogCollection')
const blogModel = require('../model/Blog')
const shortid = require('../node_modules/shortid')
const standardResponse = require('../lib/responseFormatter')
const checks=require('../lib/checkLib')
const formatTimeNDate = require('../lib/dateTimeLib')
const logger = require('../lib/loggerLib')

let printHello = (req, res) => { res.send('Hello') }
let printBye = (req, res) => { 
    console.log(req.user);
    res.send('Bye') }
let checkRouteParam = (req, res) => {
    console.log(req.params);
    res.send(req.params)
}

let checkQueryParam = (req, res) => {
    console.log(req.query);
    res.send(req.query)
}

let checkBodyParam = (req, res) => {
    console.log(req.body);
    res.send(req.body)
}

let createBlog = (req, res) => {
    let utcdate = formatTimeNDate.now()
    let localDateTime=formatTimeNDate.convertToLocalTime(utcdate)    
    let blogId = shortid.generate()

    let blogDocument = new blogModel({
        title: req.body.title,
        blogId: blogId,
        description: req.body.description,
        bodyHtml: req.body.blogBody,
        isPublished: true,
        category: req.body.category,
        author: req.body.author,
        created:localDateTime,
        lastModified: localDateTime
    })
    let tag = req.body.tags
    let tags = (tag != null || tag != '' || tag != undefined) ? tag.split(',') : []
    blogDocument.tags = tags
    blogDocument.save(function(err, result){
        if (err) {
            // console.log(err);
            let response = standardResponse.formatResponse(true,'Some error occurred',500,err)
            logger.captureError(err,10,'appController/createBlog')
            res.send(response)
        }
        else {
            // console.log('result->',result);
            let response = standardResponse.formatResponse(false,'New Blog Created',200,result)
            logger.captureInfo('blog created',1,'appController/createBlog')
            res.send(response)
        }
    });
}

let readAllBlogs = (req,res)=>{
blogModel.find((err,result)=>{
    if(err){
        console.log(err);
        let response = standardResponse.formatResponse(true,'Some error occurred',500,err)
        res.send(response)
    }
    else if(checks.isEmpty(result)){
        let response = standardResponse.formatResponse(true,'No blog found',404,result)
    res.send(response)
    }
    else{
        let response = standardResponse.formatResponse(false,'All blogs found',200,result)
        res.send(response)
    }
}).select('-__v -_id');
}

let readSingleBlog = (req,res)=>{
let blogId=req.params.blogId
blogModel.find({blogId:blogId},(err,result)=>{
    if(err){
        console.log(err);
        let response = standardResponse.formatResponse(true,'Some error occurred',500,err)
        logger.captureError(err,10,'appController/readSingleBlog')
        res.send(response)
    }
    else if(checks.isEmpty(result)){
        let response = standardResponse.formatResponse(true,'No blog found',404,result)
        res.send(response)
        logger.captureError('blog not found',8,'appController/readSingleBlog')
    }
    else{
        let response = standardResponse.formatResponse(false,'Requested blog found',200,result)
        logger.captureInfo('Found blog',1,'appController/readSingleBlog')
        res.send(response)
    }
}).select('-__v -_id');
}

let readBlogByAuthor = (req,res)=>{
    let author=req.params.author
    blogModel.find({author:author},(err,result)=>{
        if(err){
            console.log(err);
            let response = standardResponse.formatResponse(true,'Some error occurred',500,err)
            res.send(response)
        }
        else if(checks.isEmpty(result)){
            let response = standardResponse.formatResponse(true,'No blog found',404,result)
            res.send(response)
        }
        else{
            let response = standardResponse.formatResponse(false,'Requested blog found',200,result)
            res.send(response)
        }
    }).select('-__v -_id');
    }

let readBlogByCategory =(req,res)=>{
    let category=req.params.category
    blogModel.find({category:category},(err,result)=>{
        if(err){
            console.log(err);
            let response = standardResponse.formatResponse(true,'Some error occurred',500,err)
            res.send(response)
        }
        else if(checks.isEmpty(result)){
            let response = standardResponse.formatResponse(true,'No blog found',404,result)
            res.send(response)
        }
        else{
            let response = standardResponse.formatResponse(false,'Requested blog found',200,result)
            res.send(response)
        }
    }).select('-__v -_id');
    }

let removeBlog =(req,res)=>{
    let blogId=req.params.blogId
    blogModel.deleteOne({blogId:blogId},(err,result)=>{
        if(err){
            console.log(err);
            let response = standardResponse.formatResponse(true,'Some error occurred',500,err)
            res.send(response)
        }
        else if(checks.isEmpty(result)){
            let response = standardResponse.formatResponse(true,'No blog found',404,result)
            res.send(response)
        }
        else{
            let response = standardResponse.formatResponse(false,'Blog Deleted',200,result)
            res.send(response)
        }
    })
    }

let updateBlog=(req,res)=>{
    let blogId=req.params.blogId
    let options=req.body
    console.log(options);
    
    blogModel.updateOne({blogId:blogId},options,(err,result)=>{
        if(err){
            console.log(err);
            let response = standardResponse.formatResponse(true,'Some error occurred',500,err)
            res.send(response)
        }
        else if(checks.isEmpty(result)){
            let response = standardResponse.formatResponse(true,'No blog found',404,result)
        res.send(response)
        }
        else{
            let response = standardResponse.formatResponse(false,'Blog Updated',200,result)
            res.send(response)
        }
    })
    }

let increaseViewCount = (req,res)=>{
    let blogId=req.params.blogId
    
    blogModel.findOne({blogId:blogId},(err,result)=>{
        if(err){
            console.log(err);
            let response = standardResponse.formatResponse(true,'Some error occurred',500,err)
            res.send(response)
        }
        else if(checks.isEmpty(result)){
            let response = standardResponse.formatResponse(true,'No blog found',404,result)
            res.send(response)
        }
        else{
            result.views+=1
            result.save((err,result)=>{
                if (err) {
                    // console.log(err);
                    res.send(err)
                }
                else {
                    // console.log('result->',result);
                    let response = standardResponse.formatResponse(false,'Views Increased',200,result)
                    res.send(response)
                }
            })
        }
    })
    }

module.exports = {
    hello: printHello,
    bye: printBye,
    checkRouteParam: checkRouteParam,
    checkQueryParam: checkQueryParam,
    checkBodyParam: checkBodyParam,
    createBlog:createBlog,
    readAllBlogs:readAllBlogs,
    readSingleBlog:readSingleBlog,
    readBlogByAuthor:readBlogByAuthor,
    readBlogByCategory:readBlogByCategory,
    removeBlog:removeBlog,
    updateBlog:updateBlog,
    increaseViewCount:increaseViewCount
}