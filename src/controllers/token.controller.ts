import { RequestHandler } from "express";


// create reset token
export const createResetToken: RequestHandler = async (req, res, next) => {

    const { email, phone } = req.body
    if (!email && !phone) return res.status(400).json({ status: 400, message: 'Email or Phone required!' })

    try {
        
    } catch (e) {

    }

}