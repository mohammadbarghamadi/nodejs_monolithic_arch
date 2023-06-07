import app from './app';
import config from 'config';

// express envorinmental variables
const port = config.get<number>('port')

// pretty logger
import logger from './utils/logger';

// connect to Mongodb Database
import dbConnect from './utils/dbConnect';

// listen to express server
const server = app.listen(port, async () => {
    logger.info(`Express server start and running on Port: ${port}.`)
    await dbConnect()
})

// handle unhandel error rejection
process.on('unhandledRejection', (err, promise) => {
    if (err) {
        logger.error(err)
        server.close(() => process.exit(1))
    }
})