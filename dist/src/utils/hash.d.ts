/**
 * Creates a hash of the given data using bcrypt.
 * @param data - The data to be hashed.
 * @returns A promise that resolves to the hashed string.
 */
export declare const createHash: (data: string) => Promise<string>;
/**
 * Compares the given data with the hashed data using bcrypt.
 * @param data - The data to be compared.
 * @param hashedData - The hashed data to compare against.
 * @returns A promise that resolves to a boolean indicating whether the data matches the hash.
 */
export declare const compareHash: (data: string, hashedData: string) => Promise<boolean>;
//# sourceMappingURL=hash.d.ts.map