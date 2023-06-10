import { Types } from "mongoose";
import TokenModel from "../models/token.model";
import { randomBytes, createHash } from "node:crypto";

// password recovery handler - 
export const createResetTokenServ = async (userId: Types.ObjectId) => {
    try {
        const bufferData = randomBytes(32).toString('hex')
        const resetToken = createHash('sha256').update(bufferData).digest('hex')
        console.log(resetToken)
        const savedToken = await TokenModel.create({ userId, token: resetToken})
        if (!savedToken) throw new Error
        
        return bufferData

    } catch (e) {
        console.log(e)
        return false
    }
}