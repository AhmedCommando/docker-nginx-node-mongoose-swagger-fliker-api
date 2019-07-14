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

// tslint:disable-next-line: typedef
UserSchema.methods.toJson = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export interface UserModelInterface extends UserInterface, Document {}

export const userModel: Model<UserModelInterface> = model<UserModelInterface>('User', UserSchema);
