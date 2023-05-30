import { FilterQuery, Types } from "mongoose";
import SessionModel, { SessionSchemaInt } from "../models/session.model";
import { JWTSign, JWTVerify } from "../utils/jwt";
import { userFndServ } from "./user.services";
import config from "config";
import { UserSchemaInt } from "../models/user.model";

// create session service
export const sessionCrtServ = async (user: UserSchemaInt, userAgent: string | undefined) => {
    try {
        console.log(user)
        return await SessionModel.create({ ...user, userAgent })
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
    const { decoded, expired } = JWTVerify(refreshToken, 'REF_RSA_KEY')
    if (!decoded || !decoded.session || expired) return false
    const session = await SessionModel.findById(decoded.session)
    if (!session || !session.valid) return false
    const user = await userFndServ({ _id: session.userId })
    if (!user) return false
    console.log(user)
    const accToken = JWTSign({ ...user, session: session._id }, 'ACC_RSA_KEY', { expiresIn: config.get('accTokenTTL') })
    return accToken
}