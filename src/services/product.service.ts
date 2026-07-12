//
// product.service.ts
//
// This file defines the product service for the application.
// It includes functions for get all product, one of them based on its id, edit, and delete.
//

import { Category, Product } from "../generated/prisma/client";
import { getAllProduct, getProductById } from "../repositories/product.repo";
import AppError from "../utils/AppError";
import { productFilterSchemaType } from "../validation/product.schema";

export const products = async (
  filter: productFilterSchemaType,
): Promise<Array<Product & Category>> => {
  const allProducts = await getAllProduct(filter);

  if (allProducts.length === 0) throw new AppError("there is no products", 204);

  return allProducts;
};

export const oneProduct = async (id: string): Promise<Product> => {
  const product = await getProductById(id);

  if (!product) throw new AppError("product not found", 404);

  return product;
};

export const deleteProduct = async (id: string) => {
  try {
    await deleteProduct(id);
  } catch {
    throw new AppError("something error while deleting the product", 500);
  }
};
