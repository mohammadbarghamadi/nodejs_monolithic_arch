import { RequestHandler } from "express";
import logger from "../utils/logger";

import {
    userRegServ,
    userGetServ,
    userUpdServ
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
    try {
        const user = await userGetServ(res.locals.user._id)
        res.json({ status: 200, data: user })
    } catch (e: any) {
        res.status(500).json({ status: 500, message: e.message })
    }
}

// update user profile handler: Patch Method - /api/user/update
export const userUpdCtr: RequestHandler = async (req, res, next) => {
    try {
        // console.log(res.locals.user)
        const data = await userUpdServ(res.locals.user._id, req.body)
        res.status(200).json({ status: 200, data })
    } catch (e) {

    }
}

// delete user profile handler: Delete Method - /api/user/delete
export const userDelCtr: RequestHandler = async (req, res, next) => {
    try {

    } catch (e) {

    }
}

// password recovery handler: Post Method - /api/user/recovery
export const userRecCtr: RequestHandler = async (req, res, next) => {
    try {

    } catch (e) {

    }
}

// reset password handler: Get Method - /api/user/reset
export const userResCtr: RequestHandler = async (req, res, next) => {
    try {

    } catch (e) {

    }
}