import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import isValidReq from "../middlewares/validReq";

import { userRegSchema, userUpdSchema, userUdPSchema } from "../schemas/user.schema";

const router = Router()

import {
    userRegCtr,
    userGetCtr,
    userUpdCtr,
    userDelCtr,
    userUdPCtr
} from '../controllers/user.controller'

router.route('/register').post(isValidReq(userRegSchema), userRegCtr) // register user
router.route('/update').patch(isValidReq(userUpdSchema), requireAuth, userUpdCtr) // update user profile
router.route('/updatepassword').post(isValidReq(userUdPSchema), requireAuth, userUdPCtr) // update user password
router.route('/profile').get(requireAuth, userGetCtr) // get user profile
router.route('/delete').delete(requireAuth, userDelCtr) // delete user account

export default router