import 'dotenv/config'
import express from 'express'
import logger from './utils/logger.js'
import createHttpError from 'http-errors'
import { join } from 'path'
import { dirname } from 'dirname-es'

const app = express()
const __dirname = dirname(import.meta)

// import routes
import apiRoutes from './api/routes/index.js'
import loggerMiddleware from './middlewares/logger.js'

// middlewares
app.use(loggerMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, '../public')))

// routes
app.use('/api', apiRoutes)

// 404 handler
app.use((req, res, next) => {
    logger.warn(`${req.method} ${req.path} not found`)
    next(createHttpError(404, 'Not found'))
})

// error handler
app.use((err, req, res, next) => {
    const message = err.message
    const error = process.env.NODE_ENV === 'development' ? err : {}

    // logger.error(message)

    res.status(err.status || 500).json({
        message: message,
        status: error?.status,
        stack: error?.stack,
    })
})

export default app
