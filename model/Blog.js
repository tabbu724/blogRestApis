const mongoose=require('mongoose')
const schema=mongoose.Schema

let blogSchema = new schema({
title:{
    type:String,
    default:''
},
blogId:{
    type:String,
    unique:true
},
description:{
    type:String
},
bodyHtml:{
    type:String
},
views:{
    type:Number,
    default:0
},
isPublished:{
    type:Boolean,
    default:false
},
category:{
    type:String
},
tags:[],
author:{
    type:String
},
created:{
    type:String,
    default:Date.now
},
lastModified:{
    type:String,
    default:Date.now
}
})

// module.exports={
//     blogSchema:blogSchema
// }
module.exports=mongoose.model('blogModel',blogSchema,'blogCollection')