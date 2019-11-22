const controller=require('../controller/appController')
const config=require('../config/appConfig')
const middleware =require('../middleware/example')


let setRouter=(app)=>{
    let baseUrl=`${config.version}/blog`
    // console.log(baseUrl);
    
    // let printHello=(req,res)=>{res.send('Hello')}
    // let printBye=(req,res)=>{res.send('Bye')}
// app.get('/hello',controller.hello)
app.get('/bye',middleware.exampleMiddleware,controller.bye)
// app.get('/route/routeParam/:firstName/:lastName',controller.checkRouteParam)
// app.get('/route/queryParam/',controller.checkQueryParam)
// app.post('/route/bodyParam/',controller.checkBodyParam)
app.get(baseUrl+'/allBlogs',controller.readAllBlogs)
app.get(baseUrl+'/getSingleBlog/:blogId',controller.readSingleBlog)
app.get(baseUrl+'/getBlogsByAuthor/:author',controller.readBlogByAuthor)
app.get(baseUrl+'/getBlogsCategorically/:category',controller.readBlogByCategory)
app.post(baseUrl+'/createBlog',controller.createBlog)
app.post(baseUrl+'/deleteBlog/:blogId',controller.removeBlog)
app.put(baseUrl+'/editBlog/:blogId',controller.updateBlog)
app.get(baseUrl+'/viewBlog/:blogId',controller.increaseViewCount)
}

module.exports={
    setRouter:setRouter
}