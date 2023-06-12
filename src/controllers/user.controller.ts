import { RequestHandler } from "express";
import logger from "../utils/logger";
import { delSessionServ } from "../services/session.services";

import {
    userRegServ,
    userUpdServ,
    userDelServ,
    userFndServ
} from '../services/user.services'

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
        const user = await userFndServ({ _id: userId })
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