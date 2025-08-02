import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        altNames: {
            type: [String],
            default: [],
            required: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            trim: true
        },
        labeledPrice: {
            type: Number,
            required: true,
        },
        image: {
            type: [String],
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true,
            trim: true
        },
    
    }
)
const Product = mongoose.model("Product", productSchema);
export default Product;