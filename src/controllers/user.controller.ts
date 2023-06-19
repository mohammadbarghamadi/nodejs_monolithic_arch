import { RequestHandler } from "express";
import logger from "../utils/logger";
import { delSessionServ } from "../services/session.services";

import {
    userRegServ,
    userUpdServ,
    userDelServ,
    userFndServ,
    userUdPServ
} from '../services/user.services'

// user registration handler: Post mehtod - /api/user/register
export const userRegCtr: RequestHandler = async (req, res, next) => {

    const { name, phone, email, password } = req.body

    try {

        const user = await userRegServ({ name, phone, email, password })
        const { status, success } = user

        if (!success) return res.status(status).json(user)

        res.json(user)

    } catch (e: any) {

        res.status(500).json({ success: false, status: 500, message: e.message })

    }

}

// get user profile handler: Get Method - /api/user/profile
export const userGetCtr: RequestHandler = async (req, res, next) => {

    const userId = res.locals.user._id

    try {

        const user = await userFndServ({ _id: userId })
        const { status, success } = user

        if (!success) return res.status(status).json(user)

        res.status(status).json(user)

    } catch (e: any) {

        res.status(500).json({ success: false, status: 500, message: e.message })

    }
}

// update user profile handler: Patch Method - /api/user/update
export const userUpdCtr: RequestHandler = async (req, res, next) => {

    const userId = res.locals.user._id
    const { email, name, phone } = req.body

    try {

        const user = await userUpdServ(userId, { email, name, phone })
        const { status, success } = user

        if (!success) return res.status(status).json(user)

        res.status(200).json(user)

    } catch (e: any) {

        res.status(500).json({ success: false, status: 500, message: e.message })

    }
}

// update user password handler
export const userUdPCtr: RequestHandler = async (req, res, next) => {

    const userId = res.locals.user._id
    const password = req.body.password

    try {

        const user = await userUdPServ(userId, password)
        const { status, success } = user

        if (!success) return res.status(status).json(user)

        res.json(user)

    } catch (e: any) {

        res.status(500).json({ status: 500, message: e.message })

    }
}

// delete user profile handler: Delete Method - /api/user/delete
export const userDelCtr: RequestHandler = async (req, res, next) => {

    const userId = res.locals.user._id

    try {

        const user = await userDelServ(userId)
        const { success, status } = user

        if (!success) return res.status(status).json(user)

        const sessions = await delSessionServ(userId)

        res.json({ success, status, data: { user: user.data, sessions: sessions.data } })

    } catch (e: any) {

        res.status(500).json({ success: false, status: 500, message: e.message })

    }
}