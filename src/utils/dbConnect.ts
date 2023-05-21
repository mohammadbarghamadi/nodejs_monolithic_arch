import mongoose from "mongoose";
import config from 'config';
import logger from "./logger";

const dbURL = config.get<string>('dbURL')

// connect to Mongodb database 
const dbConnect = async () => {
    try {
        await mongoose.connect(dbURL,{})
        logger.info('Connected to Mongodb.')
    } catch (e) {
        logger.error('Cannot connect to Mongodb!')
    }
}

export default dbConnect