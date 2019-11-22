let exampleMiddleware = (req,res,next)=>{
    req.user={'firstname':'Tabbu','lastname':'Sehgal'}
    next()
}

module.exports={
    exampleMiddleware:exampleMiddleware
}