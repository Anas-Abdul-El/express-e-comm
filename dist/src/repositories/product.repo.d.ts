import { productFilterSchemaType } from "../validation/product.schema";
export declare const getAllProduct: (filters: productFilterSchemaType) => Promise<{
    name: string;
    id: string;
    image: string | null;
    createdAt: Date;
    price: import("@prisma/client/runtime/client").Decimal;
    description: string | null;
    quantity: number;
    categoryId: string;
    updatedAt: Date;
}[]>;
export declare const getProductById: (id: string) => Promise<{
    name: string;
    id: string;
    image: string | null;
    createdAt: Date;
    price: import("@prisma/client/runtime/client").Decimal;
    description: string | null;
    quantity: number;
    categoryId: string;
    updatedAt: Date;
} | null>;
interface Product {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string | undefined;
    categoryId: string;
}
export declare const createProduct: (product: Product) => Promise<void>;
export declare const deleteProduct: (id: string) => Promise<void>;
export {};
//# sourceMappingURL=product.repo.d.ts.map