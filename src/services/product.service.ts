//
// product.service.ts
//
// This file defines the product service for the application.
// It includes functions for get all product, one of them based on its id, edit, and delete.
//

import { Category, Product } from "../generated/prisma/client";
import {
  getAllProduct,
  type ProductFilter,
} from "../repositories/product.repo";
import AppError from "../utils/AppError";

export const products = async (
  filter: ProductFilter,
): Promise<Array<Product & Category>> => {
  const allProducts = await getAllProduct(filter);

  if (allProducts.length === 0) throw new AppError("there is no products", 204);

  return {} as Array<Product & Category>;
};
