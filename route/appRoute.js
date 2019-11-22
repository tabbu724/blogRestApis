const controller = require('../controller/appController')
const config = require('../config/appConfig')
const middleware = require('../middleware/example')


let setRouter = (app) => {
    let baseUrl = `${config.version}/blog`
    // console.log(baseUrl);

    // let printHello=(req,res)=>{res.send('Hello')}
    // let printBye=(req,res)=>{res.send('Bye')}
    // app.get('/hello',controller.hello)
    app.get('/bye', middleware.exampleMiddleware, controller.bye)
    // app.get('/route/routeParam/:firstName/:lastName',controller.checkRouteParam)
    // app.get('/route/queryParam/',controller.checkQueryParam)
    // app.post('/route/bodyParam/',controller.checkBodyParam)
    app.get(baseUrl + '/allBlogs', controller.readAllBlogs)
    /**@api {get} /api/v1/blog/allBlogs Read all blogs
     * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiSuccessExample {json} Success-Response:
     * {
        "err": false,
        "message": "All blogs found",
        "status": 200,
        "data": [
            {
                "title": "String",
                "views": number,
                "isPublished": boolean,
                "tags": [],
                "blogId": "String",
                "description": "String",
                "bodyHtml": "String",
                "category": "String",
                "author": "String",
                "created": "String",
                "lastModified": "String"
            }
        ]
        }
     * @apiErrorExample {json} Error-Response:
     * {
        "err": true,
        "message": "No blog found",
        "status": 404,
        "data": []
    }
     */


    app.get(baseUrl + '/getSingleBlog/:blogId', controller.readSingleBlog)
    /**@api {get} /api/v1/blog/getSingleBlog/:blogId Read a particular blog
     * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiParam {string} blogId Pass the blog id of the blog as route parameter
     * @apiSuccessExample {json} Success-Response:
     * {
     *  "err": false,
        "message": "Requested blog found",
        "status": 200,
        "data": [
            {
                "title": "String",
                "views": number,
                "isPublished": boolean,
                "tags": [],
                "blogId": "String",
                "description": "String",
                "bodyHtml": "String",
                "category": "String",
                "author": "String",
                "created": "String",
                "lastModified": "String"
            }
        ]
    }
     * @apiErrorExample {json} Error-Response:
     * {
        "err": true,
        "message": "No blog found",
        "status": 404,
        "data": []
    }
     */
    app.get(baseUrl + '/getBlogsByAuthor/:author', controller.readBlogByAuthor)
    /**@api {get} /api/v1/blog/getBlogsByAuthor/:author Read blogs by a particular author
     * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiParam {string} author Pass the author name of the blog as route parameter
     * @apiSuccessExample {json} Success-Response:
     * {
        "err": false,
        "message": "Requested blog found",
        "status": 200,
        "data": [
            {
                "title": "String",
                "views": number,
                "isPublished": boolean,
                "tags": [],
                "blogId": "String",
                "description": "String",
                "bodyHtml": "String",
                "category": "String",
                "author": "String",
                "created": "String",
                "lastModified": "String"
            }
        ]
        }
     * @apiErrorExample {json} Error-Response:
     *  {
        "err": true,
        "message": "No blog found",
        "status": 404,
        "data": []
    }
     */

    app.get(baseUrl + '/getBlogsCategorically/:category', controller.readBlogByCategory)
    /**@api {get} /api/v1/blog/getBlogsCategorically/:category Read blogs of a particular category
     * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiParam {string} category Pass the category name of the blog as route parameter
     * @apiSuccessExample {json} Success-Response:
     * {
        "err": false,
        "message": "Requested blog found",
        "status": 200,
        "data": [
            {
                "title": "String",
                "views": number,
                "isPublished": boolean,
                "tags": [],
                "blogId": "String",
                "description": "String",
                "bodyHtml": "String",
                "category": "String",
                "author": "String",
                "created": "String",
                "lastModified": "String"
            }
        ]
        }
     * @apiErrorExample {json} Error-Response:
     *{
        "err": true,
        "message": "No blog found",
        "status": 404,
        "data": []
    }
     */

    app.post(baseUrl + '/createBlog', controller.createBlog)
    /**@api {get} /api/v1/blog/createBlog Create a blog
     * @apiVersion 1.0.0
     * @apiGroup Create
     * @apiParam {string} title Pass the title of the blog as body parameter
     * @apiParam {string} description Pass the description of the blog as body parameter
     * @apiParam {string} bodyHtml Pass the body of the blog as body parameter
     * @apiParam {string} category Pass the category of the blog as body parameter
     * @apiParam {string} author Pass the author of the blog as body parameter
     * @apiSuccessExample {json} Success-Response:
     * {
        "err": false,
        "message": "New Blog Created",
        "status": 200,
        "data": {
                "title": "String",
                "views": number,
                "isPublished": boolean,
                "tags": [],
                "blogId": "String",
                "description": "String",
                "bodyHtml": "String",
                "category": "String",
                "author": "String",
                "created": "String",
                "lastModified": "String"
                "_id": "String",
                "__v": number
        }
    }
     * @apiErrorExample {json} Error-Response:
     * {
     * }
     */

    app.post(baseUrl + '/deleteBlog/:blogId', controller.removeBlog)
    /**@api {get} /api/v1/blog/deleteBlog/:blogId Delete a particular blog
     * @apiVersion 1.0.0
     * @apiGroup Delete
     * @apiParam {string} blogId Pass the blog id as route parameter
     * @apiSuccessExample {json} Success-Response:
     * {
        "err": false,
        "message": "Blog Deleted",
        "status": 200,
        "data": {
            "n": 1,
            "ok": 1,
            "deletedCount": 1
        }
    }
     * @apiErrorExample {json} Error-Response:
     * {
     * }
     */

    app.put(baseUrl + '/editBlog/:blogId', controller.updateBlog)
    /**@api {get} /api/v1/blog/editBlog/:blogId Read blogs of a particular category
     * @apiVersion 1.0.0
     * @apiGroup Update
     * @apiParam {string} blogId Pass the blog id as route parameter
     * @apiParam {string} [title] Pass the title of the blog as body parameter
     * @apiParam {string} [description] Pass the description of the blog as body parameter
     * @apiParam {string} [bodyHtml] Pass the body of the blog as body parameter
     * @apiParam {string} [category] Pass the category of the blog as body parameter
     * @apiParam {string} [author] Pass the author of the blog as body parameter
     * @apiSuccessExample {json} Success-Response:
     * {
        "err": false,
        "message": "Blog Updated",
        "status": 200,
        "data": {
            "n": 1,
            "nModified": 1,
            "ok": 1
        }
    }
     * @apiErrorExample {json} Error-Response:
     * {
        "err": true,
        "message": "No blog found",
        "status": 404,
        "data": {
            "n": 0,
            "nModified": 0,
            "ok": 1
        }
    }
     */

    app.get(baseUrl + '/viewBlog/:blogId', controller.increaseViewCount)
    /**@api {get} /api/v1/blog/viewBlog/:blogId Read blogs of a particular category
     * @apiVersion 1.0.0
     * @apiGroup Update
     * @apiParam {string} blogId Pass the blog id as route parameter
     * @apiSuccessExample {json} Success-Response:
     * {
        "err": false,
        "message": "Views Increased",
        "status": 200,
        "data": {
                "title": "String",
                "views": number,
                "isPublished": boolean,
                "tags": [],
                "blogId": "String",
                "description": "String",
                "bodyHtml": "String",
                "category": "String",
                "author": "String",
                "created": "String",
                "lastModified": "String"
                "_id": "String",
                "__v": number
        }
    }
     * @apiErrorExample {json} Error-Response:
     * {
     * }
     */

}

module.exports = {
    setRouter: setRouter
}