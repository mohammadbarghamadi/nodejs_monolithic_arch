import { RequestHandler } from "express";
import { userFndServ, userUdPServ } from '../services/user.services'
import mailTo, { MailToOptions } from "../utils/email";
import resetPassword from "../template/email/recovery.email";

import {
    createResetTokenServ,
    findResetTokenServ,
    removeResetTokensServ
} from '../services/token.services'

// create reset token handler: Post Method - /api/tokn/create
export const createResetToken: RequestHandler = async (req, res, next) => {

    const { email, phone } = req.body

    try {

        // find user by its email or phone
        const user = await userFndServ({ email })
        const { status, success, data } = user

        if (!success || !data) return res.status(status).json(user)

        // create a reset token & save in db
        const resetToken = await createResetTokenServ(data._id)
        if (!resetToken) return res.status(500).json({ status: 500, message: 'Server issues!' })

        // send reset token to user via email
        const options: MailToOptions = { html: resetPassword(resetToken), subject: 'Password recovery', to: data.email }
        mailTo(options)
        res.json({ status: 200, message: 'Reset token sent via email' })

    } catch (e: any) {

        res.status(500).json({ status: 500, message: e.message })

    }

}

// reset user password: Get Method - /api/tokn/reset:resetToken
export const resetUserPassword: RequestHandler = async (req, res, next) => {

    const bufferData = req.params.resetToken
    const password = req.body.password

    try {

        // find reset token
        const resetToken = await findResetTokenServ(bufferData)
        if (!resetToken) return res.status(400).json({ status: 400, message: 'Invalid request!' })

        // find and update user password
        const user = await userUdPServ(resetToken.userId, password)
        const tokens = await removeResetTokensServ(resetToken.userId)

        res.json({ status: 200, data: { user, tokens } })

    } catch (e: any) {

        res.status(500).json({ status: 500, message: e.message })

    }
}