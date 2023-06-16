import { ObjectId } from "mongoose";
import ProductModel, { ProductSchemaModel } from "../models/product.model";


// create product service
export const crtProductServ = async (productData: ProductSchemaModel) => {
    try {
        const product = await ProductModel.create(productData)
        return { success: true, status: 200, data: product }
    } catch (e: any) {
        return { success: false, status: 400, message: e.message }
    }
}

// update product service
export const updProductServ = async (owner: ObjectId, prodId: string, productData: Omit<ProductSchemaModel, 'owner'>) => {
    try {
        const update = await ProductModel.findOneAndUpdate({ _id: prodId, owner }, productData, { new: true })
        if (!update) throw new Error('No product found with this Id: ' + prodId)
        return { success: true, status: 200, data: update }
    } catch (e: any) {
        return { success: false, status: 404, message: e.message }
    }
}

// delete product service
export const delProductServ = async (owner: ObjectId, prodId: string) => {
    
    try {
        const product = await ProductModel.findOneAndDelete({ _id: prodId, owner })
        if (!product) throw new Error('No product found with this Id: ' + prodId)
        return { success: true, status: 200, data: product }
    } catch (e: any) {
        return { success: false, status: 404, message: e.message }
    }

}

// get product service
export const getProductServ = async (prodId: string) => {

    try {

        const product = await ProductModel.findById(prodId)
        if (!product) throw new Error('No product found with this Id: ' + prodId)
        return { success: true, status: 200, data: product }

    } catch (e: any) {

        return { success: false, status: 404, message: e.message }

    }
}