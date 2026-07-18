import { z } from "zod";
export declare const productFilterSchema: z.ZodObject<{
    query: z.ZodObject<{
        category: z.ZodOptional<z.ZodString>;
        sort: z.ZodOptional<z.ZodEnum<{
            createdAt: "createdAt";
            price: "price";
        }>>;
        order: z.ZodOptional<z.ZodEnum<{
            asc: "asc";
            desc: "desc";
        }>>;
        priceMin: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        priceMax: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type productFilterSchemaType = z.infer<typeof productFilterSchema>["query"];
export declare const productIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const createProductSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        price: z.ZodCoercedNumber<unknown>;
        quantity: z.ZodCoercedNumber<unknown>;
        categoryId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type createProductSchemaType = z.infer<typeof createProductSchema>;
//# sourceMappingURL=product.schema.d.ts.map