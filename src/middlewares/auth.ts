import { RequestHandler } from "express";
import { JWTVerify } from "../utils/jwt";
import { sessionRiTServ } from "../services/session.services";


// deserialize
export const deserialize: RequestHandler = async (req, res, next) => {
    try {

        const accToken = (req.headers.authorization as string).split(/^Bearer\s/)[1]
        if (!accToken) return next()

        const { valid, decoded, expired } = JWTVerify(accToken, 'ACC_RSA_KEY')

        if (valid && decoded && !expired) {
            const user = JWTVerify(accToken, 'ACC_RSA_KEY')
            res.locals.user = user.decoded
            console.log(user)
            return next()
        }

        const refToken = req.headers.refreshtoken as string

        if (expired && refToken) {
            const newAccToken = await sessionRiTServ({ refreshToken: refToken })
            if (!newAccToken) return next()
            else res.setHeader('newAccToken', newAccToken)
            const user = JWTVerify(newAccToken, 'ACC_RSA_KEY')
            console.log(user)
            res.locals.user = user.decoded
        }

        next()
    } catch (e) {
        next()
    }

}

// authentication is required!
export const authReqired: RequestHandler = (req, res, next) => {

    try {
        if (!res.locals.user) throw Error()
        next()
    } catch (e) {
        res.status(403).json({ status: 403, message: 'Please Authenticate!' })
    }

}