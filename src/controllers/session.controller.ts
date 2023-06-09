import { RequestHandler } from "express";
import { userAutServ } from "../services/user.services";
import { JWTSign } from "../utils/jwt";
import config from "config";

import {
    crtSessionServ,
    getSessionServ,
    delCurSessServ,
    keepCurSesServ,
    delSpecSesServ
} from "../services/session.services";

// create session handler
export const crtSessionCtr: RequestHandler = async (req, res, next) => {

    const { email, phone, password } = req.body

    try {

        const user = await userAutServ(email, phone, password)
        const { status, success, data: userData } = user

        if (!success || !userData) return res.status(status).json(user)

        const session = await crtSessionServ(userData._id, req.get('user-agent') || '')

        const accToken = JWTSign({ ...user, session: session._id }, 'ACC_RSA_KEY', { expiresIn: config.get('accTokenTTL') })
        const refToken = JWTSign({ ...user, session: session._id }, 'REF_RSA_KEY', { expiresIn: config.get('refTokenTTL') })

        res.status(201).json({ success: true, status: 200, data: { accessToken: accToken, refreshToken: refToken } })

    } catch (e: any) {

        res.status(500).json({ success: true, status: 500, message: e.message })

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

// delete session handler
export const delSessionCtr: RequestHandler = async (req, res, next) => {
    const userId = res.locals.user._id
    const options = { ...res.locals.user }
    const { keepCurrent, removeCurrent, removeAll, removeSpecific } = req.body
    try {
        let sessions
        if (removeCurrent) sessions = await delCurSessServ(options.session)
        else if (keepCurrent && removeAll) sessions = await keepCurSesServ(userId, options.session)
        else if (removeSpecific) sessions = await delSpecSesServ(removeSpecific)

        res.json({ status: 200, data: sessions === null ? 'No session found!' : sessions })
    } catch (e: any) {
        res.status(500).json({ status: 500, message: e.message })
    }
}