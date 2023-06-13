import { Router } from "express";
import isValidReq from "../middlewares/validReq";
import { crtResetTokenSchema, resUserPasswordSchema } from "../schemas/token.schema";

const router = Router()

import {
    createResetToken,
    resetUserPassword
} from '../controllers/token.controller'

// create reset token for password recovery
router.route('/create').post(isValidReq(crtResetTokenSchema), createResetToken)
// reset user password
router.route('/reset/:resetToken').get(isValidReq(resUserPasswordSchema), resetUserPassword)

export default router