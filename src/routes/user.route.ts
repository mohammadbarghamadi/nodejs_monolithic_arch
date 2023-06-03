import { Router } from "express";
import { requireAuth } from "../middlewares/auth";

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
router.route('/update').patch(requireAuth, userUpdCtr) // update user profile
router.route('/profile').get(requireAuth, userGetCtr) // get user profile
router.route('/recovery').post(userRecCtr) // user password recovery
router.route('/reset').get(userResCtr) // user password reset
router.route('/delete').delete(requireAuth, userDelCtr) // delete user account

export default router