import { FilterQuery, Types } from "mongoose";
import SessionModel, { SessionSchemaInt } from "../models/session.model";


// create session service
export const sessionCrtServ = async (userId: Types.ObjectId, userAgent: string | undefined) => {
    try {
        return await SessionModel.create({user: userId, userAgent})
    } catch (e: any) {
        throw new Error(e)
    }
}

// find sesion service
export const sessionFndServ = async (query: FilterQuery<SessionSchemaInt>) => {
    try {
        return await SessionModel.findOne(query).lean()
    } catch (e) {
        console.log(e)
        return false
    }
}