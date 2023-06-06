import { RequestHandler } from "express";
import logger from "../utils/logger";
import { delSessionServ } from "../services/session.services";

import {
    userRegServ,
    userGetServ,
    userUpdServ,
    userDelServ,
    userRecServ,
    userFndServ
} from '../services/user.services'
import { UserSchemaInt } from "../models/user.model";

// user registration handler: Post mehtod - /api/user/register
export const userRegCtr: RequestHandler = async (req, res, next) => {
    try {
        const data = await userRegServ(req.body)
        res.status(201).json({ status: 201, data })
    } catch (e) {
        logger.error(e)
        res.status(409).json({ status: 409, error: e })
    }
}

// get user profile handler: Get Method - /api/user/profile
export const userGetCtr: RequestHandler = async (req, res, next) => {
    const userId = res.locals.user._id
    try {
        const user = await userGetServ(userId)
        res.json({ status: 200, data: user })
    } catch (e: any) {
        res.status(500).json({ status: 500, message: e.message })
    }
}

// update user profile handler: Patch Method - /api/user/update
export const userUpdCtr: RequestHandler = async (req, res, next) => {
    const userId = res.locals.user._id
    try {
        const data = await userUpdServ(userId, req.body)
        res.status(200).json({ status: 200, data })
    } catch (e: any) {
        res.status(409).json({ status: 409, message: e.message })
    }
}

// delete user profile handler: Delete Method - /api/user/delete
export const userDelCtr: RequestHandler = async (req, res, next) => {
    const userId = res.locals.user._id
    try {
        const user = await userDelServ(userId)
        const sessions = await delSessionServ(userId)
        res.json({ status: 200, data: { user, sessions } })
    } catch (e: any) {
        res.status(500).json({ status: 500, message: e.message })
    }
}

// password recovery handler: Post Method - /api/user/recovery
export const userRecCtr: RequestHandler = async (req, res, next) => {
    try {
        const { email, phone } = req.body
        if (!email && !phone) return res.status(400).json({ status: 400, message: 'Invalid request!' })
        let user
        if (email) user = await userFndServ({ email })
        else if (phone) user = await userFndServ({ phone })
        if (!user) return res.status(404).json({ status: 404, message: 'No user found!' })
        const recoveryToken = await userRecServ(user._id)
        res.json({ status: 200, data: recoveryToken })
    } catch (e: any) {
        res.status(500).json({ status: 500, message: e.message })
    }
}

// reset password handler: Get Method - /api/user/reset
export const userResCtr: RequestHandler = async (req, res, next) => {
    try {

    } catch (e) {

    }
}