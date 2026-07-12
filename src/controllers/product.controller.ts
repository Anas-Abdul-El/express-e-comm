import { NextFunction, Request, Response } from "express";
import { productService } from "../services";
import { productFilterSchemaType } from "../validation/product.schema";

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const products = await productService.products(req.query);
  return res.json(products);
};

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  const product = await productService.oneProduct(id as string);

  res.status(200).send(product);
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  await productService.deleteProduct(id as string);

  res.status(200).send("deleted succ");
};

export { getAllProducts, getProductById, deleteProduct };
