import { NextFunction, Request, Response } from "express";
declare const getAllProducts: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
declare const getProductById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const createProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const deleteProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { getAllProducts, getProductById, deleteProduct, createProduct };
//# sourceMappingURL=product.controller.d.ts.map