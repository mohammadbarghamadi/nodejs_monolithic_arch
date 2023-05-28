import UserModel from "../models/user.model";
import { RequestHandler } from "express";
import { JWTVerify } from "../utils/jwt";
import { sessionRiTServ } from "../services/session.services";


// deserialize
export const deserialize: RequestHandler = async (req, res, next) => {
    try {
        const accToken = (req.headers.authorization as string).split(/^Bearer\s/)[1]
        if (!accToken) return next()
        const { decoded, expired } = await JWTVerify(accToken, 'ACC_RSA_KEY')
        if (decoded) {
            res.locals.user = decoded
            return next()
        }
        const refToken = req.headers.refreshtoken as string
    
        if (expired && refToken) {
            const newAccToken = await sessionRiTServ({ refreshToken: refToken })
            if (!newAccToken) return next()
            else res.setHeader('x-access-token', newAccToken)
            res.locals.user = await JWTVerify(newAccToken, 'ACC_RSA_KEY')
            return next()
        }
        next()
    } catch (e) {
        next()
    }

}

// authentication is required!
export const requireUser: RequestHandler = (req, res, next) => {

    try {
        if (res.locals.user) return next()
    } catch (e) {
        res.status(403).json({ status: 403, message: 'Please Authenticate!' })
    }
}