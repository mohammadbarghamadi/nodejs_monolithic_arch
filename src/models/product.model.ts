import mongoose, { Types, Document } from "mongoose";


export interface ProductSchemaModel {
    title: string
    description: string
    price: number
    owner: Types.ObjectId

}

// product schema interface
export interface ProductSchemaInt extends ProductSchemaModel, Document {
    createdAt: Date
    updatedAt: Date
}

// product schema
const productSchema = new mongoose.Schema<ProductSchemaInt>({

    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }

}, { timestamps: true })


// product model
const ProductModel = mongoose.model('products', productSchema)

export default ProductModel