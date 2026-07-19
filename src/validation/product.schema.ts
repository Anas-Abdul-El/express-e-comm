//
// product.schema.ts
//
// This file defines the validation schemas for product-related operations in the application.
// It uses the Zod library to create schemas for product filtering, creation, and editing, ensuring that incoming requests meet the required format and constraints.
//

import { z } from "zod";

/**
 * productFilterSchema defines the validation schema for product filtering requests.
 * It ensures that the query parameters contain valid filtering options.
 * - category: optional string to filter by category name.
 * - sort: optional enum of "price" or "createdAt" for sorting.
 * - order: optional enum of "asc" or "desc" for sort order.
 * - priceMin: optional number for minimum price filter.
 * - priceMax: optional number for maximum price filter.
 */
export const productFilterSchema = z.object({
  query: z.object({
    category: z.string().optional(),
    sort: z
      .enum(["price", "createdAt"], {
        message: "Sort must be 'price' or 'createdAt'",
      })
      .optional(),
    order: z
      .enum(["asc", "desc"], {
        message: "Order must be 'asc' or 'desc'",
      })
      .optional(),
    priceMin: z.coerce
      .number("priceMin must be a number")
      .positive("priceMin must be a positive number")
      .optional(),
    priceMax: z.coerce
      .number("priceMax must be a number")
      .positive("priceMax must be a positive number")
      .optional(),
  }),
});

/**
 * ProductFilterSchemaType is a TypeScript type that infers the shape of the productFilterSchema.
 * It can be used to type-check the query parameters in the product filter route handler, ensuring that it adheres to the defined schema.
 */
export type ProductFilterSchemaType = z.infer<
  typeof productFilterSchema
>["query"];

/**
 * productIdSchema defines the validation schema for product ID parameters.
 * It ensures that the request params contain a valid product ID.
 * - id: must be a string representing the product ID.
 */
export const productIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

/**
 * createProductSchema defines the validation schema for product creation requests.
 * It ensures that the request body contains valid product data.
 * - name: must be a string.
 * - description: must be a string.
 * - price: must be a positive number.
 * - quantity: must be a positive number.
 * - categoryId: must be a string.
 */
export const createProductSchema = z.object({
  body: z.object({
    name: z.string({ message: "the name must be a string" }),
    description: z.string({ message: "the description must be a string" }),
    price: z.coerce
      .number({ message: "price should be a numbere" })
      .positive({ message: "the price should be positive value" }),
    quantity: z.coerce
      .number({ message: "price should be a numbere" })
      .positive({ message: "the price should be positive value" }),
    categoryId: z.string({ message: "the categoryId must be a string" }),
  }),
});

/**
 * CreateProductSchemaType is a TypeScript type that infers the shape of the createProductSchema.
 * It can be used to type-check the request body in the product creation route handler, ensuring that it adheres to the defined schema.
 */
export type CreateProductSchemaType = z.infer<typeof createProductSchema>;

/**
 * editProductSchema defines the validation schema for product editing requests.
 * It ensures that the request body contains valid optional product data for partial updates.
 * - name: optional string.
 * - description: optional string.
 * - price: optional positive number.
 * - quantity: optional positive number.
 * - categoryId: optional string.
 */
export const editProductSchema = z.object({
  body: z.object({
    name: z.string({ message: "the name must be a string" }).optional(),
    description: z
      .string({ message: "the description must be a string" })
      .optional(),
    price: z.coerce
      .number({ message: "price should be a numbere" })
      .positive({ message: "the price should be positive value" })
      .optional(),
    quantity: z.coerce
      .number({ message: "price should be a numbere" })
      .positive({ message: "the price should be positive value" })
      .optional(),
    categoryId: z
      .string({ message: "the categoryId must be a string" })
      .optional(),
  }),
});

/**
 * EditProductSchemaType is a TypeScript type that infers the shape of the editProductSchema.
 * It can be used to type-check the request body in the product edit route handler, ensuring that it adheres to the defined schema.
 */
export type EditProductSchemaType = z.infer<typeof createProductSchema>;
