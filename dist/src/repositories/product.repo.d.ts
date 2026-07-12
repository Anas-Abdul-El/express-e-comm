export type ProductFilter = {
    category?: string;
    priceMin?: number;
    priceMax?: number;
    sort?: "price" | "createdAt";
    order?: "asc" | "desc";
};
export declare const getAllProduct: (filters: ProductFilter) => Promise<{
    name: string;
    id: string;
    image: string | null;
    createdAt: Date;
    price: import("@prisma/client/runtime/client").Decimal;
    description: string | null;
    quantity: number;
    updatedAt: Date;
    categoryId: string;
}[]>;
//# sourceMappingURL=product.repo.d.ts.map