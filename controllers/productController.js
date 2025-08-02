import Product from "../models/product.js";
import { isAdmin } from "./usersController.js";

export async function createProduct(req, res) {
    // Check if the user is authorized to create a product
    if(!isAdmin(req)){
        return res.status(403).json({
            message: "You are not authorized to create a product. Please login as an admin."
        });
    }

    // Create a new product
    try {
        const productData = req.body;

        const product = new Product(productData);

        await product.save();

        console.log('Product created successfully');
        return res.status(201).json({
            message: 'Product created successfully',
            product: product
        });
    }
    catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({
            message: 'Error creating product',
            error: error.message
        });
    }
}

export async function getAllProducts(req, res) {
    // Get all products
    try {
        const products = await Product.find();

        console.log('Products retrieved successfully');
        return res.status(200).json({
            message: 'Products retrieved successfully',
            products: products
        });
    }
    catch (error) {
        console.error('Error retrieving products:', error);
        return res.status(500).json({
            message: 'Error retrieving products',
            error: error.message
        });
    }
}

export async function getProduct(req, res) {
    // Get a specific product by ID
    const productId = req.params.productId; // This should match the route parameter in productRouter.js

    try {
        const product = await Product.findOne({ productId: productId });  
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        console.log('Product retrieved successfully');  
        return res.status(200).json({
            message: 'Product retrieved successfully',
            product: product
        });
    }
    catch (error) {
        console.error('Error retrieving product:', error);
        return res.status(500).json({
            message: 'Error retrieving product',
            error: error.message
        });
    }
}

export async function updateProduct(req, res) {
    // Check if the user is authorized to update a product
    if(!isAdmin(req)){
        return res.status(403).json({
            message: "You are not authorized to update a product. Please login as an admin."
        });
    }
    
    try {
        const productId = req.params.productId;
        const updateData = req.body;
        
        await Product.updateOne(
            {productId: productId}, 
            updateData
        )

        console.log('Product updated successfully');
        return res.status(200).json({
            message: 'Product updated successfully',
        });
    }
    catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({
            message: 'Error updating product',
            error: error.message
        })
    }
}

export async function deleteProduct(req, res) {
    // Check if the user is authorized to delete a product
    if(!isAdmin(req)){
        return res.status(403).json({
            message: "You are not authorized to delete a product. Please login as an admin."
        });
    }

    // Delete a specific product by ID
    const productId = req.params.productId; // This should match the route parameter in productRouter.js

    try {

        await Product.deleteOne({
            productId: productId
        })
        res.json({
            message: 'Product deleted successfully',
            productId: productId
        });
        console.log('Product deleted successfully');
    }
    catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({
            message: 'Error deleting product',
            error: error.message
        });
    }
}