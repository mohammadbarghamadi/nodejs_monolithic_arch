import { RequestHandler } from "express";
import { userFndServ, userUdPServ } from '../services/user.services'
import mailTo, { MailToOptions } from "../utils/email";
import resetPassword from "../template/email/recovery.email";
import { UserServReturnObj } from "../services/user.services";

import {
    crtResetTokenServ,
    fndResetTokenServ,
    remResetTokenServ
} from '../services/token.services'

// create reset token handler: Post Method - /api/tokn/create
export const createResetToken: RequestHandler = async (req, res, next) => {

    const { email, phone } = req.body

    try {

        // find user by its email or phone
        let user: UserServReturnObj = { status: 0, success: false }

        if (email) user = await userFndServ({ email })
        else if (phone) user = await userFndServ({ phone })

        const { status: uStatus, success: uSuccess, data: uData } = user

        if (!uSuccess || !uData) return res.status(uStatus).json(user)

        // create a reset token & save in db
        const resetToken = await crtResetTokenServ(uData._id)
        const { status: rtStatus, success: rtSuccess, data: token } = resetToken

        if (!rtSuccess || !token) return res.status(rtStatus).json(resetToken)

        // send reset token to user via email
        const options: MailToOptions = { html: resetPassword(token), subject: 'Password recovery', to: uData.email }
        mailTo(options)

        res.json({ success: true, status: 200, message: 'Reset token sent via email.' })

    } catch (e: any) {

        res.status(500).json({ success: false, status: 500, message: e.message })

    }

}

// reset user password: Get Method - /api/tokn/reset:resetToken
export const resetUserPassword: RequestHandler = async (req, res, next) => {

    const bufferData = req.params.resetToken
    const password = req.body.password

    try {

        // find reset token
        const resetToken = await fndResetTokenServ(bufferData)
        if (!resetToken) return res.status(400).json({ success: false, status: 400, message: 'Invalid request!' })

        // find and update user password
        const user = await userUdPServ(resetToken.userId, password)
        const tokens = await remResetTokenServ(resetToken.userId)

        res.json({ success: true, status: 200, data: { user, tokens } })

    } catch (e: any) {

        res.status(500).json({ success: false, status: 500, message: e.message })

    }
}