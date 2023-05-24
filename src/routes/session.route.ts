import { Router } from "express";


const router = Router()


import {
    sessionCrtCtr,
    sessionGetCtr,
    sessionRemCtr
} from '../controllers/session.controller'


router.route('/create').post(sessionCrtCtr)
router.route('/get').get(sessionGetCtr)
router.route('/remove').delete(sessionRemCtr)


export default router