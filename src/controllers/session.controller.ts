import { RequestHandler } from "express";
import { userAutServ } from "../services/user.services";
import { JWTSign } from "../utils/jwt";
import config from "config";

import {
    crtSessionServ,
    delSessionServ,
    getSessionServ
} from "../services/session.services";

// create session handler
export const crtSessionCtr: RequestHandler = async (req, res, next) => {
    const { email, phone, password } = req.body
    try {
        const user = await userAutServ(email, phone, password)
        if (!user) return res.status(401).json({ status: 401, message: 'Invalid Username or password!' })
        const session = await crtSessionServ(user._id, req.get('user-agent') || '')
        const accToken = JWTSign({ ...user, session: session._id }, 'ACC_RSA_KEY', { expiresIn: config.get('accTokenTTL') })
        const refToken = JWTSign({ ...user, session: session._id }, 'REF_RSA_KEY', { expiresIn: config.get('refTokenTTL') })
        res.status(201).json({ status: 201, data: { accessToken: accToken, refreshToken: refToken } })
    } catch (e: any) {
        res.status(500).json({ status: 500, message: e.message })
    }

}

// get session handler
export const getSessionCtr: RequestHandler = async (req, res, next) => {
    const userId = res.locals.user._id
    try {
        const sessions = await getSessionServ({ userId })
        res.json({ status: 200, data: sessions })
    } catch (e: any) {
        res.status(500).json({ status: 500, message: e.message })
    }
}

// remove session handler
export const remSessionCtr: RequestHandler = async (req, res, next) => {
    const userId = res.locals.user._id
    const option = { ...req.body, sessionId: res.locals.user.session }
    console.log(option)
    try {
        const sessions = await delSessionServ(userId, option)
        res.json({ status: 200, data: sessions })
    } catch (e: any) {
        res.status(500).json({ status: 500, message: e.message })
    }
}


