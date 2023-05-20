import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from 'config';

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

// import routes handlers
// import userRoute from './controllers/user.controller'
// import sessRoute from './controllers/session.controller'
// import prodRoute from './controllers/product.controller'

// configure API routes
// app.use('/api/user/', userRoute)
// app.use('/api/sess/', sessRoute)
// app.use('/api/prod/', prodRoute)

// listen to express server
const server = app.listen(port, () => {
    console.log(`Express server start and running on Port: ${port}.`)
    dbConnect()
})

// handle unhandel error rejection
process.on('unhandledRejection', (err, promise) => {
    if (err) {
        console.log(err)
        server.close(() => process.exit(1))
    }
})