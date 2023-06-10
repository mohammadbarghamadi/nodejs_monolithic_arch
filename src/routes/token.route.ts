import { Router } from "express";

const router = Router()

import {
    createResetToken
} from '../controllers/token.controller'


router.route('/create').post(createResetToken)


export default router