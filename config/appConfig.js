let appConfig = {}
appConfig.port = 3000;
appConfig.allowedCorsOrigin = '*'
appConfig.dbUrl = {
    uri:'mongodb://127.0.0.1:27017/blogDb'
}
appConfig.environment = 'dev'
appConfig.version = '/api/v1'

module.exports = appConfig