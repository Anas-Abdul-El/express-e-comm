//
// product.router.ts
//
// This file defines the routes for product-related operations in the application.
// It uses the Express Router to handle requests related to products, such as retrieving, creating, editing, and deleting products.
// Routes are defined for each operation, and the corresponding controller functions are invoked to handle the requests.
// GET /products/ - Retrieve all products with optional filtering
// GET /products/:id - Retrieve a single product by ID
// POST /products/add - Create a new product (admin only)
// PATCH /products/edit/:id - Edit an existing product (admin only)
// DELETE /products/delete/:id - Delete a product (admin only)

import authHandler from "../middleware/authHandler.middleware";
import catchAsync from "../middleware/catchAsync";
import validator from "../middleware/validator.middleware";
import { Router } from "express";
import { productController } from "../controllers";
import {
  createProductSchema,
  editProductSchema,
  productFilterSchema,
  productIdSchema,
} from "../validation/product.schema";
import upload from "../lib/multer";

const router: Router = Router();

// GET /products/ - Retrieve all products with optional filtering
router.get(
  "/",
  validator(productFilterSchema, "query"),
  catchAsync(productController.getAllProducts),
);

// GET /products/:id - Retrieve a single product by ID
router.get(
  "/:id",
  validator(productIdSchema, "params"),
  catchAsync(productController.getProductById),
);

// PATCH /products/edit/:id - Edit an existing product (admin only)
router.patch(
  "/edit/:id",
  authHandler("private"),
  upload.single("product-image"),
  validator(productIdSchema, "params"),
  validator(editProductSchema, "body"),
  catchAsync(productController.editProduct),
);

// POST /products/add - Create a new product (admin only)
router.post(
  "/add",
  authHandler("private"),
  upload.single("product-image"),
  validator(createProductSchema, "body"),
  catchAsync(productController.createProduct),
);

// DELETE /products/delete/:id - Delete a product (admin only)
router.delete(
  "/delete/:id",
  authHandler("private"),
  validator(productIdSchema, "params"),
  catchAsync(productController.deleteProduct),
);

export default router;
