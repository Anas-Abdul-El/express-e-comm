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
  params: {
    id: z.string(),
  },
});
