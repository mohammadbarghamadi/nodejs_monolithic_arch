import { RequestHandler } from "express";


// create product controller: Post Method /api/prod/create
export const crtProductCtr: RequestHandler = async (req, res, next) => {

    const userId = res.locals.user._id
    const { title, description } = req.body
    try {

    } catch (e) {

    }

}