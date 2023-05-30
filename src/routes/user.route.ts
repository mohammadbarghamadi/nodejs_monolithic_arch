import { Router } from "express";
import { authReqired } from "../middlewares/auth";

const router = Router()

import {
    userRegCtr,
    userGetCtr,
    userUpdCtr,
    userRecCtr,
    userResCtr,
    userDelCtr
} from '../controllers/user.controller'

router.route('/register').post(userRegCtr) // register user
router.route('/update').patch(authReqired, userUpdCtr) // update user profile
router.route('/profile').get(authReqired, userGetCtr) // get user profile
router.route('/recovery').post(userRecCtr) // user password recovery
router.route('/reset').get(userResCtr) // user password reset
router.route('/delete').delete(authReqired, userDelCtr) // delete user account

export default router