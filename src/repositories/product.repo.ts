import {
  ProductOrderByWithRelationInput,
  ProductWhereInput,
} from "../generated/prisma/models";
import { db } from "../lib/prisma";
import { productFilterSchemaType } from "../validation/product.schema";

export const getAllProduct = async (filters: productFilterSchemaType) => {
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

export const getProductById = async (id: string) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
  });
  return product;
};

export const deleteProduct = async (id: string) => {
  await db.product.delete({
    where: {
      id,
    },
  });
};
