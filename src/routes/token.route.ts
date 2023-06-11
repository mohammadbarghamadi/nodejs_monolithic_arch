import { Router } from "express";

const router = Router()

import {
    createResetToken,
    resetUserPassword
} from '../controllers/token.controller'


router.route('/create').post(createResetToken)
router.route('/reset/:resetToken').get(resetUserPassword)

export default router