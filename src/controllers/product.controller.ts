//
// product.controller.ts
//
// This file defines the controller functions for handling product-related operations in the application.
// It includes functions for retrieving all products, retrieving a single product by ID, creating, editing, and deleting products.
//

import { NextFunction, Request, Response } from "express";
import { productService } from "../services";

/**
 * getAllProducts handles retrieving all products from the database.
 * It supports filtering by category, price range, and sorting options via query parameters.
 * @param req - The Express request object containing query parameters for filtering.
 * @param res - The Express response object used to send the response.
 * @param next - The next middleware function in the Express pipeline for error handling.
 */
const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const products = await productService.products(req.query);
  return res.json(products);
};

/**
 * getProductById handles retrieving a single product by its ID.
 * It retrieves the product from the database and sends it as the response.
 * @param req - The Express request object containing the product ID in params.
 * @param res - The Express response object used to send the response.
 * @param next - The next middleware function in the Express pipeline for error handling.
 */
const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  const product = await productService.oneProduct(id as string);

  res.status(200).send(product);
};

/**
 * createProduct handles creating a new product in the database.
 * It receives the product data from the request body and an optional image file,
 * then calls the product service to create the product.
 * @param req - The Express request object containing the product data and optional file.
 * @param res - The Express response object used to send the response.
 * @param next - The next middleware function in the Express pipeline for error handling.
 */
const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { file, body } = req;

  await productService.AddProduct(body, file);

  res.sendStatus(200);
};

/**
 * deleteProduct handles deleting a product from the database by its ID.
 * It calls the product service to perform the deletion operation.
 * @param req - The Express request object containing the product ID in params.
 * @param res - The Express response object used to send the response.
 * @param next - The next middleware function in the Express pipeline for error handling.
 */
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  await productService.deleteProduct(id as string);

  res.status(200).send("deleted succ");
};

/**
 * editProduct handles editing an existing product in the database.
 * It receives the product data from the request body and the product ID from params.
 * @param req - The Express request object containing the product ID in params and updated data in body.
 * @param res - The Express response object used to send the response.
 * @param next - The next middleware function in the Express pipeline for error handling.
 */
const editProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

export {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  editProduct,
};
