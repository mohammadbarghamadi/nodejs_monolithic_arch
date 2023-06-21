import { Types } from "mongoose";
import TokenModel from "../models/token.model";
import { randomBytes, createHash } from "node:crypto";

// password recovery service
export const crtResetTokenServ = async (userId: Types.ObjectId) => {

    const bufferData = randomBytes(32).toString('hex')
    const resetToken = createHash('sha256').update(bufferData).digest('hex')

    try {

        const savedToken = await TokenModel.create({ userId, token: resetToken })
        if (!savedToken) return { success: false, status: 500, message: 'Cannot create reset token!' }

        return { success: true, status: 200, data: bufferData }

    } catch (e: any) {

        return { success: false, status: 500, message: e.message }

    }

}

// find valid and none expired reset token
export const fndResetTokenServ = async (bufferData: string) => {
    const resetToken = createHash('sha256').update(bufferData).digest('hex')
    const foundToken = await TokenModel.findOne({ token: resetToken, expireDate: { $gt: Date.now() } })
    if (!foundToken) return false
    return foundToken
}

// find and remove all reset tokens
export const remResetTokenServ = async (userId: Types.ObjectId) => {
    const tokens = await TokenModel.deleteMany({ userId })
    return tokens
} 