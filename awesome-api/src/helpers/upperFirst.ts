// @todo move this from here
/**
 * uppercase first letter of the word
 * @param word 
 */
export default function upperFirst (word: string): string {
    if (word.length === 1) {
        return word.toUpperCase();
    }
    return word.charAt(0).toUpperCase() + word.substring(1);
}
