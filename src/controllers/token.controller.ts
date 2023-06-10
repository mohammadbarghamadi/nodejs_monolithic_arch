import { RequestHandler } from "express";
import { userFndServ } from '../services/user.services'
import mailTo, { MailToOptions } from "../utils/email";
import resetPassword from "../template/email/recovery.email";
import {
    createResetTokenServ
} from '../services/token.services'

// create reset token handler: Post Method - /api/tokn/create
export const createResetToken: RequestHandler = async (req, res, next) => {

    const { email, phone } = req.body
    if (!email && !phone) return res.status(400).json({ status: 400, message: 'Email or Phone required!' })
    try {
        // find user by its email or phone
        const user = await userFndServ({ email })
        if (!user) return res.status(404).json({ status: 404, message: 'No user found!' })
        // create a reset token & save in db
        const resetToken = await createResetTokenServ(user._id)
        if (!resetToken) return res.status(500).json({ status: 500, message: 'Server issues!' })
        // send reset token to user via email
        const options: MailToOptions = { html: resetPassword(resetToken), subject: 'Password recovery', to: user.email }
        mailTo(options)
        res.json({ status: 200, message: 'Reset token sent via email' })
    } catch (e: any) {
        res.status(500).json({ status: 500, message: e.message })
    }

}