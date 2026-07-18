import authHandler from "../middleware/authHandler.middleware";
import catchAsync from "../middleware/catchAsync";
import validator from "../middleware/validator.middleware";
import { Router } from "express";
import { productController } from "../controllers";
import {
  createProductSchema,
  productFilterSchema,
  productIdSchema,
} from "../validation/product.schema";
import upload from "../lib/multer";

const router: Router = Router();

// get all the products
router.get(
  "/",
  validator(productFilterSchema, "query"),
  catchAsync(productController.getAllProducts),
);

// get product from its id
router.get(
  "/:id",
  validator(productIdSchema, "params"),
  catchAsync(productController.getProductById),
);

// edit the product that have this id (admin only)
// router.patch(
//   "/edit/:id",
//   authHandler("private"),
//   validator(productIdSchema, "params"),
//   catchAsync,
// );

// add the product that have this id (admin only)
router.post(
  "/add",
  upload.single("product-image"),
  // authHandler("private"),
  validator(createProductSchema, "body"),
  catchAsync(productController.createProduct),
);

// delete the product that have this id (admin only)
router.delete(
  "/delete/:id",
  authHandler("private"),
  validator(productIdSchema, "params"),
  catchAsync(productController.deleteProduct),
);

export default router;
