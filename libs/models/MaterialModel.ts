import {IUser} from "./UserModel";

export interface IMaterial {
  _id: string,
  name: string,
  texture: string,
  user?: IUser
}
