import { NextFunction, Request, Response } from "express";
import { productService } from "../services";
import uploadFile from "../lib/supabase";

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

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { file, body } = req;
  console.log(req.file);

  await productService.AddProduct(body, file);

  res.sendStatus(200);
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

export { getAllProducts, getProductById, deleteProduct, createProduct };
