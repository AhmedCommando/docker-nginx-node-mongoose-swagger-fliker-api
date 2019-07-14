import { UserInterface } from './../model/user/user';
import { userModel } from '../db/shemas/userSchema';

/**
 * list of all possible functions in user service
 */
interface UserServiceInterface {
    addUser(user: UserInterface): Promise<UserInterface>;
    findByEmail(email: string): Promise<UserInterface>;
}

/**
 * implementation of all user services
 */
export class UserServiceImpl implements UserServiceInterface {
    async addUser(user: UserInterface): Promise<any> {
        return await new userModel(user).save();
    }

    async findByEmail(email: string): Promise<UserInterface> {
        return await userModel.findOne({email}).select('-password');
    }
}
