import { Schema, Model, model, Document } from 'mongoose';

import { UserInterface } from '../../model/user/user';

export const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true}
}, {
  timestamps: true
});

export interface UserModelInterface extends UserInterface, Document {}

export const userModel: Model<UserModelInterface> = model<UserModelInterface>('User', UserSchema);
