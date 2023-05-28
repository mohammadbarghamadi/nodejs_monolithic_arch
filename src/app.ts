import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from 'config';
import { deserialize } from './middlewares/auth';


// pretty logger
import logger from './utils/logger';

// connect to Mongodb Database
import dbConnect from './utils/dbConnect';

// configure express app
const app = express()

// express envorinmental variables
const port = config.get<number>('port')

// setup main express middlewares
app.use(express.json()) // parse request body as json
app.use(express.urlencoded({ extended: true })) // encode url
app.use(cookieParser()) // use cookies in req header
app.use(cors()) // give access to frontend API
app.use(deserialize)

// import routes handlers
import userRoute from './routes/user.route'
import sessRoute from './routes/session.route'
// import prodRoute from './routes/product.route'

// configure API routes
app.use('/api/user/', userRoute)
app.use('/api/sess/', sessRoute)
// app.use('/api/prod/', prodRoute)

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