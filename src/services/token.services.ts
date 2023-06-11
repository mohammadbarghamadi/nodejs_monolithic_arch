import { Types } from "mongoose";
import TokenModel from "../models/token.model";
import { randomBytes, createHash } from "node:crypto";

// password recovery service
export const createResetTokenServ = async (userId: Types.ObjectId) => {
    const bufferData = randomBytes(32).toString('hex')
    const resetToken = createHash('sha256').update(bufferData).digest('hex')

    const savedToken = await TokenModel.create({ userId, token: resetToken })
    if (!savedToken) return false

    return bufferData
}

// find valid and none expired reset token
export const findResetTokenServ = async (bufferData: string) => {
    const resetToken = createHash('sha256').update(bufferData).digest('hex')
    const foundToken = await TokenModel.findOne({ token: resetToken, expireDate: { $gt: Date.now() } })
    if (!foundToken) return false
    return foundToken
}

// find and remove all reset tokens
export const removeResetTokensServ = async (userId: Types.ObjectId) => {
    const tokens = await TokenModel.deleteMany({ userId })
    return tokens
} 