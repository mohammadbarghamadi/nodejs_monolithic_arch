import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { deserialize } from '../middlewares/auth';

// configure express app
const app = express()

// setup main express middlewares
app.use(express.json()) // parse request body as json
app.use(express.urlencoded({ extended: true })) // encode url
app.use(cookieParser()) // use cookies in req header
app.use(cors()) // give access to frontend API
app.use(deserialize)

// import routes handlers
import userRoute from '../routes/user.route'
import sessRoute from '../routes/session.route'
// import prodRoute from './routes/product.route'

// configure API routes
app.use('/api/user/', userRoute)
app.use('/api/sess/', sessRoute)
// app.use('/api/prod/', prodRoute)

export default app