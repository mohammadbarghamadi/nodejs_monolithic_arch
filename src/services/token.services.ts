import { Types } from "mongoose";
import TokenModel from "../models/token.model";
import { randomBytes, createHash } from "node:crypto";


export const createResetTokenServ = async (userId: Types.ObjectId) => {
    try {
        const bufferData = randomBytes(32).toString('hex')
        const resetToken = createHash('rsa256').update(bufferData).digest('hex')

        const savedToken = await TokenModel.create({ userId, token: resetToken})
        if (!savedToken) throw new Error
        
        return bufferData

    } catch (e) {
        return false
    }
}