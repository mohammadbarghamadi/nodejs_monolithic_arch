import mongoose, { Types, Document } from "mongoose";
import { genProductURL } from "../utils/product.utils";


export interface ProductSchemaModel {
    title: string
    description: string
    price: number
    owner: Types.ObjectId
    url?: string

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
        required: true,
    },
    url: {
        type: String,
        required: true,
        default: Date.now().toString()
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }

}, { timestamps: true })

// create default url link
productSchema.pre('save', function () {
    this.url = genProductURL(this.title)
})

// product model
const ProductModel = mongoose.model('products', productSchema)

export default ProductModel