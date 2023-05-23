import { Types } from "mongoose";
import SessionModel from "../models/session.model";


// create session in database
export const sessionCrtServ = async (userId: Types.ObjectId, userAgent: string | undefined) => {
    try {
        const NewSession = new SessionModel({user: userId, userAgent})
        return await NewSession.save()
    } catch (e: any) {
        throw new Error(e)
    }
}