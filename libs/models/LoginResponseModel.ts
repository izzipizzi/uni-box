import {IUser} from "./UserModel";

export interface LoginResponseModel {
  token?: string,
  user?: IUser,
}
