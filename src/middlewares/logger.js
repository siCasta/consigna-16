import logger from '../utils/logger.js'

const loggerMiddleware = (req, res, next) => {
    const date = new Date()

    logger.info(
        `${req.method} ${
            req.path
        } ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    )
    next()
}

export default loggerMiddleware
