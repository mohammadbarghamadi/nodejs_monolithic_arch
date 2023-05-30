import mongoose, { Document } from "mongoose";


export interface SessionSchemaInt extends Document {
    userId: mongoose.Schema.Types.ObjectId,
    valid: boolean,
    userAgent: string
}

// session schema for user signin
const sessionSchema = new mongoose.Schema<SessionSchemaInt>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    valid: {
        type: Boolean,
        required: true,
        default: true,
    },
    userAgent: {
        type: String
    }
})


const SessionModel = mongoose.model('sessions', sessionSchema)

export default SessionModel