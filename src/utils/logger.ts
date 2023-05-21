import pino from 'pino';

// make messages colorful
const logger = pino({
    transport: { target: 'pino-pretty' }
})

export default logger