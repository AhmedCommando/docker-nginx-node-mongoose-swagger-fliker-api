
/**
 * Hash password
 * @param crypto encryption library
 * @param password plain text password to encrpt
 * @return hashed password
 */
export function encryptPassword(crypto: any, password: string): string {
    const salt = crypto.genSaltSync(8);
    return crypto.hashSync(password, salt);
}

/**
 * Compare password
 * @param crypto encryption library
 * @param password password to compare with
 * @param hash hashed password to compare against
 * @returns boolean 
 */
export function comparePassword(crypto: any, password: string, hash: string): boolean {
    return crypto.compareSync(password, hash);
}
