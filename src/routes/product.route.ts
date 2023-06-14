import { Router } from "express";
import { requireAuth } from "../middlewares/auth";

const router = Router()

import {
    crtProductCtr, updProductCtr
} from "../controllers/product.controller";

router.route('/create').post(requireAuth, crtProductCtr)
router.route('/update/:productId').patch(requireAuth, updProductCtr)

export default router