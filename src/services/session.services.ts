import { FilterQuery, Types } from "mongoose";
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
    if (!user) return false
    const accToken = JWTSign({ ...user, session: session._id }, 'ACC_RSA_KEY', { expiresIn: config.get('accTokenTTL') })
    return accToken
}

export interface DeleteSessionsOptions {
    removeSpecific: string
    keepCurrent: boolean
    removeCurrent: boolean
    removeAll: boolean
}

// delete all sessions
export const delSessionServ = async (query: FilterQuery<SessionSchemaInt>) => {
    const sessions = await SessionModel.deleteMany(query)
    return sessions
}

// delete current session
export const delCurSessServ = async (sessionId: Types.ObjectId) => {
    const session = await SessionModel.findByIdAndDelete( sessionId )
    return session
}

// keep current session and remove all others
export const keepCurSesServ = async (userId: Types.ObjectId, sessionId: Types.ObjectId) => {
    const sessions = await SessionModel.deleteMany({ userId, _id: { $nin: sessionId } })
    return sessions
}

// delete specific session service
export const delSpecSesServ = async (sessionId: Types.ObjectId) => {
    const session = await SessionModel.findByIdAndDelete(sessionId)
    return session
}