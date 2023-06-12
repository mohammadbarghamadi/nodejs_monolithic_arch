import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";


const isValidReq = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        })
        next()
    } catch (e: any) {
        res.status(400).json({ status: 400, message: e.errors })
    }
}


export default isValidReq