import { NextFunction, Request, Response } from "express";
import { productService } from "../services";
import { ProductFilter } from "../repositories/product.repo";

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { category, sort, priceMax, priceMin, order } = req.query;
  const filterObect: ProductFilter = {};

  if (category) filterObect.category = category.toString();

  if (sort == "price") filterObect.sort = sort;

  if (order === "desc") filterObect.order = order;

  if (priceMin) filterObect.priceMin = parseInt(priceMin as string);

  if (priceMax) filterObect.priceMax = parseInt(priceMax as string);

  const products = await productService.products(filterObect);
  return res.json(products);
};

export { getAllProducts };
