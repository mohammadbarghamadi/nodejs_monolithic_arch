import { Router } from "express";


const router = Router()


import {
    userRegCtr,
    userGetCtr,
    userUpdCtr,
    userRecCtr,
    userResCtr,
    userDelCtr
} from '../controllers/user.controller'


router.route('/register').post(userRegCtr)
router.route('/update').patch(userUpdCtr)

export default router