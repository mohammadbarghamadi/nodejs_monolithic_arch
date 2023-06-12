import { Router } from "express";

const router = Router()

import {
    createResetToken,
    resetUserPassword
} from '../controllers/token.controller'

router.route('/create').post(createResetToken) // create reset token for password recovery
router.route('/reset/:resetToken').get(resetUserPassword) // reset user password

export default router