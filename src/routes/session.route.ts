import { Router } from "express";
import { requireAuth } from "../middlewares/auth";

const router = Router()

import {
    crtSessionCtr,
    getSessionCtr,
    delSessionCtr
} from '../controllers/session.controller'

router.route('/create').post(crtSessionCtr) // create a session for signin
router.route('/get').get(requireAuth, getSessionCtr) // get all sessions
router.route('/delete').delete(requireAuth, delSessionCtr) // remove sessions for signout


export default router