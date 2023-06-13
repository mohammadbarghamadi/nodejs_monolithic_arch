import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import isValidReq from "../middlewares/validReq";

const router = Router()

import {
    crtSessionCtr,
    getSessionCtr,
    delSessionCtr
} from '../controllers/session.controller'

import {
    crtSessionSchema,
    delSessionSchema
} from "../schemas/session.schema";

// create a session for signin
router.route('/create').post(isValidReq(crtSessionSchema), crtSessionCtr)
// get all sessions
router.route('/get').get(requireAuth, getSessionCtr)
// remove sessions for signout
router.route('/delete').delete(isValidReq(delSessionSchema), requireAuth, delSessionCtr)


export default router