import mongoose, { Types, Document } from "mongoose";

interface TokenSchema extends Document {
    userId: Types.ObjectId
    expireDate: Date
    token: string
}

const tokenSchema = new mongoose.Schema<TokenSchema>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    expireDate: {
        type: Date,
        default: Date.now() + 10 * 60 * 1000,
        required: true
    },
    token: {
        type: String,
        required: true
    }

})


const TokenModel = mongoose.model('tokens', tokenSchema)

export default TokenModel