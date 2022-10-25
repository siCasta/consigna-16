import pino, { destination } from 'pino'
import { dirname } from 'dirname-es'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'

const __dirname = dirname(import.meta)
const logsPath = join(__dirname, '..', 'logs')

if (!existsSync(logsPath)) mkdirSync(logsPath)

const logger = pino(
    {},
    pino.multistream([
        { level: 'info', stream: process.stdout },
        {
            level: 'warn',
            stream: destination(join(logsPath, 'warn.log')),
        },
        {
            level: 'error',
            stream: destination(join(logsPath, 'error.log')),
        },
    ])
)

export default logger
