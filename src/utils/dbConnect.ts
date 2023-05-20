import mongoose from "mongoose";
import config from 'config';

const dbURL = config.get<string>('dbURL')

// connect to Mongodb database 
const dbConnect = async () => {
    try {
        await mongoose.connect(dbURL,{})
        console.log('Connected to Mongodb.')
    } catch (e) {
        console.log('Cannot connect to Mongodb!')
    }
}

export default dbConnect