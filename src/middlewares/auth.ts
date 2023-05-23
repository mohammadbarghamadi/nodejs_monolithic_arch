import UserModel from "../models/user.model";
import { RequestHandler } from "express";


// authenticate user
export const auth: RequestHandler = (req, res, next) => {
    try {
        const token = req.headers.authorization
        

        
    } catch (e) {
        res.status(403).json({status: 403, message: 'Please authenticate!'})
    }
} 