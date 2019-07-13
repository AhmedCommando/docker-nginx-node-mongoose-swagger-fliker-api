export function generateString(length: number, type: 'mixed' | 'string' = 'mixed'): string {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';

    characters = (type === 'mixed') ? characters += numbers : characters;
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function generateEmail(): string {
    return `${generateString(5)}@develop.com`;
}
