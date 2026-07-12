import { Category, Product } from "../generated/prisma/client";
import { type ProductFilter } from "../repositories/product.repo";
export declare const products: (filter: ProductFilter) => Promise<Array<Product & Category>>;
//# sourceMappingURL=product.service.d.ts.map