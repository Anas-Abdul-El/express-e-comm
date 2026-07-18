import { Category, Product } from "../generated/prisma/client";
import { createProductSchemaType, productFilterSchemaType } from "../validation/product.schema";
export declare const products: (filter: productFilterSchemaType) => Promise<Array<Product & Category>>;
export declare const oneProduct: (id: string) => Promise<Product>;
export declare const deleteProduct: (id: string) => Promise<void>;
export declare const AddProduct: (body: createProductSchemaType["body"], file: Express.Multer.File | undefined) => Promise<void>;
//# sourceMappingURL=product.service.d.ts.map