import { ObjectId } from "mongoose";
import ProductModel, { ProductSchemaModel } from "../models/product.model";


// create product service
export const crtProductServ = async (productData: ProductSchemaModel) => {
    try {
        const product = await ProductModel.create(productData)
        return { status: 200, data: product }
    } catch (e: any) {
        return { status: 500, message: e.message }
    }
}

// update product service
export const updProductServ = async (owner: ObjectId, prodId: string, productData: Omit<ProductSchemaModel, 'owner'>) => {
    try {
        const update = await ProductModel.findOneAndUpdate({ _id: prodId, owner }, productData, { new: true })
        return { status: 200, data: update }
    } catch (e: any) {
        return { status: 404, message: e.message }
    }
}