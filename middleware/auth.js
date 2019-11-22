const response = require('../lib/responseFormatter')
const logger = require('../lib/loggerLib')

let authorisation = (req, res, next) => {
    let authToken = 'admin'
    if (req.params.authToken || req.query.authToken || req.header('authToken')) {
        if (req.params.authToken == authToken || req.query.authToken == authToken || req.header('authToken') == authToken) {
            req.user={'name':'Admin','userId':'A@123'}
            next()
        }
        else {
            logger.captureError('Invalid Auth token', 5, 'Authentication middleware')
            res.send(response.formatResponse(true, 'Invalid Auth token', 403, null))
        }
    }
    else {
        logger.captureError('Auth token missing', 5, 'Authentication middleware')
        res.send(response.formatResponse(true, 'Auth token missing in the request', 403, null))
    }

}

module.exports = {
    authorisation: authorisation
}