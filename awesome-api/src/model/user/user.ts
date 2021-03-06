import { hasNumber, isValidEmail, isValidPassword } from '../../helpers/validators';
import upperFirst from '../../helpers/upperFirst';
import { encryptPassword } from '../../helpers/crypto';

/**
 * user interface
 */
export interface UserInterface {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password?: string;
}

/**
 * facory function to create and validate a user
 * crypto have type any because we can be flexible by changing or using
 * different crypto lib
 * @param user 
 * @param crypto 
 */
export default function makeUser(user: UserInterface, crypto: any): Readonly<UserInterface> {
    const validUser: UserInterface = validate(user);
    return Object.freeze(normalize(validUser));

    function validate(model: UserInterface): UserInterface {
        const {firstName, lastName, email, userName, password} = model;
        validateName('first', firstName);
        validateName('last', lastName);
        validateEmail(email);
        validatePassword(password);
        return {firstName, lastName, email, userName, password};
    }

    /**
     * validate first and last name
     * @param label 
     * @param name 
     */
    function validateName(label: 'first' | 'last', name: string): void {
        if (!name || name.length < 3 || hasNumber(name)) {
            throw new TypeError(
                `A user's ${label} name must be a string and have at least 3 characters long.`
            );
        }
    }

    /**
     * validate email
     * @param email 
     */
    function validateEmail (email: string): void {
        if (!isValidEmail(email)) {
            throw new TypeError('Invalid user email address.');
        }
    }

    /**
     * validate password
     * @param password 
     */
    function validatePassword(password: string): void {
        if (!isValidPassword(password)) {
            throw new Error('Invalid password. should have at least 6 characters');
        }
    }

    /**
     * normalize user
     * @param user 
     */
    function normalize({firstName, lastName, email, userName, password}: UserInterface): UserInterface {
        return {
            firstName: upperFirst(firstName),
            lastName: upperFirst(lastName),
            email: email.toLowerCase(),
            userName: userName,
            password: cryptPassword(password)
        };
    }

    /**
     * crypt password with nodejs bcrypt library
     * @todo change this maybe mongoose method
     * @param password 
     */
    function cryptPassword(password: string): string {
        return encryptPassword(crypto, password);
    }
}
