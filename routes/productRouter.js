import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

// Route to get all products
productRouter.get("/", getAllProducts);

// Route to add a new product
productRouter.post("/", createProduct);

// Route to update an existing product by ID
productRouter.put("/:productId", updateProduct);

// Route to delete a product by ID
productRouter.delete("/:productId", deleteProduct);

// Route to get a specific product by ID
productRouter.get("/:productId", getProduct);



export default productRouter;
