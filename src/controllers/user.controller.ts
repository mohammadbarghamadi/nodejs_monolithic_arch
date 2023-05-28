import { RequestHandler } from "express";
import logger from "../utils/logger";

import {
    userRegServ,
    userGetServ,
    userUpdServ
} from '../services/user.services'

// user registration handler: Post mehtod - /api/users/register
export const userRegCtr: RequestHandler = async (req, res, next) => {
    try {
        const data = await userRegServ(req.body)
        res.status(201).json({ status: 201, data })
    } catch (e) {
        logger.error(e)
        res.status(409).json({ status: 409, error: e })
    }
}

// get user profile handler: Get Method - /api/users/get
export const userGetCtr: RequestHandler = async (req, res, next) => {
    try {

    } catch (e) {

    }
}

// update user profile handler: Patch Method - /api/users/update
export const userUpdCtr: RequestHandler = async (req, res, next) => {
    try {
        const data = await userUpdServ(res.locals.user._id, req.body)
        console.log(data)
        res.status(200).json({ status: 200, data })
    } catch (e) {

    }
}

// delete user profile handler: Delete Method - /api/users/delete
export const userDelCtr: RequestHandler = async (req, res, next) => {
    try {

    } catch (e) {

    }
}

// password recovery handler: Post Method - /api/users/recovery
export const userRecCtr: RequestHandler = async (req, res, next) => {
    try {

    } catch (e) {

    }
}

// reset password handler: Get Method - /api/users/reset
export const userResCtr: RequestHandler = async (req, res, next) => {
    try {

    } catch (e) {

    }
}