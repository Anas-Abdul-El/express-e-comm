//
// product.repo.ts
//
// This file defines the repository functions for product-related operations in the application.
// It interacts with the database to perform CRUD operations on product data, such as retrieving, creating, and deleting products.
//

import { Product } from "../generated/prisma/client";
import {
  ProductOrderByWithRelationInput,
  ProductWhereInput,
} from "../generated/prisma/models";
import { db } from "../lib/prisma";
import {
  EditProductSchemaType,
  ProductFilterSchemaType,
} from "../validation/product.schema";

/**
 * getAllProduct retrieves all products from the database based on the provided filter criteria.
 * It supports filtering by category, price range, and sorting options.
 * @param filters - The filter criteria including category, price range, and sorting options.
 * @returns A Promise that resolves to an array of product objects matching the filters.
 */
export const getAllProduct = async (filters: ProductFilterSchemaType) => {
  const {
    category,
    priceMin,
    priceMax,
    sort = "createdAt",
    order = "asc",
  } = filters;

  const where: ProductWhereInput = {};

  if (category) {
    where.category = { name: category };
  }

  if (priceMin !== undefined || priceMax !== undefined) {
    where.price = {};

    if (priceMin !== undefined) {
      where.price.gte = priceMin;
    }

    if (priceMax !== undefined) {
      where.price.lte = priceMax;
    }
  }

  const orderBy: ProductOrderByWithRelationInput | any = sort
    ? {
        [sort]: order,
      }
    : undefined;

  return db.product.findMany({
    where,
    orderBy,
  });
};

/**
 * getProductById retrieves a single product from the database by its ID.
 * @param id - The ID of the product to retrieve.
 * @returns A Promise that resolves to the product object if found, or null if no product exists with the given ID.
 */
export const getProductById = async (id: string) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
  });
  return product;
};

interface ProductType {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string | undefined;
  categoryId: string;
}

/**
 * createProduct creates a new product in the database with the provided product information.
 * @param product - An object containing the product's information, including name, description, price, quantity, image, and category.
 * @returns A Promise that resolves to the newly created product object.
 */
export const createProduct = async (product: ProductType) => {
  const { name, description, price, quantity, image, categoryId } = product;
  const dataImage = image ? image : null;

  await db.product.create({
    data: {
      name,
      description,
      price,
      quantity,
      image: dataImage,
      categoryId,
    },
  });
};

/**
 * deleteProduct removes a product from the database by its ID.
 * @param id - The ID of the product to delete.
 * @returns A Promise that resolves when the deletion operation is complete.
 */
export const deleteProduct = async (id: string) => {
  await db.product.delete({
    where: {
      id,
    },
  });
};

export const updateProduct = async (product: Product) => {
  const { name, description, price, quantity, categoryId, image, id } = product;

  await db.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      quantity,
      image,
      categoryId,
    },
  });
};
