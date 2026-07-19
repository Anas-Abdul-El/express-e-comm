//
// product.service.ts
//
// This file defines the product service for the application.
// It includes functions for retrieving all products, retrieving a single product by ID, creating, editing, and deleting products.
//

import { Decimal } from "@prisma/client/runtime/client";
import { Product } from "../generated/prisma/client";
import uploadFile, { supabase } from "../lib/supabase";
import {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../repositories/product.repo";
import AppError from "../utils/AppError";
import {
  CreateProductSchemaType,
  EditProductSchemaType,
  ProductFilterSchemaType,
} from "../validation/product.schema";

/**
 * products retrieves all products from the database based on the provided filter criteria.
 * It constructs public URLs for product images stored in Supabase storage.
 * @param filter - The filter criteria including category, price range, and sorting options.
 * @returns A promise that resolves to an array of Product objects with image URLs.
 */
export const products = async (
  filter: ProductFilterSchemaType,
): Promise<Array<Product>> => {
  const products = await getAllProduct(filter);

  if (products.length === 0) throw new AppError("there is no products", 204);

  const allProducts = products.map((ele, i) => {
    let image: string | null = null;

    if (ele.image) {
      const {
        data: { publicUrl },
      } = supabase.storage.from("e-comm").getPublicUrl(ele.image);
      image = publicUrl;
    }

    return {
      ...ele,
      image,
    };
  });

  return allProducts;
};

/**
 * oneProduct retrieves a single product from the database by its ID.
 * It constructs a public URL for the product image if it exists.
 * @param id - The ID of the product to retrieve.
 * @returns A promise that resolves to a Product object with the image URL.
 */
export const oneProduct = async (id: string): Promise<Product> => {
  const product = await getProductById(id);

  if (!product) throw new AppError("product not found", 404);

  let image: string | null = null;
  if (product.image) {
    const {
      data: { publicUrl },
    } = supabase.storage.from("e-comm").getPublicUrl(product.image);
    image = publicUrl;
  }

  return {
    ...product,
    image,
  };
};

/**
 * deleteProduct removes a product from the database by its ID.
 * It deletes the product record from the database.
 * @param id - The ID of the product to delete.
 * @returns A promise that resolves when the deletion is complete.
 */
export const deleteProduct = async (id: string) => {
  try {
    await deleteProduct(id);
  } catch {
    throw new AppError("something error while deleting the product", 500);
  }
};

/**
 * AddProduct creates a new product in the database.
 * It handles file upload to Supabase storage and creates the product record.
 * @param body - The product data including name, description, price, quantity, and category.
 * @param file - An optional image file to upload for the product.
 * @returns A promise that resolves when the product is created.
 */
export const AddProduct = async (
  body: CreateProductSchemaType["body"],
  file: Express.Multer.File | undefined,
) => {
  let image;
  try {
    if (file) {
      image = await uploadFile({
        file: file.buffer,
        contentType: file.mimetype,
        folder: `products/${file.originalname}`,
      });
    }
  } catch {
    throw new AppError("something went wrong while parsing the image", 500);
  }

  try {
    await createProduct({ ...body, image });
  } catch {
    if (image) await supabase.storage.from("e-comm").remove([image]);
    throw new AppError("something went wrong while creating the product", 500);
  }
};

interface EditProductBodyType {
  name?: string;
  description?: string;
  price?: Decimal;
  quantity?: number;
  categoryId?: string;
}

export const editProduct = async (
  id: string,
  body: EditProductBodyType,
  file: Express.Multer.File | undefined,
) => {
  let image;
  try {
    if (file) {
      image = await uploadFile({
        file: file.buffer,
        contentType: file.mimetype,
        folder: `products/${file.originalname}`,
      });
    }
  } catch {
    throw new AppError("something went wrong while parsing the image", 500);
  }

  let oldProduct: Product | null;
  try {
    oldProduct = await getProductById(id);
    if (!oldProduct) throw new AppError("the product not found", 400);
  } catch (error) {
    throw new AppError("something went wrong", 500);
  }

  try {
    const newProduct = { ...oldProduct, ...body };
    await updateProduct(newProduct);
    if (image && oldProduct.image)
      await supabase.storage.from("e-comm").remove([oldProduct.image]);
  } catch {
    throw new AppError("something went wrong while creating the product", 500);
  }
};
