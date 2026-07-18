import { z } from "zod";

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

export type productFilterSchemaType = z.infer<
  typeof productFilterSchema
>["query"];

export const productIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

// interface Product {
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   image: string;
//   categoryId: string;
// }

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

export type createProductSchemaType = z.infer<typeof createProductSchema>;
