import { FilterQuery, Types } from "mongoose";
import SessionModel, { SessionSchemaInt } from "../models/session.model";
import { JWTSign, JWTVerify } from "../utils/jwt";
import { userFndServ } from "./user.services";
import config from "config";

// create session service
export const sessionCrtServ = async (userId: Types.ObjectId, userAgent: string | undefined) => {
    try {
        return await SessionModel.create({ user: userId, userAgent })
    } catch (e: any) {
        throw new Error(e)
    }
}

// find session service
export const sessionFndServ = async (query: FilterQuery<SessionSchemaInt>) => {
    try {
        return await SessionModel.findOne(query).lean()
    } catch (e) {
        console.log(e)
        return false
    }
}

// reissue access token service
export const sessionRiTServ = async ({ refreshToken }: { refreshToken: string }) => {
    const { decoded, } = await JWTVerify(refreshToken, 'REF_RSA_KEY')
    if (!decoded || !decoded.session) return false
    const session = await SessionModel.findById(decoded.session)
    if (!session || !session.valid) return false
    const user = await userFndServ({ _id: session.user })
    if (!user) return false
    const accToken = await JWTSign({ ...user, session: session._id }, 'ACC_RSA_KEY', { expiresIn: config.get('accTokenTTL') })
    return accToken
}