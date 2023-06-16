import { Router } from "express";
import { requireAuth } from "../middlewares/auth";

const router = Router()

import {
    crtProductCtr, delProductCtr, getProductCtr, updProductCtr
} from "../controllers/product.controller";

router.route('/create').post(requireAuth, crtProductCtr)
router.route('/update/:productId').patch(requireAuth, updProductCtr)
router.route('/delete/:productId').delete(requireAuth, delProductCtr)
router.route('/get/:productId').get(getProductCtr)

export default router