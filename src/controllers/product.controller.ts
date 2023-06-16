import { RequestHandler } from "express";

import {
    crtProductServ,
    updProductServ,
    delProductServ,
    getProductServ
} from "../services/product.services";


// create product controller: Post Method /api/prod/create
export const crtProductCtr: RequestHandler = async (req, res, next) => {

    const owner = res.locals.user._id
    const { title, description, price, url } = req.body

    try {

        const product = await crtProductServ({ title, description, price, url, owner })
        const { status, success } = product

        if (!success) return res.status(status).json(product)

        res.status(status).json(product)

    } catch (e: any) {

        res.status(500).json({ status: 500, message: e.message })

    }

}

// update product controller: Patch Method /api/prod/update/:productId
export const updProductCtr: RequestHandler = async (req, res, next) => {

    const owner = res.locals.user._id
    const productId = req.params.productId
    const { title, description, price } = req.body

    try {

        const product = await updProductServ(owner, productId, { title, description, price })
        const { success, status } = product

        if (!success) return res.status(status).json(product)

        res.status(status).json(product)

    } catch (e: any) {

        res.status(500).json({ status: 500, message: e.message })

    }
}

// delete product controller: Delete Method /api/prod/delete/:productId
export const delProductCtr: RequestHandler = async (req, res, next) => {

    const owner = res.locals.user._id
    const productId = req.params.productId

    try {
        const product = await delProductServ(owner, productId)
        const { status, success } = product

        if (!success) return res.status(status).json(product)

        res.json(product)

    } catch (e: any) {

        res.status(500).json({ status: 500, message: e.message })

    }
}

// get product controller: Get Method /api/prod/get/:productId
export const getProductCtr: RequestHandler = async (req, res, next) => {

    const productId = req.params.productId

    try {
        const product = await getProductServ(productId)
        const { status, success } = product

        if (!success) return res.status(status).json(product)

        res.json(product)
    } catch (e: any) {

        res.status(500).json({ status: 500, message: e.message })

    }

}

// list product controller: Get Method /api/prod/list
export const lisProductCtr: RequestHandler = async (req,res,next) => {

    try {

    } catch (e) {
        
    }

}