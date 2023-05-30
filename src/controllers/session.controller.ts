import { RequestHandler } from "express";
import { userAutServ } from "../services/user.services";
import { JWTSign } from "../utils/jwt";
import { sessionCrtServ } from "../services/session.services";
import config from "config";

// create session handler
export const sessionCrtCtr: RequestHandler = async (req, res, next) => {

    const { email, phone, password } = req.body

    try {
        const user = await userAutServ(email, phone, password)
        if (!user) return res.status(401).json({ status: 401, message: 'Invalid Username or password!' })

        const session = await sessionCrtServ(user, req.get('user-agent') || '')

        const accToken = JWTSign({ user, session: session._id }, 'ACC_RSA_KEY', { expiresIn: config.get('accTokenTTL') })
        const refToken = JWTSign({ user, session: session._id }, 'REF_RSA_KEY', { expiresIn: config.get('refTokenTTL') })

        res.status(201).json({ status: 201, data: { accessToken: accToken, refreshToken: refToken } })

    } catch (e: any) {
        res.status(500).json({ status: 500, message: e.message })
    }

}

// get session handler
export const sessionGetCtr: RequestHandler = async (req, res, next) => {

    try {

    } catch (e) {

    }
}

// remove session handler
export const sessionRemCtr: RequestHandler = async (req, res, next) => {

    try {

    } catch (e) {

    }
}


