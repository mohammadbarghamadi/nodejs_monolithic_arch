import { FilterQuery, ObjectId, Types } from "mongoose";
import SessionModel, { SessionSchemaInt } from "../models/session.model";
import { JWTSign, JWTVerify } from "../utils/jwt";
import { userFndServ } from "./user.services";
import config from "config";
import { UserSchemaInt } from "../models/user.model";

// create session service
export const crtSessionServ = async (userId: UserSchemaInt, userAgent: string | undefined) => {
    try {
        return await SessionModel.create({ userId, userAgent })
    } catch (e: any) {
        throw new Error(e)
    }
}

// find a session service
export const fndSessionServ = async (query: FilterQuery<SessionSchemaInt>) => {
    try {
        return await SessionModel.findOne(query).lean()
    } catch (e) {
        return false
    }
}

// 
export const getSessionServ = async (query: FilterQuery<SessionSchemaInt>) => {
    try {
        return await SessionModel.find(query).lean()
    } catch (e) {
        return false;
    }
}

// reissue access token service
export const ritSessionServ = async ({ refreshToken }: { refreshToken: string }) => {

    const { decoded, expired } = JWTVerify(refreshToken, 'REF_RSA_KEY')
    if (!decoded || !decoded.session || expired) return false

    const session = await SessionModel.findById(decoded.session)

    if (!session || !session.valid) return false

    const user = await userFndServ({ _id: session.userId })
    const { success, data } = user

    if (!success) return false

    const accToken = JWTSign({ ...data, session: session._id }, 'ACC_RSA_KEY', { expiresIn: config.get('accTokenTTL') })

    return accToken
}

export interface DeleteSessionsOptions {
    removeSpecific: string
    keepCurrent: boolean
    removeCurrent: boolean
    removeAll: boolean
}

// delete all sessions
export const delSessionServ = async (userId: ObjectId) => {

    try {

        const sessions = await SessionModel.deleteMany(userId)

        return { success: true, status: 200, data: sessions }

    } catch (e: any) {

        return { success: false, status: 500, message: e.message }

    }
}

// delete current session
export const delCurSessServ = async (sessionId: ObjectId) => {
    const session = await SessionModel.findByIdAndDelete(sessionId)
    return session
}

// keep current session and remove all others
export const keepCurSesServ = async (userId: ObjectId, sessionId: ObjectId) => {
    const sessions = await SessionModel.deleteMany({ userId, _id: { $nin: sessionId } })
    return sessions
}

// delete specific session service
export const delSpecSesServ = async (sessionId: ObjectId) => {
    const session = await SessionModel.findByIdAndDelete(sessionId)
    return session
}