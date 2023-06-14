import { RequestHandler } from "express";
import { crtProductServ, updProductServ } from "../services/product.services";


// create product controller: Post Method /api/prod/create
export const crtProductCtr: RequestHandler = async (req, res, next) => {

    const owner = res.locals.user._id
    const { title, description, price } = req.body
    try {
        const product = await crtProductServ({ title, description, price, owner })
        res.json(product)
    } catch (e: any) {
        res.status(500).json({ status: 500, message: e.message })
    }

}

// update product controller: Patch Method /api/prod/update
export const updProductCtr: RequestHandler = async (req, res, next) => {
    const owner = res.locals.user._id
    const productId = req.params.productId
    const { title, description, price } = req.body
    try {
        const product = await updProductServ(owner, productId, { title, description, price })
        res.json(product)
    } catch (e: any) {
        res.status(500).json({ status: 500, message: e.message })
    }
}

// 