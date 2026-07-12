import {
  ProductOrderByWithRelationInput,
  ProductWhereInput,
} from "../generated/prisma/models";
import { db } from "../lib/prisma";

export type ProductFilter = {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  sort?: "price" | "createdAt";
  order?: "asc" | "desc";
};

export const getAllProduct = async (filters: ProductFilter) => {
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
